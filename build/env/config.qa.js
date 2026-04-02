/**
 * @file config.qa.js
 * @author leon.wang
 */

module.exports = {
  port: '8080',

  proxyTable: {
    '/qa': 'http://axxxx:9080',
  },
};
