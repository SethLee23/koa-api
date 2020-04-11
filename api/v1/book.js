/*
 * @Author: your name
 * @Date: 2020-03-19 23:13:09
 * @LastEditTime: 2020-04-11 15:53:45
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \island-node\api\v1\book.js
 */
const Router = require('koa-router');
const { HotBook } = require('../../models/hot-book');

const router = new Router({
  prefix: '/v1/book',
});
router.get('/', async (ctx, next) => {
  const books = await HotBook.getAll();
  ctx.body = books;
});
module.exports = router;
