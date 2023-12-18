'use client';
import { useRouter } from 'next/navigation';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import { SWRConfig } from 'swr';

import { apiClientFactory, apiClientType } from 'services/api/client';

const ApiClientContext = createContext<apiClientType | null>(null);

export const useApiClient = (): apiClientType => {
  const apiClient = useContext(ApiClientContext);
  if (apiClient === null) {
    throw new Error('useApiClient must be used within a ApiClientProvider');
  }

  return apiClient;
};

export const SWRProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const apiClient = useMemo(() => apiClientFactory(router), [router]);

  return (
    <ApiClientContext.Provider value={apiClient}>
      <SWRConfig
        value={{
          refreshInterval: 0, // disable auto refresh by interval by default
          fetcher: (resource: string) =>
            apiClient.get<unknown>(resource).then(response => response.data),
        }}
      >
        {children}
      </SWRConfig>
    </ApiClientContext.Provider>
  );
};
