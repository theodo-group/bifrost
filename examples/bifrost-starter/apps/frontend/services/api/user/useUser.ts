import { GetUserDto, UpdateUserDto } from '@bifrost-starter/interfaces';
import useSWR from 'swr';

import { logger } from 'services/logger';

import { ApiRoutes } from '../apiRoutes';
import { apiClientType } from '../client';

export const useGetMe = () => {
  const { data, error, isLoading } = useSWR<GetUserDto, unknown>(ApiRoutes.me);

  if (error !== undefined) {
    logger.error(error);

    return { user: undefined, isLoading: false };
  }

  return { user: data, isLoading };
};

export const updateMe = async (
  apiClient: apiClientType,
  data: UpdateUserDto,
): Promise<void> => {
  await apiClient.patch<unknown>(ApiRoutes.users, data);
};
