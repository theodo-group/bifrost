export const locales = ['en'] as const;

export type Locale = (typeof locales)[number];

export const isValidLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale);
