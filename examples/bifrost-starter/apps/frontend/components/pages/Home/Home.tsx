import Head from 'next/head';
import Link from 'next/link';
import { useGetMe } from 'services/api/user/useUser';
import style from './Home.module.css';

export const Home = (): JSX.Element => {
  const user = useGetMe();

  return (
    <div>
      <Head>
        <title>Bifrost</title>
        <meta name="description" content="Generated with bifrost" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.main}>
        {user && (
          <>
            <h1>
              Welcome {user.name} to <a href="https://nextjs.org">Next.js!</a>
            </h1>

            <p>
              Get started by editing <code>pages/index.tsx</code>
            </p>

            <div>
              <a href="https://nextjs.org/docs">
                <h2>Documentation &rarr;</h2>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>

              <a href="https://nextjs.org/learn">
                <h2>Learn &rarr;</h2>
                <p>
                  Learn about Next.js in an interactive course with quizzes!
                </p>
              </a>

              <a href="https://github.com/vercel/next.js/tree/canary/examples">
                <h2>Examples &rarr;</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>
            </div>
            <Link href="/profile">
              <a>
                <h2>Update your profile</h2>
              </a>
            </Link>
          </>
        )}
      </main>
    </div>
  );
};
