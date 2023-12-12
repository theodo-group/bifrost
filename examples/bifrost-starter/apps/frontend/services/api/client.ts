import 'client-only';
import axios from 'axios';
import createAuthRefreshInterceptor, {
  AxiosAuthRefreshRequestConfig,
} from 'axios-auth-refresh';
import jwtDecode from 'jwt-decode';
import type { useRouter } from 'next/navigation';

import { Pages } from 'constant';
import { env } from 'services/env';

import { ApiRoutes } from './apiRoutes';
import {
  getAccessFromResponse,
  getAccessToken,
  isTokenExpired,
  setAccessToken,
} from './auth/utils';

export const apiClientFactory = (router: ReturnType<typeof useRouter>) => {
  const apiClient = axios.create({
    baseURL: env('NEXT_PUBLIC_API_BASE_URL'),
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  apiClient.interceptors.request.use(
    async config => {
      const access = getAccessToken();
      if (access === null) {
        router.push(Pages.Login);

        return config;
      }
      if (isTokenExpired(jwtDecode(access))) {
        await refreshToken();
      }

      return {
        ...config,
        headers: Object.assign(config.headers ?? {}, {
          Authorization: `Bearer ${getAccessToken() as string}`,
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
    const options: AxiosAuthRefreshRequestConfig = {
      skipAuthRefresh: true,
      withCredentials: true,
    };

    try {
      setAccessToken(
        getAccessFromResponse(
          await apiClient.post<unknown>(ApiRoutes.refresh, undefined, options),
        ),
      );
    } catch (error) {
      router.push(Pages.Login);

      return Promise.reject(error);
    }
  };

  createAuthRefreshInterceptor(apiClient, async () => await refreshToken(), {
    statusCodes: [401],
  });

  return apiClient;
};

export type apiClientType = ReturnType<typeof apiClientFactory>;
