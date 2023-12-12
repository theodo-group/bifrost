import type { Metadata } from 'next';
import { FC } from 'react';

import { Login } from 'components/pages/Login/Login';

export const metadata: Metadata = {
  title: 'Login | Bifrost',
  description: 'Login page',
};

const LoginPage: FC = () => <Login />;

export default LoginPage;
