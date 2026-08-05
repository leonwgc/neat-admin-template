// eslint-disable-next-line @typescript-eslint/no-require-imports
const { run } = require('@derbysoft/pack');

run({
  index: ['./src/index'],
  port: 3000,
  proxy: [
    {
      context: ['/unifyplatform-backend-qa'],
      pathFilter: ['/unifyplatform-backend-qa'],
      target: 'https://unifyplatform.qa.derbysoft-test.com/',
      changeOrigin: true,
      logLevel: 'silent',
    },
  ],
  rsConfig: {
    html: {
      template: './index.html',
      title: 'Neat Design Admin',
      favicon: './public/favicon.ico',
    },
    tools: {
      rspack: { optimization: { nodeEnv: false } },
    },
    source: {
      define: {
        'process.env.NODE_ENV': JSON.stringify('development'),
        // 'process.env.NODE_ENV': JSON.stringify('uat'),
        // 'process.env.NODE_ENV': JSON.stringify('production-cn'),
        // 'process.env.NODE_ENV': JSON.stringify("qa")
        // 'process.env.NODE_ENV': JSON.stringify('internal-qa'),
      },
    },
    server: {
      open: true,
    },
  },
});
