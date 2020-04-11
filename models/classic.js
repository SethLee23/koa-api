/*
 * @Author: your name
 * @Date: 2020-04-01 00:15:12
 * @LastEditTime: 2020-04-08 23:49:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\models\classic.js
 */
/* eslint-disable max-classes-per-file */

// 找到贴切的单词描述
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../core/db');

const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT,
};

class Movie extends Model { }
Movie.init(classicFields, {
  sequelize,
  tableName: 'movie',
});

class Music extends Model { }
const musicFields = { url: Sequelize.STRING, ...classicFields };

Music.init(musicFields, {
  sequelize,
  tableName: 'music',
});

class Sentence extends Model { }
Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence',
});

module.exports = {
  Movie,
  Music,
  Sentence,
};
