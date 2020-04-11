const HTTPExceptionError = require('./http-exception');

const ERROR_CODE = 10000;
const CODE = 404;

class NotFound extends HTTPExceptionError {
  constructor(msg, errorCode) {
    super();
    this.code = CODE;
    this.msg = msg || '资源未找到';
    this.errorCode = errorCode || ERROR_CODE;
  }
}
module.exports = NotFound;
