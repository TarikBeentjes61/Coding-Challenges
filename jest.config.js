module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^sharp$': './server/__mocks__/sharp.js',
  },
  setupFilesAfterEnv: ['./server/tests/setupServerTests.js'],
  testMatch: ['**/src/tests/**/*.test.js', '**/server/tests/**/*.test.js'],
  verbose: true
};