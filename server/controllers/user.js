// controllers/user.js

const user = require('../models/user.js');
const jwt = require('jsonwebtoken');
// const jwtKoa = require('koa-jwt');
// const bcrypt = require('bcryptjs');

const getAllUsers = async (ctx) => { // 获取所有色盘
  const result = await user.getAllUsers();
  ctx.body = {
    total: result.length,
    success: true,
    result,
  }; // 将请求的结果放到response的body里返回
};


const getUserById = async (ctx) => {
  const id = ctx.params.id; // 获取url里传过来的参数里的id
  const result = await user.getUserById(id);
  ctx.body = result; // 将请求的结果放到response的body里返回
};

const getUserByName = async (ctx) => {
  const data = ctx.request.body;
  const userInfo = await user.getUserByName(data.userName);
  if (userInfo !== null) {
    ctx.body = {
      data: userInfo,
      success: true,
    };
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在！',
    };
  }
};

const createUser = async (ctx) => {
  const data = ctx.request.body;
  const userInfo = await user.getUserByName(data.userName);
  if (userInfo !== null) {
    ctx.body = {
      success: false,
      info: '用户名已被注册',
    };
  } else {
    const result = await user.createUser(data);
    ctx.body = {
      success: result,
    };
  }
};

const postUserAuth = async (ctx) => {
  const data = ctx.request.body; // post过来的数据存在request.body里
  const userInfo = await user.getUserByName(data.userName);

  if (userInfo !== null) { // 如果查无此用户会返回null
    // if (!bcrypt.compareSync(data.password, userInfo.password)) {
    if (data.password !== userInfo.password) {
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误！',
        data,
      };
    } else { // 如果密码正确
      const userToken = {
        name: userInfo.userName,
        id: userInfo.id,
      };
      const secret = 'vue-koa-demo'; // 指定密钥，这是之后用来判断token合法性的标志
      const token = jwt.sign(userToken, secret); // 签发token
      // ctx.cookies.set('user-token', token, {
      //   maxAge: 86400000,
      //   httpOnly: true,
      // });
      ctx.body = {
        success: true,
        token, // 返回token
        userInfo,
      };
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在！', // 如果用户不存在返回用户不存在
    };
  }
};


const updateUser = async (ctx) => {
  const data = ctx.request.body;
  const result = await user.updateUser(data);

  ctx.body = {
    success: result,
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  postUserAuth,
  getUserByName,
  createUser,
  updateUser,
};
