import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    // Accessibility and SEO: change the lang attribute if other languages are present
    <Html lang="en">
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script key="env" src="/__ENV.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
