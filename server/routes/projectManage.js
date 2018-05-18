const projectManage = require('../controllers/projectManage.js');
const router = require('koa-router')();

router.get('/getAllProject', projectManage.getAllProject);
router.get('/getProjectByUserId/:id', projectManage.getProjectByUserId);
router.get('/getProjectById/:id', projectManage.getProjectById);
router.get('/getTempletById/:id', projectManage.getTempletById);
router.post('/createProject', projectManage.createProject);
router.post('/createProjectPermission', projectManage.createProjectPermission);
router.post('/createTemplet', projectManage.createTemplet);
router.post('/updateProject', projectManage.updateProject);
router.post('/updateProjectPermission', projectManage.updateProjectPermission);
router.post('/updateTemplet', projectManage.updateTemplet);
router.delete('/removeProject/:id', projectManage.removeProject);
router.delete('/removeProjectPermission/:id', projectManage.removeProjectPermission);
router.delete('/removeTemplet/:id', projectManage.removeTemplet);

module.exports = router;
