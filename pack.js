// eslint-disable-next-line @typescript-eslint/no-require-imports
const { run } = require('@derbysoft/pack');

run({
  port: 3000,
  proxy: [
    {
      context: ['/neat-api-dev'],
      target: 'localhost:3001',
      pathRewrite: {
        '^/neat-api-dev': '',
      },
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
    server: {
      open: true,
    },
    source: {
      define: {
        'process.env.ENV': JSON.stringify('development'),
      },
    },
  },
});
