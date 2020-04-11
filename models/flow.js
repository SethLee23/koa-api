/*
 * @Author: your name
 * @Date: 2020-04-06 20:54:40
 * @LastEditTime: 2020-04-07 00:31:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\models\flow.js
 */
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
// 业务数据库（相当于一个中转站）
class Flow extends Model { }
Flow.init({
  index: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
  // type
  // 表和表之间有关联
}, {
  sequelize,
  tableName: 'flow',
});
module.exports = { Flow };
