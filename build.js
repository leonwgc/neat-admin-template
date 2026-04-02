// eslint-disable-next-line @typescript-eslint/no-require-imports
const { build } = require('packrs');

build({
  dist: './docs',
  rsConfig: {
    output: {
      cleanDistPath: false,
      assetPrefix: '/ant-admin-template/',
    },
    html: {
      template: './index.html',
      title: 'Ant Admin',
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
        // 使用 IgnorePlugin 忽略文档文件和许可证文件
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
