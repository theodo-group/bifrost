'use client';

import { useEffect } from 'react';

import { CrashFallback } from 'components/CrashFallback/CrashFallback';

/**
 * use this error to handle server side errors,
 * you can put it directly in a page directory and it will be wrapped by the
 * layout at the same level and above it,
 * more info here: https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // You can use your own error logging service here like sentry
    console.error({ error, errorInfo: error.digest });
  }, [error]);

  return <CrashFallback reset={reset} />;
};

export default ErrorPage;
