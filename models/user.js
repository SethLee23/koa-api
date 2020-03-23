const { Sequelize, Model } = require('sequelize');
const { db } = require('../core/db');
// 初始化 user 模型
class User extends Model {

}
User.init({
  // 主键 关系型数据库
  // 用来区别字段,不能为空,不能重复
  // 注册 User id 设计 id 编号系统
  // 自增
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  // 每个用户对同一个小程序公众号存在唯一的openid 同一个用户小程序,公众号存在唯一的union id
  openid: {
    // 最多 64 字符
    type: Sequelize.STRING(64),
    unique: true,
  },
  test: Sequelize.STRING,
}, {
  sequelize: db,
  tableName: 'user',
});
