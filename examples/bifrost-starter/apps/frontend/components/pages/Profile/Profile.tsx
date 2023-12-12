'use client';
import { FC } from 'react';

import { CrashFallback } from 'components/CrashFallback/CrashFallback';
import { ErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';

import { ProfileForm } from './ProfileForm/ProfileForm';

export const Profile: FC = () => (
  <>
    <h2>Here you can update your profile!</h2>
    {/* Example of a client side Error Boundary */}
    <ErrorBoundary FallbackComponent={CrashFallback}>
      <ProfileForm />
    </ErrorBoundary>
  </>
);
