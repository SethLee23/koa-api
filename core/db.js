/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
/*
 * @Author: your name
 * @Date: 2020-04-16 23:37:29
 * @LastEditTime: 2020-04-23 23:23:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\core\db.js
 */
const { Sequelize, Model } = require('sequelize');
const { unset, clone, isArray } = require('lodash');
const {
  dbName,
  host,
  port,
  user,
  password,
} = require('../config/config').database;

const sequelize = new Sequelize(dbName, user, password, {
  // 数据库类型
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {
    // create_time update_time delete_time
    timestamps: false,
    paranoid: true,
  },
});
sequelize.sync({
  // force: true,
  force: false,
});
Model.prototype.toJSON = function () {
  const data = clone(this.dataValues);
  unset(data, 'updated_at');
  unset(data, 'created_at');
  unset(data, 'deleted_at');
  for (const key in data) {
    if (key === 'image') {
      if (!data[key].startWidth('http')) {
        data[key] = global.config.host + data[key];
      }
    }
  }
  if (isArray(this.exclude)) {
    this.exclude.forEach((element) => {
      unset(data, element);
    });
  }
  return data;
};

module.exports = { sequelize };
