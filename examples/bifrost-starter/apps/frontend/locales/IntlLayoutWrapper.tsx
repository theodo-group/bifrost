import { NextIntlClientProvider, useMessages } from 'next-intl';
import { FC, PropsWithChildren } from 'react';

import { Locale } from './locales';

export const IntlWrapper: FC<
  PropsWithChildren<{
    locale: Locale;
  }>
> = ({ children, locale }) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
};

/**
 * I can be used directly as a Layout export to wrap the page component to provide Intl context
 */
export const IntlLayoutWrapper: FC<
  PropsWithChildren<{
    params: {
      locale: Locale;
    };
  }>
> = ({ children, params: { locale } }) => (
  <IntlWrapper locale={locale}>{children}</IntlWrapper>
);
