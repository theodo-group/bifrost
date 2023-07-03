/** @type {import('dependency-cruiser').IConfiguration} */
const config = require('dependency-cruiser-config-custom');

config.forbidden
  .find((rule) => rule.name === 'no-orphans')
  .from.pathNot.push('src/testUtils/setup.ts');

module.exports = config;
