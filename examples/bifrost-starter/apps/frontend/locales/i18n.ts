import { getRequestConfig } from 'next-intl/server';

import { isValidLocale } from './locales';

export default getRequestConfig(async ({ locale }) => {
  if (!isValidLocale(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  return {
    messages: (await import('./translations/en.json')).default,
  };
});
