/*
 * @Author: your name
 * @Date: 2020-04-11 15:30:49
 * @LastEditTime: 2020-04-11 17:10:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\models\hot-book.js
 */
/* eslint-disable max-classes-per-file */

// 找到贴切的单词描述
const { Op } = require('sequelize');
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const { Favor } = require('./favor');

const classicFields = {
  index: Sequelize.INTEGER, // ???
  image: Sequelize.STRING,
  author: Sequelize.INTEGER,
  title: Sequelize.STRING,
};

class HotBook extends Model {
  static async getAll() {
    const books = await HotBook.findAll({
      order: [
        'index',
      ],
    });
    const arr = [];
    books.forEach((item) => {
      arr.push(item.id);
    });
    const idArr = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: arr,
        },
      },
    });
    return idArr;
  }

  static _getFavorsById() { }
}
HotBook.init(classicFields, {
  sequelize,
  tableName: 'hot_book',
});
module.exports = {
  HotBook,
};
