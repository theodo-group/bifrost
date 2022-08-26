import axios from 'axios';
import {
  getAccessToken,
  getAccessFromResponse,
  setAccessToken,
  isTokenExpired,
} from './auth/utils';
import { ApiRoutes } from './apiRoutes';
import createAuthRefreshInterceptor, {
  AxiosAuthRefreshRequestConfig,
} from 'axios-auth-refresh';
import Router from 'next/router';
import { Pages } from 'constant';
import jwtDecode from 'jwt-decode';
import { env } from 'services/env';

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
      await refreshToken();
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

createAuthRefreshInterceptor(
  apiClient,
  async failedRequest => await refreshToken(),
  {
    statusCodes: [401],
  },
);
