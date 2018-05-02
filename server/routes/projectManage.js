const projectManage = require('../controllers/projectManage.js');
const router = require('koa-router')();

router.get('/getAllProject', projectManage.getAllProject);
router.post('/createProject', projectManage.createProject);
router.get('/getProjectByUserId/:id', projectManage.getProjectByUserId);

module.exports = router;
