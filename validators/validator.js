/* eslint-disable max-classes-per-file */
const { LinValidator, Rule } = require('../core/lin-validator-v2');
const { User } = require('../models/user');

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
      // new Rule('matches', '密码不符合规范', "^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,20}$"),
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
module.exports = { PositiveIntegerValidator, RegisterValidater };
