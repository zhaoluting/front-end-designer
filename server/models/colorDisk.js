// server/models/todolist.js

const db = require('../config/db.js');

const colorModel = '../schema/colorDisk.js';

const FEDSQL = db.FEDSQL; // 引入数据库

const colorDisk = FEDSQL.import(colorModel);

const getAllColorDisk = async () => { // 获取全部色盘
  const allDisk = await colorDisk.findAll();// 查找全部的色盘
  return allDisk; // 返回数据
};

const getQueryColorDisk = async (queryForm) => { // 获取某个用户的全部色盘
  const queryStr = {
    where: {},
    order: [[queryForm.orderBy, queryForm.order]],
  };
  if (queryForm.value && queryForm.key) {
    if (queryForm.value === 'user_id') queryStr.where[queryForm.value] = queryForm.key;
    else queryStr.where[queryForm.value] = { $like: `%${queryForm.key}%` };
  }
  const disk = await colorDisk.findAll(queryStr);

  return disk; // 返回数据
};

const createColorDisk = async (data) => { // 给某个用户创建一色盘
  await colorDisk.create(data);
  return true;
};

const removeColorDisk = async (id) => {
  await colorDisk.destroy({
    where: {
      id,
    },
  });

  return true;
};

const updateColorDisk = async (data) => {
  await colorDisk.update(data, {
    where: {
      id: data.id,
    },
  });

  return true;
};

module.exports = {
  getAllColorDisk,
  getQueryColorDisk,
  createColorDisk,
  removeColorDisk,
  updateColorDisk,
};
