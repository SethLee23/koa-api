/*
 * @Author: your name
 * @Date: 2020-03-21 22:33:25
 * @LastEditTime: 2020-04-23 23:24:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\config\config.js
 */
module.exports = {
  // env
  enviroment: 'dev',
  // prod
  database: {
    dbName: 'test',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
  },
  security: {
    secretKey: 'asdfghj',
    expiresIn: 60 * 60,
  },
  host: 'http://localhost:3000/',
  wx: {
    appId: 'wx36217cc6fcafacee',
    appSecret: '4315cfa28399c41c23e002f2e3d653fa',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
  },
  yushu: {
    detailUrl: 'http://t.yushu.im/v2/book/id/%s',
    keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s',
  },
};
