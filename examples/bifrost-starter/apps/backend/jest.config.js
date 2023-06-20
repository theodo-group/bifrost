/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@helpers/(.*)': '<rootDir>/helpers/$1',
    '^@auth/(.*)': '<rootDir>/modules/auth/$1',
    '^@modules/(.*)': '<rootDir>/modules/$1',
    '^@testUtils/(.*)': '<rootDir>/testUtils/$1',
    '^@decorators/(.*)': '<rootDir>/decorators/$1',
    '^@root/(.*)': '<rootDir>/$1',
  },
  setupFiles: ['<rootDir>/testUtils/setup.ts'],
  rootDir: './src',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  testTimeout: 10000,
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 75,
    },
  },
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!<rootDir>/testUtils/**',
    '!<rootDir>/main.ts',
    '!<rootDir>/modules/logger/**',
  ],
};

module.exports = config;
