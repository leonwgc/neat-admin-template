/**
 * @file build/index.js
 * @author leon.wang
 */

const fs = require('fs');

// Statics
const config = require('./config.js');
const { resolveRootPath } = require('./utils.js');

// Vendors
const { copyRecursionSync, installDependencies } = require('./utils.js');

const { build } = require('@derbysoft/pack');

const env = process.env.NODE_ENV;

console.log(`Building ${env} Package...`);

build({
  index: resolveRootPath('src/index'),
  dist: resolveRootPath('dist/dist'),
  rsConfig: {
    html: {
      // favicon: resolveRootPath('src/assets/icons/favicon.ico'),
      title: '',
    },
    tools: {
      rspack: { optimization: { nodeEnv: false } },
    },
    source: {
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
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
      `${config.rootDirectory}/config.js`
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
