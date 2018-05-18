// server/models/todolist.js

const db = require('../config/db.js');

const projectManage = '../schema/projectManage.js';

const FEDSQL = db.FEDSQL; // 引入数据库

const projects = FEDSQL.import(projectManage);

const getAllProject = async () => { // 获取全部
  const allProject = await projects.findAll();// 查找全部
  return allProject; // 返回数据
};

const getProjectById = async (id) => {
  const project = await projects.findOne({
    where: { id },
  });

  return project; // 返回数据
};

const createProject = async (data) => {
  const project = await projects.create(data);
  return project;
};

const removeProject = async (id) => {
  await projects.destroy({
    where: {
      id,
    },
  });

  return true;
};

const updateProject = async (data) => {
  await projects.update(data, {
    where: {
      id: data.id,
    },
  });

  return true;
};

module.exports = {
  getAllProject,
  getProjectById,
  createProject,
  removeProject,
  updateProject,
};
