import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes } from 'prism-react-renderer';

const { github: lightCodeTheme, dracula: darkCodeTheme } = themes;

const config: Config = {
  title: 'Bifrost',
  tagline: 'Start your project in the best conditions',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/bifrost/',
  baseUrlIssueBanner: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  trailingSlash: false,
  favicon: 'img/favicon.ico',
  organizationName: 'theodo', // Usually your GitHub org/user name.
  projectName: 'bifrost', // Usually your repo name.
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',

      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    respectPrefersColorScheme: true,
    navbar: {
      title: 'Bifrost',
      logo: {
        alt: 'Bifrost Logo',
        src: 'img/bifrost.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'introduction',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/theodo-group/bifrost',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs',
            },
            {
              label: 'Getting started',
              to: '/docs/getting-started',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/theodo-group/bifrost',
            },
          ],
        },
        {
          title: 'Acknowledgments',
          items: [
            {
              label: 'Icons created by Freepik - Flaticon',
              href: 'https://www.flaticon.com',
            },
            {
              label: 'Bifrost icons created by Flat Icons - Flaticon',
              href: 'https://www.flaticon.com/free-icons/bifrost',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
