module.exports = {
  globalSetup: './server/tests/setup.js',
  globalTeardown: './server/tests/teardown.js',
  testEnvironment: './server/tests/custom-env.js',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^sharp$': './server/__mocks__/sharp.js',
  },
  testMatch: ['**/src/tests/**/*.test.js', '**/server/tests/**/*.test.js'],
  verbose: true
};