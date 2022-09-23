const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * environment variables that will be shared for the client and server-side
   */
  env: {
    ENVIRONMENT: process.env.NODE_ENV,
    VERSION: process.env.VERSION,
  },
  reactStrictMode: true,
  // allow for 80% smaller docker images
  output: 'standalone',
  // experimental, however will be released the default in Nextjs 12.2.0
  swcMinify: true,

  experimental: {
    // this includes files from the monorepo base two directories up, required for docker build
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};

module.exports = nextConfig;
