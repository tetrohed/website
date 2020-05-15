module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'semistandard',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'prettier/babel',
    'prettier/@typescript-eslint',
  ],
  rules: {
    // TODO Have to write my own linter since react jsx wont work with my library
    '@typescript-eslint/no-unused-vars': "off",
  },
  env: {
    node: true,
    jest: true,
    browser: true,
  },
};
