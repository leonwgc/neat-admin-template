// eslint-disable-next-line @typescript-eslint/no-require-imports
const { build } = require('@derbysoft/pack');

build({
  dist: './docs',
  rsConfig: {
    output: {
      cleanDistPath: false,
      assetPrefix: '/neat-admin-template/',
    },
    html: {
      template: './index.html',
      title: 'Neat Admin',
      favicon: './public/favicon.ico',
    },
    resolve: {
      aliasStrategy: 'prefer-tsconfig',
    },
    performance: {
      chunkSplit: {
        strategy: 'single-vendor',
      },
    },
    tools: {
      rspack: (config, { rspack }) => {
        config.plugins = config.plugins || [];
        config.plugins.push(
          new rspack.IgnorePlugin({
            resourceRegExp: /\.(md|txt)$/,
          }),
        );
        return config;
      },
    },
  },
});
