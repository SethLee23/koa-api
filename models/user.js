/*
 * @Author: seth
 * @Date: 2020-03-21 23:47:48
 * @LastEditTime: 2020-04-01 00:19:58
 * @LastEditors: Please set LastEditors
 * @Description: user model
 * @FilePath: \island-node\models\user.js
 */
const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../core/db');
// 初始化 user 模型
class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new global.NotFound('账号不存在');
    }
    const correct = bcrypt.compareSync(plainPassword.toString(), user.password);
    if (!correct) {
      throw new global.errs.AuthFailed('密码不正确');
    }
    return user;
  }

  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid,
      },
    });
    return user;
  }

  static async registerByOpenid(openid) {
    const user = await User.create({
      openid,
    });
    return user;
  }
}
User.init({
  // 主键 关系型数据库
  // 用来区别字段,不能为空,不能重复
  // 注册 User id 设计 id 编号系统
  // 自增
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nickname: Sequelize.STRING,
  email: {
    // 最多 64 字符
    type: Sequelize.STRING(128),
    unique: true,
  },
  password: {
    // 扩展 --观察者模式
    // ES6 Reflect Vue 3.0
    type: Sequelize.STRING,
    set(val) {
      // model 属性操作
      const salt = bcrypt.genSaltSync(10);
      const psw = bcrypt.hashSync(val, salt);
      this.setDataValue('password', psw);
    },
  },
  // 每个用户对同一个小程序公众号存在唯一的openid 同一个用户小程序,公众号存在唯一的union id
  openid: {
    // 最多 64 字符
    type: Sequelize.STRING(64),
    unique: true,
  },
}, {
  sequelize,
  tableName: 'user', // 重命名
});
module.exports = {
  User,
};
