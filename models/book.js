/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/*
 * @Author: your name
 * @Date: 2020-04-11 19:14:18
 * @LastEditTime: 2020-04-22 21:08:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\models\book.js
 */
/* eslint-disable max-classes-per-file */

// 找到贴切的单词描述
const { Sequelize, Model, Op } = require('sequelize');
const util = require('util');
const axios = require('axios');
const { sequelize } = require('../core/db');
const { Favor } = require('./favor');

class Book extends Model {
  // constructor(id) {
  //   super();
  //   this.id = id;
  // }

  async detail(id) {
    const url = util.format(global.config.yushu.detailUrl, id);
    const detail = await axios.get(url);
    return detail.data;
  }

  static async getSearchList(start, count, q) {
    const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), count, start, 1);
    const search = await axios.get(url);
    return search.data;
  }

  static async myFavorBookList(uid) {
    const count = await Favor.count({
      where: {
        type: 400,
        uid,
      },
    });
    return count;
  }
}

const classicFields = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, // 自定义 非自增
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
};
Book.init(classicFields, {
  sequelize,
  tableName: 'book',
});
module.exports = {
  Book,
};
