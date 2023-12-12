import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { FC, PropsWithChildren } from 'react';

import { isValidLocale } from 'locales/locales';
import { SWRProvider } from 'providers/swr-provider';

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const RootLayout: FC<
  PropsWithChildren<{
    params: { locale: string };
  }>
> = ({ children, params: { locale } }) => {
  if (!isValidLocale(locale)) {
    console.error(`Invalid locale: ${locale}`);
    notFound();
  }

  return (
    // Accessibility and SEO: change the lang attribute if other languages are present
    <html lang={locale} className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Script strategy="beforeInteractive" id="env-var" src="/__ENV.js" />
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
};

export default RootLayout;
