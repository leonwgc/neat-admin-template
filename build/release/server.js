/**
 * @file server.js
 * @author leon.wang
 */

const config = require('./config.js');

const { createProxyMiddleware } = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const compression = require('compression');

const path = require('path');
const express = require('express');
const requestIp = require('request-ip');

const app = express();
const port = process.env.port || config.port;
const uri = 'http://localhost:' + port;
const proxyTable = config.proxyTable;

/**
 * 使用代理
 */
Object.keys(proxyTable).forEach((context) => {
  let options = proxyTable[context];

  if (typeof options === 'string') {
    options = {
      target: options,
      changeOrigin: true,
    };
  }

  // 代理 request 的回调
  options.onProxyReq = (proxyReq, req) => {
    // 往 header 中添加 ip 信息
    proxyReq.setHeader('ip', requestIp.getClientIp(req));
  };

  // 往 express 添加 proxy 中间件
  app.use(createProxyMiddleware(options.filter || context, options));
});

/**
 * 开启 gzip 支持
 */
app.use(compression());

/**
 * 添加 history 中间件，实现 rewrite 到 "/" 的功能
 */
app.use(history());

/**
 * 添加静态文件中间件，实现加载静态文件，并添加强制缓存的 header
 */
app.use(
  express.static(path.join(__dirname, 'dist'), {
    setHeaders: (res, path) =>
      res.setHeader(
        'Cache-Control',
        path.endsWith('index.html')
          ? 'no-cache, no-store, no_store, max-age=0, must-revalidate'
          : 'max-age=2592000'
      ),
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

/**
 * 用于存活检测
 */
app.get('/status.ci', (req, res) => res.sendStatus(200));

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('> Listening at ' + uri);
});
