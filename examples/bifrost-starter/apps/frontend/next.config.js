const nextBundleAnalyzer = require('@next/bundle-analyzer');
const withNextIntl = require('next-intl/plugin')('./locales/i18n.ts');
const path = require('path');

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    // This header will prevent any use of user's plugins on your website
    // If you need some permissions, change the parameter of the right permission
    key: 'Permissions-Policy',
    value:
      'accelerometer=(), geolocation=(), fullscreen =(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), display-capture=()',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * environment variables that will be shared for the client and server-side
   */
  env: {},
  reactStrictMode: true,
  // allow for 80% smaller docker images
  output: 'standalone',
  // hide the x-powered-by header
  poweredByHeader: false,

  experimental: {
    // this includes files from the monorepo base two directories up, required for docker build
    outputFileTracingRoot: path.join(__dirname, '../../'),
    // experimental feature that allows for faster builds
    turbotrace: {},
    // type routes is not yet compatible with turbopack
    // typedRoutes: true,
  },
  // if you need to transpile packages, add them here (like lodash-es)
  transpilePackages: [],
  eslint: {
    // we test eslint separately in CI
    ignoreDuringBuilds: true,
  },
  typescript: {
    // we test ts separately in CI
    ignoreBuildErrors: true,
  },
  headers: async () => [
    {
      // Apply these headers to all routes in your application.
      source: '/:path*',
      headers: securityHeaders,
    },
  ],
};

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.DEV_ANALYZE_BUNDLE === 'true',
});

module.exports = withNextIntl(withBundleAnalyzer(nextConfig));
