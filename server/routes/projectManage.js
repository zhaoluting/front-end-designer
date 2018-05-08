const projectManage = require('../controllers/projectManage.js');
const router = require('koa-router')();

router.get('/getAllProject', projectManage.getAllProject);
router.get('/getProjectByUserId/:id', projectManage.getProjectByUserId);
router.post('/createProject', projectManage.createProject);
router.post('/createProjectPermission', projectManage.createProjectPermission);
router.post('/updateProject', projectManage.updateProject);
router.post('/updateProjectPermission', projectManage.updateProjectPermission);
router.delete('/removeProject/:id', projectManage.removeProject);
router.delete('/removeProjectPermission/:id', projectManage.removeProjectPermission);

module.exports = router;
