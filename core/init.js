const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.InitLoadRouters();
  }

  static InitLoadRouters() {
    const apiDir = `${process.cwd()}/api/v1`;
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
    requireDirectory(module, apiDir, { visit: whenLoadModule });
  }
}
module.exports = InitManager;
