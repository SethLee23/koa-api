const Router = require('koa-router');

const router = new Router();
router.post('/v1/classic/latest/:uid', (ctx, next) => {
  const path = ctx.params;
  const { query } = ctx.request;
  const { body } = ctx.request;
  console.log(query);
  if (!query || JSON.stringify(query) === '{}') {
    const error = new Error('为什么错了');
    error.errorCode = 10001;
    error.status = 400;
    error.requestUrl = `${ctx.method} ${ctx.path}`;
    throw error;
  }
});

module.exports = router;
