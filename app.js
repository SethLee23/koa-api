/*
 * @Author: your name
 * @Date: 2020-03-19 14:05:31
 * @LastEditTime: 2020-04-22 22:45:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\app.js
 */

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path');
// const dns = require('dns');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');

// dns.lookup('nodejs.cn', (err, address, family) => {
//   console.log('地址: %j 地址族: IPv%s', address, family);
// });
// 地址: "93.184.216.34" 地址族: IPv4
const router = new Router();
const app = new Koa();
app.use(bodyParser());
app.use(static(path.join(__dirname, './static')))
app.use(catchError);
InitManager.initCore(app, Router);
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

module.exports = {
  router,
};
