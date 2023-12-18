import { NextPage } from 'next';
import type { Metadata } from 'next';

import { Home } from 'components/pages/Home/Home';

export const metadata: Metadata = {
  title: 'Bifrost',
  description: 'Generated with bifrost',
};

const HomePage: NextPage = () => <Home />;

export default HomePage;
