import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  messages: (
    await (locale === 'en'
      ? // When using Turbopack, this will enable HMR for `en`
        import('./translations/en.json')
      : import(`./translations/${locale}.json`))
  ).default,
}));
