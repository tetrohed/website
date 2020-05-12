module.exports = {
  collectCoverageFrom: [
    'src/**/*.(ts|tsx|js|jsx)',
    '!src/**/*.{(types),}.(ts)',
  ],
  moduleNameMapper: {
    '@utils/(.*)': '<rootDir>/../../utils/$1',
  },
  testMatch: ['<rootDir>/tests/*.test.*'],
};
