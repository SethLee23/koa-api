/* eslint-disable no-use-before-define */
const Router = require('koa-router');
const { TokenValidValidater, NotEmptyValidater } = require('../../validators/validator');
const { LoginType } = require('../../lib/enum');
const { User } = require('../../models/user');
const { generateToken } = require('../../core/util');
const { Auth } = require('../../middlewares/auth');
const { WXManager } = require('../../service/wx');

const router = new Router({
  prefix: '/v1/token',
});
// 登录（获取token）
router.post('/', async (ctx) => {
  const v = await new TokenValidValidater().validate(ctx);
  const type = v.get('body.type');
  let token;
  switch (type) {
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(v.get('body.account'));
      break;
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.password'));
      break;
    default:
      throw new global.ParamError('没有相应的处理函数');
      break;
  }
  ctx.body = {
    token,
  };
});

// 验证token
router.post('/verify', async (ctx) => {
  // token NotEmptyValidater
  const v = await new NotEmptyValidater().validate(ctx);
  const res = Auth.verifyToken(v.get('body.token'));
  ctx.body = {
    is_valid: res,
  };
});

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret);
  const token = generateToken(user.id, Auth.USER);
  return token;
}

module.exports = router;
