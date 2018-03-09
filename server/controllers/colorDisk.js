// server/controllers/colorDisk

const colorModel = require('../models/colorDisk.js'); // 引入user的表结构

const getAllColorDisk = async (ctx) => { // 获取所有色盘
  const result = await colorModel.getAllColorDisk();
  ctx.body = {
    total: result.length,
    success: true,
    result,
  }; // 将请求的结果放到response的body里返回
};

const getColorDiskByUserId = async (ctx) => { // 获取某个用户的所有色盘
  const userId = ctx.params.userId; // 获取url里传过来的参数里的id
  const result = await colorModel.getColorDiskByUserId(userId);
  ctx.body = result; // 将请求的结果放到response的body里返回
};

const createColorDisk = async (ctx) => { // 给某个用户创建一色盘
  const data = ctx.request.body; // post请求，数据是在request.body里的
  const result = await colorModel.createColorDisk(data);

  ctx.body = {
    success: result,
  };
};

module.exports = {
  getAllColorDisk,
  getColorDiskByUserId,
  createColorDisk,
};
