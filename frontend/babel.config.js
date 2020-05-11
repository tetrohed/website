module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-jsx',
    ['@babel/plugin-transform-react-jsx', { pragma: 'dom.create' }],
    [
      '@arminjazi/babel-plugin-import-jsx-pragma',
      { scopeVariable: 'dom', source: './dom' },
    ],
  ],
};
