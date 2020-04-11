

1. 登录注册流程
  首先注册
  登录（多种方式传递type）=> 检验账号密码是否正确=>获取token（token中传入权限和uid）
  在多个需要授权的接口使用中间件鉴权
2. **完整复现了 未添加await 未导出的问题**
3. 思考，我学node的原因，一方面是市场需求，二是希望在工作中和后端讨论问题能更接近业务深层次的一些东西，拓宽视野
4. 学ts的原因？
5. vue 源码的原因
4.7 - 4.11 node全部
4.11 - 4.13 关门学习vue的源码，学习大佬思维
我的输出？我想做一个什么？爬虫！！！爬取掘金，boss直聘！！！（node.js计算距离排序）
每天 1-2h 看博客刷题并保持输出
6. **出现问题 错误的添加了逗号导致代码无法运行，未进行参数校验，未添加await**
7. 出现错误  Unknown column 'url' in 'field list'
解决方法，不适用object.assign,使用以下方法
```js
const musicFields = { url: Sequelize.STRING, ...classicFields };
```