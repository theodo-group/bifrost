import { IntlProvider } from 'react-intl';
import { flattenMessages } from 'services/intl';
import en from 'translations/en.json';

const loadLocaleData = (locale: string) => {
  switch (locale) {
    default:
      return flattenMessages(en);
  }
};

type IntlProps = {
  defaultLocale: string;
  children: React.ReactNode;
};

export const Intl = ({ children, defaultLocale }: IntlProps) => {
  const messages = loadLocaleData(defaultLocale);

  return (
    <IntlProvider messages={messages} locale="en" defaultLocale={defaultLocale}>
      {children}
    </IntlProvider>
  );
};
