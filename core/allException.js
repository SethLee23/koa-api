/*
 * @Author: your name
 * @Date: 2020-03-29 22:57:17
 * @LastEditTime: 2020-04-07 23:30:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \island-node\core\allException.js
 */
/* eslint-disable max-classes-per-file */
const HTTPExceptionError = require('./http-exception');

const ERROR_CODE = 10000;
const CODE = 401;

class AuthFailed extends HTTPExceptionError {
  constructor(msg, errorCode) {
    super();
    this.code = CODE;
    this.msg = msg || '授权失败';
    this.errorCode = errorCode || ERROR_CODE;
  }
}

class Forbidden extends HTTPExceptionError {
  constructor(msg, errorCode) {
    super();
    this.code = 403;
    this.msg = msg || '禁止访问';
    this.errorCode = errorCode || 10006;
  }
}

class LikeError extends HTTPExceptionError {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || '你已经点赞过';
    this.errorCode = errorCode || 10006;
  }
}
class DisLikeError extends HTTPExceptionError {
  constructor(msg, errorCode) {
    super();
    this.code = 400;
    this.msg = msg || '你已经取消了点赞';
    this.errorCode = errorCode || 10006;
  }
}
module.exports = {
  AuthFailed, Forbidden, LikeError, DisLikeError,
};
