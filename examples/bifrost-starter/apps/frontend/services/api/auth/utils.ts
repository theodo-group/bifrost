import { AxiosResponse } from 'axios';
import { JwtPayload } from 'jwt-decode';

import { isLoginResponse } from './authResponse';

export class AuthenticationError extends Error {}

const ACCESS_STORE_KEY = 'accessToken';

export const getAccessToken = () => localStorage.getItem(ACCESS_STORE_KEY);

export const hasAccessToken = (): boolean =>
  typeof window !== 'undefined' && Boolean(getAccessToken());

export const setAccessToken = (accessToken: string) =>
  localStorage.setItem(ACCESS_STORE_KEY, accessToken);

export const removeAccessToken = () =>
  localStorage.removeItem(ACCESS_STORE_KEY);

export const isTokenExpired = (token: JwtPayload): boolean => {
  // Less than 10 seconds remaining => token has expired
  const now = new Date().getTime() / 1000;
  if (token.exp === undefined) {
    return true;
  }

  return token.exp - now < 10;
};

export const getAccessFromResponse = (response: AxiosResponse<unknown>) => {
  if (isLoginResponse(response.data)) {
    return response.data.token ?? response.data.access;
  }
  throw new AuthenticationError('No access token returned');
};
