/*
 * @Author: your name
 * @Date: 2020-03-19 23:12:58
 * @LastEditTime: 2020-04-11 15:21:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\api\v1\classic.js
 */
/* eslint-disable camelcase */
const Router = require('koa-router');
const { PositiveIntegerValidator, ClassicValidator } = require('../../validators/validator');
const { Auth } = require('../../middlewares/auth');
const { Flow } = require('../../models/flow');
const { User } = require('../../models/user');
const { Art } = require('../../models/art');
const { Favor } = require('../../models/favor');

const router = new Router({
  prefix: '/v1/classic',
});
// 1.普通权限管理，检测用户是否有token，且token是否合法
// 2.用户管理限制，分级 scope（根据 level 来进行权限管理）
router.get('/latest', new Auth().m, async (ctx, next) => {
  // const v = await new PositiveIntegerValidator().validate(ctx);
  // 排序 1，2，3，4.....max
  // 倒序 4，3，2，1.....
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC'],
    ],
  });
  const art = await Art.getData(flow.art_id, flow.type);
  art.setDataValue('index', flow.index);
  ctx.body = art;
});
// router.get('/:index/next', new Auth().m, async (ctx) => {
//   const v = await new PositiveIntegerValidator().validate(ctx, {
//     id: 'index',
//   });
//   const index = v.get('path.index');
//   const flow = await Flow.findOne({
//     where: {
//       index: index + 1,
//     },
//   });
//   if (!flow) {
//     throw new global.errs.NotFound();
//   }
//   const art = await Art.getData(flow.art_id, flow.type);
//   const like_next = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
//   art.setDataValue('index', flow.index);
//   art.setDataValue('like_Status', like_next);
//   ctx.body = art;
// });

// router.get('/:index/previous', new Auth().m, async (ctx) => {
//   const v = await new PositiveIntegerValidator().validate(ctx, {
//     id: 'index',
//   });
//   const index = v.get('path.index');
//   const flow = await Flow.findOne({
//     where: {
//       index: index - 1,
//     },
//   });
//   if (!flow) {
//     throw new global.errs.NotFound();
//   }
//   const art = await Art.getData(flow.artId, flow.type);
//   const like_previous = await Favor.userLikeIt(flow.artId, flow.type, ctx.auth.uid);
//   art.setDataValue('index', flow.index);
//   art.setDataValue('like_status', like_previous);
//   ctx.body = art;
// });

// 获取我喜欢的期刊的详情
router.get('/:type/:id/favor', new Auth().m, async (ctx, next) => {
  const v = await new ClassicValidator().validate(ctx);
  // 根据参数查询数据库 获取详情
  const detail = await new Art(v.get('path.id'), parseInt(v.get('path.type'), 10)).getDetail(ctx.auth.uid);
  if (!detail) {
    throw new global.NotFound();
  }
  ctx.body = {
    fav_nums: detail.art.fav_nums,
    likeStatus: detail.likeStatus,
  };
});
// 获取用户所有喜欢的期刊的列表
router.get('/favor', new Auth().m, async (ctx, next) => {
  const { uid } = ctx.auth;
  const favors = await Favor.getMyClassicFavors(uid);
  ctx.body = favors;
});

// 获取期刊的详情(是否喜欢期刊)
router.get('/:type/:id', new Auth().m, async (ctx, next) => {
  // 验证参数
  const v = await new ClassicValidator().validate(ctx);
  // 根据参数查询数据库 获取详情
  const detail = await new Art(v.get('path.id'), parseInt(v.get('path.type'), 10)).getDetail(ctx.auth.uid);
  if (!detail) {
    throw new global.NotFound();
  }
  detail.art.setDataValue('likeStatus', detail.likeStatus);
  ctx.body = detail.art;
});
// router.get('/favor', new Auth().m, async (ctx) => {
//   const { uid } = ctx.auth;
//   ctx.body = await Favor.getMyClassicFavors(uid);
// });
module.exports = router;
