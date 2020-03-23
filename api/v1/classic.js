const Router = require('koa-router');
const ParamExceptionError = require('../../core/param-exception-error');
const { PositiveIntegerValidator } = require('../../validators/validator');

const router = new Router();
router.post('/v1/classic/latest/:id', (ctx, next) => {
  const v = new PositiveIntegerValidator().validate(ctx);
  const id = v.get('path.id');
  // if (!query || JSON.stringify(query) === '{}') {
  //   throw new global.ParamError();
  // }
});

module.exports = router;
