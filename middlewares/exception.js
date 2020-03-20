const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // error 堆栈调用信息
    // error 简化，清晰明了
    // 一、 返回信息
    // 1. HTTP status code 2xx 3xx 4xx 5xx
    // 2. message
    // 3. error_code 详细，开发者自己定义
    // 4. request url
    // 二、 根据错误类型进行不同的处理
    ctx.body = '服务器有问题了，骚等一下';
  }
};
module.exports = catchError;
