/*
 * @Author: your name
 * @Date: 2020-04-11 15:30:49
 * @LastEditTime: 2020-04-22 21:22:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\models\hot-book.js
 */
/* eslint-disable max-classes-per-file */

// 找到贴切的单词描述
const { Sequelize, Model, Op } = require('sequelize');
const { sequelize } = require('../core/db');
const { Favor } = require('./favor');

class HotBook extends Model {
  static async getAll() {
    const books = await HotBook.findAll({
      order: [
        'index',
      ],
      // where: {
      //   index: 0,
      // },
      // offset: 5,
      // limit: 5,
    });
    // 存储 book 所有 id
    const arr = [];
    books.forEach((item) => {
      arr.push(item.id);
    });
    // 获取所有喜欢的书籍p
    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: arr,
        },
      },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']], // Sequenize 求和（数组length）求总和：SUM
    });
    // 计算书籍被喜欢的次数
    books.forEach((book) => {
      book.setDataValue('fav_nums', HotBook.getEachBookStatus(book, favors));
    });
    return books;
  }

  static getEachBookStatus(book, favors) {
    let count = 0;
    favors.forEach((favor) => {
      if (book.dataValues.id === favor.dataValues.art_id) {
        count = favor.dataValues.count;
      }
    });
    return count;
  }
}

const classicFields = {
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.INTEGER,
  title: Sequelize.STRING,
};
HotBook.init(classicFields, {
  sequelize,
  tableName: 'hot_book',
});
module.exports = {
  HotBook,
};
