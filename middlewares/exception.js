const HTTPExceptionError = require('../core/http-exception');

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (global.config.enviroment === 'dev') {
      throw error;
    }
    // throw error;
    // error 堆栈调用信息
    if (error instanceof HTTPExceptionError) {
      ctx.body = {
        error_code: error.errorCode,
        msg: error.msg,
        request: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = error.code;
    } else {
      ctx.body = {
        error_code: 999,
        msg: '出现未知错误 0(n_n)0',
        request: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = 500;
    }
  }
};
module.exports = catchError;
