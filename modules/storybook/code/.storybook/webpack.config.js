const path = require('path');

module.exports = function(baseConfig, env, defaultConfig) {
  defaultConfig.module.rules.push({
    test: /\.ts(x?)$/,
    exclude: path.resolve(__dirname, '../node_modules'),
    use: [{
      loader: 'babel-loader',
    }, {
      loader: 'ts-loader',
      options: {
        configFile: path.resolve(__dirname, '../', 'tsconfig.storybook.json'),
      },
    }],
  });

  defaultConfig.resolve.modules.push(path.resolve(__dirname, '../'));

  defaultConfig.resolve.extensions.push('.tsx');
  defaultConfig.resolve.extensions.push('.ts');

  return defaultConfig;
};
