module.exports = {
  collectCoverageFrom: [
    'src/**/*.(ts|tsx|js|jsx)',
    '!src/**/*.{(types),}.(ts)',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.ts',
    '@utils/(.*)': '<rootDir>/../utils/$1',
  },
  testMatch: ['<rootDir>/src/*.test.*'],
};
