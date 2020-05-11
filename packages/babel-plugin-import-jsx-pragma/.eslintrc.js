module.exports = {
  extends: [
    'semistandard',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'prettier/babel',
  ],
  env: {
    node: true,
    jest: true,
  },
};
