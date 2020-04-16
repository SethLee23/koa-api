/*
 * @Author: your name
 * @Date: 2020-03-19 23:13:09
 * @LastEditTime: 2020-04-16 22:54:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\api\v1\book.js
 */
const Router = require('koa-router');
const { HotBook } = require('../../models/hot-book');
const { PositiveIntegerValidator, SearchValidator } = require('../../validators/validator');
const { Book } = require('../../models/book');
const { Auth } = require('../../middlewares/auth');

const router = new Router({
  prefix: '/v1/book',
});

router.get('/hot_list', async (ctx, next) => {
  const books = await HotBook.getAll();
  ctx.body = {
    books,
  };
});

router.get('/:id/detail', async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx);
  const detail = new Book(v.get('path.id')).detail();
  ctx.body = await detail;
  // throw new global.Success();
});

router.get('/search', async (ctx, next) => {
  const v = await new SearchValidator().validate(ctx);
  const search = await Book.getSearchList(v.get('query.start'), v.get('query.count'), v.get('query.q'));
  ctx.body = search;
});

router.get('/favor/count', new Auth().m, async (ctx, next) => {
  // myFavorBookList
  const count = await Book.myFavorBookList(ctx.auth.uid);
  ctx.body = {
    count,
  };
});
module.exports = router;
