'use client';

import { FC, useEffect } from 'react';

import { CrashFallback } from 'components/CrashFallback/CrashFallback';

/**
 * Global catch all error page for root layout errors
 * more info here: https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
 */
const GlobalError: FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => {
  useEffect(() => {
    // You can use your own error logging service here like sentry
    console.error({ error, errorInfo: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main>
          <h1> Something went wrong!</h1>
          <CrashFallback reset={reset} />
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
