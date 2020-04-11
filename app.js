
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const dns = require('dns');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');

dns.lookup('nodejs.cn', (err, address, family) => {
  console.log('地址: %j 地址族: IPv%s', address, family);
});
// 地址: "93.184.216.34" 地址族: IPv4
const router = new Router();
const app = new Koa();
app.use(bodyParser());
app.use(catchError);
InitManager.initCore(app, Router);
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

module.exports = {
  router,
};
