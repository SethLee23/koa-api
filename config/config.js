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
  wx: {
    appId: 'wx36217cc6fcafacee',
    appSecret: '4315cfa28399c41c23e002f2e3d653fa',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
  },
};
