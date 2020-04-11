const HTTPExceptionError = require('./http-exception');

const ERROR_CODE = 0;
const CODE = 201;

class ParamExceptionError extends HTTPExceptionError {
  constructor(msg, errorCode) {
    super();
    this.code = CODE;
    this.msg = msg || 'ok';
    this.errorCode = errorCode || ERROR_CODE;
  }
}
module.exports = ParamExceptionError;
