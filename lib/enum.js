/*
 * @Author: your name
 * @Date: 2020-03-29 00:32:40
 * @LastEditTime: 2020-04-09 00:34:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\lib\enum.js
 */
/* eslint-disable no-restricted-syntax */
function isThisType(val) {
  for (const key in this) {
    if (this[key] === val) {
      return true;
    }
  }
  return false;
}


const LoginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
  isThisType,
};
const ClassicType = {
  MOVIE: 100,
  MUSIC: 200,
  SENTENCE: 300,
  BOOK: 400,
  isThisType,
};
module.exports = { LoginType, ClassicType };
