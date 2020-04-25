/*
 * @Author: your name
 * @Date: 2020-03-19 23:13:09
 * @LastEditTime: 2020-04-22 21:40:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\api\v1\book.js
 */
const Router = require('koa-router');
const { HotBook } = require('../../models/hot-book');
const { PositiveIntegerValidator, SearchValidator, AddShortCommentValidator } = require('../../validators/validator');
const { Book } = require('../../models/book');
const { Comment } = require('../../models/comment');
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
  const detail = new Book().detail(v.get('path.id'));
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

router.post('/add/short_comment', new Auth().m, async (ctx, next) => {
  const v = await new AddShortCommentValidator().validate(ctx, { id: 'book_id' });
  // 短评是单独的数据库还是直接放在bookModel
  // 新增短评表，用来存储id以及对应的短评
  // console.log(v);
  await Comment.addComment(v.get('body.book_id'), v.get('body.content'));
  throw new global.Success('短评发送成功');
  // ctx.body = {
  //   hello: 'world',
  // };
});
router.get('/:book_id/short_comment', new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: 'book_id' });
  const comments = await Comment.getCommentList(v.get('path.book_id'));
  ctx.body = { comment: comments, book_id: v.get('path.book_id') };
});
router.get('/hot', new Auth().m, async (ctx, next) => {
  ctx.body = {
    hot: ['python', '冬夜鬼屋'],
  };
});
module.exports = router;
