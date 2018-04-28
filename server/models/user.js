// models/user.js
const db = require('../config/db.js');

const userModel = '../schema/user.js'; // 引入user的表结构

const FEDSQL = db.FEDSQL; // 引入数据库

const User = FEDSQL.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。

const getAllUsers = async () => { // 获取全部用户
  const result = await User.findAll();// 查找全部的用户
  const allUsers = result.map((user) => {
    return {
      id: user.id,
      userName: user.userName,
    };
  });
  return allUsers; // 返回数据
};

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

const createUser = async (data) => { // 创建一个用户创建
  await User.create(data);
  return true;
};

const updateUser = async (data) => {
  await User.update(data, {
    where: {
      id: data.id,
    },
  });

  return true;
};

module.exports = {
  getAllUsers,
  getUserById, // 导出getUserById的方法，将会在controller里调用
  getUserByName,
  createUser,
  updateUser,
};
