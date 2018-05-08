// server/models/todolist.js

const db = require('../config/db.js');

const permissionModel = '../schema/projectPermission.js';

const FEDSQL = db.FEDSQL; // 引入数据库

const projectPermission = FEDSQL.import(permissionModel);

const getAllProjectPermission = async () => {
  const allProjectPermission = await projectPermission.findAll();
  return allProjectPermission; // 返回数据
};

const getQueryProjectPermission = async (form) => {
  const queryStr = {
    where: form,
  };
  const Permission = await projectPermission.findAll(queryStr);
  for (const index in Permission) {
    Permission[index].write = Boolean(Permission[index].write);
    Permission[index].setting = Boolean(Permission[index].setting);
  }

  return Permission; // 返回数据
};

const createProjectPermission = async (data) => {
  const result = await projectPermission.create(data);
  return result;
};

const removeProjectPermission = async (id) => {
  await projectPermission.destroy({
    where: {
      id,
    },
  });

  return true;
};

const updateProjectPermission = async (data) => {
  await projectPermission.update(data, {
    where: {
      id: data.id,
    },
  });

  return true;
};

module.exports = {
  getAllProjectPermission,
  getQueryProjectPermission,
  createProjectPermission,
  removeProjectPermission,
  updateProjectPermission,
};
