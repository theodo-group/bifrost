import nextJest from 'next/jest';

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' });

const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

/**
 * @type {import(@jest/types).Config.InitialOptions}
 * Any custom config you want to pass to Jest
 */
const config = {
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/jestAfterEnv.setup.ts'],
  testRegex: TEST_REGEX,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/**/*.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/cypress/'],

  coveragePathIgnorePatterns: [
    '<rootDir>/src/.next/'
  ],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>'],
  testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(config);
