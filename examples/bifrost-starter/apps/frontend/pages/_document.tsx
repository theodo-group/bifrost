import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

const Document = (): JSX.Element => {
  return (
    // Accessibility and SEO: change the lang attribute if other languages are present
    <Html lang="en">
      <Head />
      <body>
        <Script strategy="beforeInteractive" id="env-var" src="/__ENV.js" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
