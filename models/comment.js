/* eslint-disable camelcase */
/*
 * @Author: your name
 * @Date: 2020-04-18 00:16:39
 * @LastEditTime: 2020-04-18 01:43:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\models\comment.js
 */

const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
// 业务数据库（相当于一个中转站）
class Comment extends Model {
  static async addComment(book_id, content) {
    const comment = await Comment.findOne({
      where: {
        book_id,
        content,
      },
    });
    if (comment) {
      // 进行加一
      await comment.increment('nums', { by: 1 });
    } else {
      // 进行新增
      await Comment.create({
        book_id,
        content,
        nums: 1,
      });
    }
  }

  static async getCommentList(book_id) {
    const comments = await Comment.findAll({
      where: {
        book_id,
      },
    });
    return comments;
  }

  // js 序列化机制
  toJSON() {
    return {
      content: this.getDataValue('content'),
      nums: this.getDataValue('nums'),
    };
  }
}
Comment.init({
  book_id: Sequelize.INTEGER,
  content: Sequelize.STRING(12), // 短评内容
  nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }, // 短评数量，用于加一
}, {
  sequelize,
  tableName: 'comment',
});
module.exports = { Comment };
