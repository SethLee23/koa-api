const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // error 堆栈调用信息
    if (error.errorCode) {
      ctx.body = {
        error_code: error.errorCode,
        msg: error.message,
        request: error.requestUrl,
      };
      ctx.status = error.status;
    }
  }
};
module.exports = catchError;
