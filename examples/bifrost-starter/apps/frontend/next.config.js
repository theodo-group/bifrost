const path = require('path');

// const axios = require('axios');

// const slackToken = 'xoxb-YOUR-TOKEN_HERE';
// const SLACK_CSP_REPORT_URI = process.env.SLACK_WEBHOOK_CSP_REPORT_HEADER

// run().catch(err => console.log(err));

// // ,"referrer":"","violated-directive":"script-src","effective-directive":"script-src","original-policy":"default-src https://confidentiel.example.net; img-src https://confidentiel.example.net; report-uri https://hooks.slack.com/workflows/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","disposition":"report","blocked-uri":"wasm-eval","line-number":2,"column-number":170590,"source-file":"chrome-extension","status-code":200,"script-sample":""}
// async function run() {
//   const cspReport={
//     "blocked-uri": "eval",
//     "disposition": "report",
//     "document-uri": "http://localhost:4242/login",
//     "effective-directive": "script-src",
//     "original-policy": "default-src https://confidentiel.example.net; img-src https://confidentiel.example.net; report-uri /api/headers",
//     "column-number": "26",
//     "line-number": "1889",
//     "referrer": "http://localhost:4242/login",
//     "script-sample": "",
//     "source-file": "http://localhost:4242/_next/static/chunks/pages/_app.js",
//     "status-code": "200",
//     "violated-directive": "script-src"};

//   const result = await fetch(SLACK_CSP_REPORT_URI, {
//     method: 'POST',
//     body: JSON.stringify(cspReport),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   console.log(result)
// }


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
  {
    // The goal of the CSP header is to allow only specific sources for each type
    // As it can block your website, we recommend using CSP-report first before adding CSP
    key: 'Content-Security-Policy-Report-Only',
    value: `default-src 'self' http://localhost:* https://confidentiel.example.net; img-src 'self' http://localhost:* https://confidentiel.example.net; report-uri /api/security-headers`,
  },
  // {
  //   // The goal of the CSP header is to allow only specific sources for each type
  //   // As it can block your website, we recommend using CSP-report first before adding CSP
  //   key: 'Content-Security-Policy',
  //   value: `default-src  https://confidentiel.example.net; img-src https://confidentiel.example.net;`,
  // },
];

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
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
