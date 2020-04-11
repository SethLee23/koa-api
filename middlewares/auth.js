/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const basicAuth = require('basic-auth');

class Auth {
  constructor(level) {
    this.level = level || 1;
    Auth.USER = 8;
    Auth.ADMIN = 16;
    Auth.SUPER_ADMIN = 32;
  }

  get m() {
    return async (ctx, next) => {
      // token 检测 header 身份验证 httpBasicAuth
      const userToken = basicAuth(ctx.req);
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbidden();
      }
      try {
        var decode = jwt.verify(userToken.name, global.config.security.secretKey);
      } catch (err) {
        // token 不合法
        if (err.name === 'JsonWebTokenError') {
          throw new global.errs.Forbidden('token格式错误');
          //  token 过期
        } else if (err.name === 'TokenExpiredError') {
          throw new global.errs.Forbidden('token过期');
        }
      }
      if (decode.scope < this.level) {
        throw new global.errs.Forbidden('权限不足');
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      };
      // 注意这个给地方需要调用
      await next();
    };
  }

  static verifyToken(userToken) {
    try {
      const decode = jwt.verify(userToken, global.config.security.secretKey);
      return decode;
    } catch (err) {
      return false;
    }
  }
}

module.exports = {
  Auth,
};
