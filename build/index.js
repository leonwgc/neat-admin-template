/**
 * @file build/index.js
 * @author leon.wang
 */

const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Statics
const config = require('./config.js');
const { resolveRootPath } = require('./utils.js');

// Vendors
const { copyRecursionSync, installDependencies } = require('./utils.js');

const { build } = require('@derbysoft/pack');

const argv = yargs(hideBin(process.argv))
  .option('env', {
    alias: 'e',
    type: 'string',
    description: 'Build environment',
  })
  .parse();
const env = argv.env || 'production';

console.log(`Building ${env} Package...`);

build({
  index: resolveRootPath('src/index'),
  dist: resolveRootPath('dist/dist'),
  rsConfig: {
    html: {
      favicon: resolveRootPath('public/favicon.ico'),
      title: '',
      template: resolveRootPath('index.html'),
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
    source: {
      define: {
        'process.env.ENV': JSON.stringify(env),
      },
    },
    performance: {
      chunkSplit: {
        strategy: 'single-vendor',
      },
    },
  },
}).then(async ({ stats }) => {
  if (stats.hasErrors()) {
    console.error('Build failed T__T');
    throw stats.toString();
  }

  try {
    // 复制文件
    copyRecursionSync('build/release', config.rootDirectory);
    fs.copyFileSync(
      `build/env/config.${env}.js`,
      `${config.rootDirectory}/config.js`,
    );
    // 安装 npm 依赖
    console.log('Installing Dependencies...');
    await installDependencies(config.rootDirectory);
    console.log('Install Dependencies complete\n');
    console.log(`Build ${env} Package complete`);
  } catch (e) {
    console.error(e);
  }
});
