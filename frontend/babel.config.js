const config = require('../babel.config');

module.exports = {
  ...config,
  plugins: [
    [
      '@arminjazi/babel-plugin-import-jsx-pragma',
      { scopeVariable: 'dom', source: '@arminjazi/dom' },
    ],
    ['@babel/plugin-transform-react-jsx', { pragma: 'dom.create' }],
  ],
};
