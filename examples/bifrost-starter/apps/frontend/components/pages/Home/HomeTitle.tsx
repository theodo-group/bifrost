'use client';

import { FC } from 'react';

import { useGetMe } from 'services/api/user/useUser';

export const HomeTitle: FC = () => {
  const { user, isLoading } = useGetMe();

  return (
    <h1>
      Welcome{isLoading || !user ? '' : ` ${user.name}`} to{' '}
      <a href="https://nextjs.org">Next.js!</a>
    </h1>
  );
};
