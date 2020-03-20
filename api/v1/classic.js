const Router = require('koa-router');

const router = new Router();
router.post('/v1/classic/latest/:uid', (ctx, next) => {
  const path = ctx.params;
  const { query } = ctx.request;
  const { body } = ctx.request;
  console.log(path, query, body);
  // try {
  throw new Error('API Exception');
  // } catch (err) {
  //   console.log('err', err);
  //   ctx.body = err;
  // }
  // ctx.body = { hello: 'world232232' };
});

module.exports = router;
