// server/controllers/colorDisk

const projectManageModel = require('../models/projectManage.js'); // 引入表结构
const projectPermissionModel = require('../models/projectPermission.js'); // 引入表结构

const getAllProject = async (ctx) => {
  const result = await projectManageModel.getAllProject();
  ctx.body = {
    total: result.length,
    success: true,
    result,
  }; // 将请求的结果放到response的body里返回
};

const getProjectById = async (ctx) => { // 获取
  const id = ctx.params.id;
  const result = await projectManageModel.getProjectById(id);

  ctx.body = {
    total: result.length,
    success: true,
    result,
  };
};

const getProjectByUserId = async (ctx) => { // 获取
  const userForm = { user_id: ctx.params.id };
  const permissions = await projectPermissionModel.getQueryProjectPermission(userForm);
  const result = [];
  for (const index in permissions) {
    if (index) result.push(permissions[index].dataValues);
  }
  for (const index in result) {
    result[index].projectDetail = await projectManageModel.getProjectById(result[index].project_id);
    result[index].allPermission = await projectPermissionModel.getQueryProjectPermission({
      project_id: permissions[index].project_id,
    });
  }
  ctx.body = {
    total: permissions.length,
    success: true,
    result,
  };
};

const createProject = async (ctx) => {
  const data = ctx.request.body; // post请求，数据是在request.body里的
  const result1 = await projectManageModel.createProject(data);
  const permission = {
    user_id: data.creator,
    project_id: result1.id,
    write: 1,
    setting: 1,
  };
  const result2 = await projectPermissionModel.createProjectPermission(permission);

  ctx.body = {
    project: result1,
    permission: result2,
    success: true,
  };
};

const removeProject = async (ctx) => {
  const id = ctx.params.id;
  const result = await projectManageModel.removeProject(id);

  ctx.body = {
    success: result,
  };
};

const updateProject = async (ctx) => {
  const data = ctx.request.body;
  const result = await projectManageModel.updateProject(data);

  ctx.body = {
    success: result,
  };
};

module.exports = {
  getAllProject,
  getProjectById,
  getProjectByUserId,
  createProject,
  removeProject,
  updateProject,
};
