// nodejs 提供的工具函数
const util = require('util');
const axios = require('axios');
const { User } = require('../models/user');// 小程序 code 登录
const { generateToken } = require('../core/util');
const { Auth } = require('../middlewares/auth');
// 生成微信 openid 唯一标识
// union id 必须符合一定条件
class WXManager {
  constructor() { }

  static async codeToToken(code) {
    // const url = global.config.wx.
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code,
    );
    const res = await axios.get(url);
    const { errcode, errmsg } = res.data;
    if (res.status !== 200) {
      throw new global.errs.AuthFailed(`openid 获取失败${errmsg}`);
    }

    if (errcode && errcode !== 0) {
      throw new global.errs.AuthFailed(`openid 获取失败${errmsg}`);
    }

    // 获取 openid
    // 建立档案 写入 user 表
    let user = await User.getUserByOpenid(res.data.openid);
    if (!user) {
      user = await User.registerByOpenid(res.data.openid);
    }
    return generateToken(user.id, Auth.USER);
  }
}

module.exports = {
  WXManager,
};
