module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'semistandard',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'prettier/babel',
    'prettier/@typescript-eslint',
  ],
  env: {
    node: true,
  },
};
