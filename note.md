<!--
 * @Author: your name
 * @Date: 2020-03-31 23:55:53
 * @LastEditTime: 2020-04-24 22:34:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island-node\note.md
 -->

# 数据库的设计
<!-- 面向对象 model class -->
1. 初始化数据 期刊 书籍
2. 主题粗到细
=>
  用户表（user）
  期刊（movie.sentece.music）--实体表 记录本身相关信息
  一期一期的概念 （flow）--业务表 无具体实体用来记录业务（同收藏表等）
3. 业务表和实体表的区分

# 在小程序代码中使用Basic Auth
```js
 _encode() {
    const token = wx.getStorageSync('token');
    const base64 = Base64.encode(token + ':');
    return 'Basic '+base64
  },
```

# 获取喜欢的期刊
  根据业务表中信息找到实体表中的信息并返回实体表内容
  思考： 加入收藏了一个商品，是多种类型 怎么设计数据库？
  商品表，收藏表，有一个类型，对应这对应的商品？？？

# 序列化问题
1. 当要在数据库中查找的JSON对象赋值时，其实他仅向前端返回了dataValues下的对象，所以应该在这个对象上赋值
2. 使用sequenize提供的api 

# 设计favor模型（业务表）
1. 电影，句子，音乐的收藏数应该在其对应的实体模型下
2. 表中存储用户 喜欢的期刊类型 喜欢的期刊的 art_id
例如：用户喜欢某电影（首先往该电影的数据+1），

# 关于 for..in 和 for..of
1. for in 遍历对象(只能for in)，for of 遍历数组
2. for in 遍历键， for of 遍历值
```js
let arr = [2299, 2300]
for (let key in arr){
 console.log('key',key);
}
// output: key 0  key 1
for (let key2 of arr) {
  console.log('key2', key2)
}
// output: key2 2299 key2 2300
```
# 避免循环导入
1. 可能引发循环导入的模块在函数中导入

# 图书
与业务数据无关，将图书做成服务的形式
1. 使用服务的形式向项目提供数据
2. 数据公用
   中间层/微服务
3. 编写业务数据库
4. 图书排序
```js
  order: [ 'index', ],
```
5. 并发和并行
concurrency 并发
parallelism 并行 同时，多线程才能实现
<!-- cpu 密集型操作 -->
<!-- 资源密集型操作 -->
6. 根据 group 分组
attributes 重定义属性名
使用Sequelize.fn提供的函数求和
```js
const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: arr,
        },
      },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']], // Sequenize 求和（数组length）求总和：SUM
    });
```
7. 拼接两个数据库中获取的数据
使用两层循环
```js
const classicFields = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, // 自定义 非自增
  },
};
```

# 中间层和微服务
  数据存储在服务端-可拆分成多个服务
![image.png](https://i.loli.net/2020/04/11/5XcvrzPG9kBowND.png)

# 编码关键字
encodeURI

# 进行分页
```js
 offset: 5,
 limit: 5,
```
 
# 书籍短评
需要使用公司账号
书籍短评单独建表 

# JSON 序列化
1. 删除字段
2. 使用 scope 查询的时候
3. JSON 序列化
定义 toJSON 后序列化返回的字段
在对应的model添加实例方法
```js
const obj = {
  name: '1yue',
  age: 18,
  toJSON: function(){
    return {
      name1: '2yue' 
    }
  }
},
console.log(JSON.stringify(obj));
```

# 全局控制Model
在 model 原型上添加toJSON方法
在model上控制图片路径

# 静态资源存储位置
1. 网站目录（放在api下）
2. 静态资源服务器（微服务）
3. 云服务器 OSS,CDN,ECS,RDS
4. 免费静态资源服务器（github等）

# 小程序前端处理令牌
用户令牌过期 
单令牌:
启动 --验证令牌是否合法--> API
合法： 不做任何处理
不合法： 返回403， 重新获取新的令牌，发放新的令牌

强验证：
双令牌：
access_token:验证用户身份（2h）
refresh_token: 刷新(自身刷新)
每次获取access_token被刷新后重新定义refresh_token的时间

# 服务端部署
1. 云服务器
2. 域名解析
3. 域名备案

4. 安装node,xampp,mysql

5. nginx 端口转发

# 守护进程与PM2
