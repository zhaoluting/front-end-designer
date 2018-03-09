// db.js

/*
sequelize-auto -o "./server/schema"
-d front-end-designer -h 127.0.0.1 -u root -p 3306 -x 123456 -e mysql
*/

const Sequelize = require('sequelize'); // 引入sequelize

// 使用url连接的形式进行连接，注意将root: 后面的XXXX改成自己数据库的密码
const FEDSQL = new Sequelize('mysql://root:123456@localhost/front-end-designer', {
  define: {
    timestamps: false, // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  },
});

module.exports = {
  FEDSQL, // 将Todolist暴露出接口方便Model调用
};
