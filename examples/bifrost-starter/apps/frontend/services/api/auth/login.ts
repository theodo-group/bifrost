import { getAccessFromResponse, setAccessToken } from './utils';
import { ApiRoutes } from '../apiRoutes';
import { apiClient } from '../client';

export type LoginData = {
  email: string;
  password: string;
};

export const login = async (data: LoginData): Promise<void> =>
  setAccessToken(
    getAccessFromResponse(await apiClient.post<unknown>(ApiRoutes.login, data)),
  );
