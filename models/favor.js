/* eslint-disable no-return-await */
/* eslint-disable camelcase */
/*
 * @Author: your name
 * @Date: 2020-04-07 22:56:45
 * @LastEditTime: 2020-04-09 23:28:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\models\favor.js
 */
const {
  Op,
} = require('sequelize');
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');
const { Art } = require('./art');
// 业务数据库（相当于一个中转站）
class Favor extends Model {
  static async like(art_id, type, uid) {
    // 1. favor 表添加记录
    // 2. classic 表操作fav_nums
    // 数据库事务-保证数据的一致性（保证第一步和第二部都执行）
    // ACID 原子性 一致性 隔离性 持久性
    const favor = await Favor.findOne({
      where: { art_id, type, uid },
    });
    if (favor) {
      throw new global.errs.LikeError();
    }
    return sequelize.transaction(async (t) => {
      await Favor.create({ art_id, type, uid }, { transaction: t });
      const art = await Art.getData(art_id, type);
      await art.increment('fav_nums', { by: 1, transaction: t });
    });
  }

  static async disLike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: { art_id, type, uid },
    });
    if (!favor) {
      throw new global.errs.DisLikeError();
    }
    return sequelize.transaction(async (t) => {
      // 销毁自身
      await favor.destroy({ force: false, transaction: t });
      const art = await Art.getData(art_id, type);
      await art.decrement('fav_nums', { by: 1, transaction: t });
    });
  }

  // static async getFavor(id, type, uid) {
  //   const favor = await Favor.findAll({
  //     where: { id, type, uid },
  //   });
  //   if (!favor) {
  //     throw new global.NotFound();
  //   }
  //   return favor;
  // }

  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({ where: { uid, art_id, type } });
    return !!favor;
  }

  // 由于点赞表包括所有的点赞信息（包括书籍）此时我们只查询除书籍外的其他点赞列表
  static async getMyClassicFavors(uid) {
    const favors = await Favor.findAll({
      where: {
        uid,
        type: {
          [Op.not]: 400, // sequenize 提供的操作 不为 400
        },
      },
    });
    if (!favors) {
      throw new global.NotFound();
    }
    // 需要根据favor表中的相关信息来获取真实列表
    //  防止循环查询数据库 使用 in 查询
    return await Art.getList(favors);
  }
  // static async getMyClassicFavors(uid) {
  //   const arts = await Favor.findAll({
  //     where: {
  //       uid,
  //       type: {
  //         [Op.not]: 400,
  //       },
  //     },
  //   });
  //   if (!arts) {
  //     throw new global.errs.NotFound();
  //   }
  //   return await Art.getList(arts);
  // }

  // static async getBookFavor(bookId, uid) {
  //   const favorNums = await Favor.count({
  //     where: {
  //       artId: bookId,
  //       type: 400,
  //     },
  //   });
  //   const myFavor = await Favor.findOne({
  //     where: {
  //       uid,
  //       artId: bookId,
  //       type: 400,
  //     },
  //   });
  //   return {
  //     favNums: favorNums,
  //     likeStatus: myFavor ? 1 : 0,
  //   };
  // }
}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'favor',
});
module.exports = { Favor };
