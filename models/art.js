/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/*
 * @Author: your name
 * @Date: 2020-04-07 21:47:15
 * @LastEditTime: 2020-04-11 17:04:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\models\art.js
 */
const {
  Op,
} = require('sequelize');
// const {
//   flatten,
// } = require('lodash');
const { Movie, Music, Sentence } = require('./classic');

// 查询逻辑
class Art {
  constructor(art_id, type) {
    this.art_id = art_id;
    this.type = type;
  }
  // class ArtCollection

  async getDetail(uid) {
    const {
      Favor,
    } = require('./favor');
    const art = await Art.getData(this.art_id, this.type);
    if (!art) {
      throw new global.errs.NotFound();
    }
    const like = await Favor.userLikeIt(this.art_id, this.type, uid);
    return {
      art,
      likeStatus: like,
    };
  }

  static async getData(art_id, type) {
    const finder = {
      where: {
        id: art_id,
        // art_id,
      },
    };
    let art = null;
    // 根据type来判断查询哪一个数据库
    switch (Number(type)) {
      case 100:
        art = await Movie.findOne(finder);
        break;
      case 200:
        art = await Music.findOne(finder);
        break;
      case 300:
        art = await Sentence.findOne(finder);
        break;
      case 400:
        break;
      default:
        break;
    }
    return art;
  }
  // 学习写法 思路：妙啊！！！switch case 解除大法

  static async getList(artInfoList) {
    // 三组id
    const artInfoObj = {
      100: [],
      200: [],
      300: [],
    };
    for (const artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.dataValues.art_id);
    }
    const arts = [];
    for (const key in artInfoObj) {
      // 我的思路 ： 还是switch
      // 1. 抽离for循环中的逻辑 保留单层
      // 2. 存在空数组形成空查,需要判断数组中是否有值
      // 3. obj 的key是字符串
      // 4. 二维数组需要拍平
      if (artInfoObj[key].length) {
        const art = await Art._getListByType(artInfoObj[key], parseInt(key));
        arts.push(art);
      }
    }
    return arts.flat();
  }

  static async _getListByType(ids, type) {
    let arts = [];
    const finder = {
      where: {
        id: {
          [Op.in]: ids, // 查询在数组中的
        },
      },
    };
    // const scope = 'bh';
    switch (type) {
      case 100:
        arts = await Movie.findAll(finder);
        break;
      case 200:
        arts = await Music.findAll(finder);
        break;
      case 300:
        arts = await Sentence.findAll(finder);
        break;
      case 400:
        break;
      default:
        break;
    }
    return arts;
  }

  // very bad 写法：根据不同的类型获取到不同的ids数组后统一进行一次查询
  // static async getDetail(art_id, type, uid) {
  //   const art = await Art.getData(art_id, type, uid);
  //   if (!art) {
  //     throw new global.NotFound();
  //   }
  //   // const like = await Favor.userLikeIt(art_id, type, uid);
  //   return {
  //     art,
  //     // likeStatus: like,
  //   };
  // }
}
module.exports = { Art };
