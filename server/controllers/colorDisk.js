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

const getQueryColorDisk = async (ctx) => { // 获取色盘
  const queryForm = ctx.query;
  const result = await colorModel.getQueryColorDisk(queryForm);

  ctx.body = {
    total: result.length,
    success: true,
    result,
  };
};

const createColorDisk = async (ctx) => { // 给某个用户创建一色盘
  const data = ctx.request.body; // post请求，数据是在request.body里的
  const result = await colorModel.createColorDisk(data);

  ctx.body = {
    success: result,
  };
};

const removeColorDisk = async (ctx) => {
  const id = ctx.params.id;
  const result = await colorModel.removeColorDisk(id);

  ctx.body = {
    success: result,
  };
};

const updateColorDisk = async (ctx) => {
  const data = ctx.request.body;
  const result = await colorModel.updateColorDisk(data);

  ctx.body = {
    success: result,
  };
};

module.exports = {
  getAllColorDisk,
  getQueryColorDisk,
  createColorDisk,
  removeColorDisk,
  updateColorDisk,
};
