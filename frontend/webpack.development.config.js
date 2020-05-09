const path = require('path');
const baseConfig = require('./webpack.base.config')();

module.exports = {
  ...baseConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'webpackBuild'),
    port: 3000,
    hot: true
  },
};
