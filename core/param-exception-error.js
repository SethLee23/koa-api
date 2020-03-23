const HTTPExceptionError = require('./http-exception');

const ERROR_CODE = 10000;
const CODE = 400;

class ParamExceptionError extends HTTPExceptionError {
  constructor(msg, errorCode) {
    super();
    this.code = CODE;
    this.msg = msg || '参数错误';
    this.errorCode = errorCode || ERROR_CODE;
  }
}
module.exports = ParamExceptionError;
