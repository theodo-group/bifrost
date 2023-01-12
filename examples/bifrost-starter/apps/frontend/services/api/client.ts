import axios from 'axios';
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';
import jwtDecode from 'jwt-decode';
import Router from 'next/router';

import { Pages } from 'constant';
import { env } from 'services/env';

import { ApiRoutes } from './apiRoutes';
import {
  getAccessFromResponse,
  getAccessToken,
  isTokenExpired,
  setAccessToken,
} from './auth/utils';

let refreshTokenPromise: null | Promise<void | null>;

export const apiClient = axios.create({
  baseURL: env('NEXT_PUBLIC_API_BASE_URL'),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    const access = getAccessToken();
    if (!access) {
      await Router.push(Pages.Login);

      return config;
    }
    if (isTokenExpired(jwtDecode(access))) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken().then(() => {
          refreshTokenPromise = null;
        });
      }
      await refreshTokenPromise;
    }

    return {
      ...config,
      headers: Object.assign(config.headers ?? {}, {
        Authorization: `Bearer ${getAccessToken()}`,
      }),
    };
  },
  undefined,
  {
    runWhen: config =>
      config.url !== ApiRoutes.refresh && config.url !== ApiRoutes.login,
  },
);

const refreshToken = async (): Promise<void> => {
  const options: AxiosAuthRefreshRequestConfig = { skipAuthRefresh: true };

  try {
    setAccessToken(
      getAccessFromResponse(
        await apiClient.post<unknown>(ApiRoutes.refresh, undefined, options),
      ),
    );
  } catch (error) {
    await Router.push(Pages.Login);

    return Promise.reject(error);
  }
};
