const Router = require('koa-router');

const router = new Router({
  prefix: '/v1/user',
});
const { RegisterValidater } = require('../../validators/validator');
const { User } = require('../../models/user');
// 新增数据
router.post('/register', async (ctx, next) => {
  // 思维路径
  // 接收参数 验证
  const v = await new RegisterValidater().validate(ctx);
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password'),
    nickname: v.get('body.nickname'),
  };
  User.create(user);
});
// router.get('/register', (ctx, next) => {
//   ctx.body = { hello: 'world' };
// });
// router.delete('/register', (ctx, next) => {
//   ctx.body = { hello: 'world' };
// });

module.exports = router;
