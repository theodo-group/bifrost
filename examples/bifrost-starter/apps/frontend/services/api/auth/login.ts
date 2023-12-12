import { getAccessFromResponse, setAccessToken } from './utils';
import { ApiRoutes } from '../apiRoutes';
import { apiClientType } from '../client';

export type LoginData = {
  email: string;
  password: string;
};

export const login = async (
  apiClient: apiClientType,
  data: LoginData,
): Promise<void> =>
  setAccessToken(
    getAccessFromResponse(
      await apiClient.post<unknown>(ApiRoutes.login, data, {
        withCredentials: true,
      }),
    ),
  );
