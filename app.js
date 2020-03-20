
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');

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
