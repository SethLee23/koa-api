const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.InitLoadRouters();
    InitManager.loadHTTPException();
    InitManager.loadConfig();
  }

  // 导入所有的路由
  static InitLoadRouters() {
    const apiDir = `${process.cwd()}/api/v1`;
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
    requireDirectory(module, apiDir, { visit: whenLoadModule });
  }

  // 全局
  static loadHTTPException() {
    // eslint-disable-next-line global-require
    const errors = require('./http-exception');
    // eslint-disable-next-line global-require
    const paramError = require('./param-exception-error');
    global.Errors = errors;
    global.ParamError = paramError;
  }

  static loadConfig(path = '') {
    const configPath = `${process.cwd()}/config/config.js` || path;
    const config = require(configPath);
    global.config = config;
  }
}
module.exports = InitManager;
