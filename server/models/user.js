// models/user.js
const db = require('../config/db.js');

const userModel = '../schema/user.js'; // 引入user的表结构

const FEDSQL = db.FEDSQL; // 引入数据库

const User = FEDSQL.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。

const getUserById = async (id) => {
  const userInfo = await User.findOne({
    where: { id },
  });

  return userInfo; // 返回数据
};

// 新增一个方法，通过用户名查找
const getUserByName = async (name) => {
  const userInfo = await User.findOne({
    where: { userName: name },
  });

  return userInfo;
};

const createUser = async (data) => { // 给某个用户创建一色盘
  await User.create(data);
  return true;
};

module.exports = {
  getUserById, // 导出getUserById的方法，将会在controller里调用
  getUserByName,
  createUser,
};
