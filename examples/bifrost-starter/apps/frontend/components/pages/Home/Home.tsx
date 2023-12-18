import Link from 'next/link';
import { FC } from 'react';

import style from './Home.module.css';
import { HomeTitle } from './HomeTitle';

export const Home: FC = () => {
  return (
    <div>
      <main className={style.main}>
        <HomeTitle />

        <p>
          Get started by editing <code>app/page.tsx</code>
        </p>

        <div>
          <a href="https://nextjs.org/docs">
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn">
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/canary/examples">
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>
        </div>
        <h2>
          <Link href="/profile">Update your profile</Link>
        </h2>
      </main>
    </div>
  );
};
