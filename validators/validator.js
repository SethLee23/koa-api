/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
const { LinValidator, Rule } = require('../core/lin-validator-v2');
const { User } = require('../models/user');
const { LoginType, ClassicType } = require('../lib/enum');

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule('isInt', '需要是正整数', { min: 1 })];
  }
}

class RegisterValidater extends LinValidator {
  constructor() {
    super();
    this.email = [new Rule('isEmail', '不符合Email规范')];
    this.password = [
      new Rule('isLength', '密码最少6位字符，最多32位字符', {
        min: 6,
        max: 32,
      }),
      // eslint-disable-next-line no-useless-escape
    ];
    this.password2 = this.password;
    this.nickname = [
      new Rule('isLength', '密码最少6位字符，最多32位字符', {
        min: 4,
        max: 32,
      })];
  }

  // eslint-disable-next-line class-methods-use-this
  validatePassword(vals) {
    const { password, password2 } = vals.body;
    if (password !== password2) {
      throw new Error('两个密码需要相同');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async validateEmail(vals) {
    const { email } = vals.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      throw new Error('邮箱已存在');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async validateNickname(vals) {
    const { nickname } = vals.body;
    const user = await User.findOne({
      where: {
        nickname,
      },
    });
    if (user) {
      throw new Error('用户名已存在');
    }
  }
}

class TokenValidValidater extends LinValidator {
  constructor() {
    super();
    this.account = [new Rule('isLength', '不符合规则', { min: 4, max: 32 })];
    this.secret = [
      // 不是必须传入的
      // 多种类型的登录
      // 1.可以不传 2.传了要确保正确
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', { min: 6, max: 128 }),
    ];
  }

  // type 枚举
  validateLoginType(vals) {
    const { type } = vals.body;
    if (!type) {
      throw new Error('type 必须是参数');
    }
    if (!LoginType.isThisType(type)) {
      throw new Error('type 参数不合法');
    }
  }
}
class NotEmptyValidater extends LinValidator {
  constructor() {
    super();
    this.token = [new Rule('isLength', 'token不能为空', { min: 1 })];
  }
}
class LikeValidator extends PositiveIntegerValidator {
  constructor() {
    super();
    // eslint-disable-next-line no-use-before-define
    const checker = new CheckType(ClassicType);
    this.validateType = checker.check.bind(checker);
    // this.validateType = checkType;
  }
}
class ClassicValidator extends LikeValidator {

}
// 使用工厂模式接受类型并判断是否符合条件
class CheckType {
  constructor(type) {
    this.enumType = type;
  }

  check(vals) {
    const type = vals.body.type || vals.path.type;
    if (!type) {
      throw new Error('type 必须是参数');
    }
    if (!this.enumType.isThisType(parseInt(type, 10))) {
      throw new Error('type 参数不合法');
    }
  }
}
class SearchValidator extends LinValidator {
  constructor() {
    super();
    // 关键字 页码 页面获取条数
    this.start = [
      new Rule('isOptional', '', 0),
      new Rule('isInt', 'start不符合规范', { min: 0, max: 60000 }),
    ];
    this.count = [
      new Rule('isOptional', '', 20),
      new Rule('isInt', 'count不符合规范', { min: 1, max: 20 }),
    ];
    this.q = [new Rule('isLength', '搜索关键词不得为空', { min: 1, max: 22 })];
  }
}
// function checkType(vals) {
//   let type = vals.body.type || vals.path.type;
//   type = parseInt(type, 10);
//   this.parsed.path.type = type;
//   if (!type) {
//     throw new Error('type 必须是参数');
//   }
//   if (!ClassicType.isThisType(type)) {
//     throw new Error('type 参数不合法');
//   }
// }
module.exports = {
  PositiveIntegerValidator,
  RegisterValidater,
  TokenValidValidater,
  NotEmptyValidater,
  LikeValidator,
  ClassicValidator,
  SearchValidator,
};
