module.exports = {
  collectCoverageFrom: [
    'src/**/*.(ts|tsx|js|jsx)',
    '!src/**/*.{(types),}.(ts)',
  ],
  testMatch: ['<rootDir>/src/*.test.*'],
  transformIgnorePatterns: ['!@arminjazi/common'],
  testEnvironment: 'node',
};
