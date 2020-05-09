const getConfig = require('./webpack.base.config');

module.exports = {
  mode: 'production',
  ...getConfig(),
};
