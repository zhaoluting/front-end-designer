// server/models/todolist.js

const db = require('../config/db.js');

const templetPageModel = '../schema/templetPage.js';

const FEDSQL = db.FEDSQL; // 引入数据库

const templets = FEDSQL.import(templetPageModel);

const getAllTemplet = async () => { // 获取全部
  const allTemplet = await templets.findAll();// 查找全部
  return allTemplet; // 返回数据
};

const getTempletById = async (id) => {
  const templet = await templets.findOne({
    where: { id },
  });

  return templet; // 返回数据
};

const getQueryTemplet = async (form) => {
  const queryStr = {
    where: form,
  };
  const Templet = await templets.findAll(queryStr);

  return Templet; // 返回数据
};

const createTemplet = async (data) => {
  const result = await templets.create(data);
  return result;
};

const removeTemplet = async (id) => {
  await templets.destroy({
    where: {
      id,
    },
  });

  return true;
};

const updateTemplet = async (data) => {
  await templets.update(data, {
    where: {
      id: data.id,
    },
  });

  return true;
};

module.exports = {
  getAllTemplet,
  getTempletById,
  getQueryTemplet,
  createTemplet,
  removeTemplet,
  updateTemplet,
};
