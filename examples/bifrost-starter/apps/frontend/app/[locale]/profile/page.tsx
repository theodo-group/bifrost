import type { Metadata } from 'next';
import { FC } from 'react';

import { Profile } from 'components/pages/Profile/Profile';

export const metadata: Metadata = {
  title: 'Profile | Bifrost',
  description: 'You profile on Bifrost',
};

const ProfilePage: FC = () => <Profile />;

export default ProfilePage;
