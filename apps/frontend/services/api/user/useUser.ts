import useSWR from 'swr';
import { logger } from 'services/logger';
import { UserData } from 'components/pages/Profile/ProfileForm/ProfileForm';
import { ApiRoutes } from '../apiRoutes';
import { apiClient } from '../client';

export type User = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
};

export const useGetMe = () => {
  const { data, error } = useSWR<User, unknown>(ApiRoutes.me);

  if (error) {
    logger.error(error);

    return;
  }

  return data;
};

export const updateMe = async (data: UserData): Promise<void> => {
  await apiClient.patch<unknown>(ApiRoutes.users, data);
};
