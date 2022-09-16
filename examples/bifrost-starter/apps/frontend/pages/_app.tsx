import 'styles/global.css';
import 'styles/stylesheet.css';
import { SWRConfig } from 'swr';
import { AppProps } from 'next/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { apiClient } from 'services/api/client';
import { AppCrashFallback, ErrorBoundary } from 'components';
import { Intl } from 'providers';

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  void import('@axe-core/react').then(({ default: reactAxe }) => {
    const ACCESSIBILITY_CHECK_DELAY = 1000;

    return reactAxe(React, ReactDOM, ACCESSIBILITY_CHECK_DELAY);
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={AppCrashFallback}>
      <Intl defaultLocale="en">
        <SWRConfig
          value={{
            refreshInterval: 0, // disable auto refresh by interval by default
            fetcher: (resource: string) =>
              apiClient.get<unknown>(resource).then(response => response.data),
          }}
        >
          <div>
            <Component {...pageProps} />
          </div>
        </SWRConfig>
      </Intl>
    </ErrorBoundary>
  );
}

export default MyApp;
