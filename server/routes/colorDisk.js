// server/routes/api.js

const colorDisk = require('../controllers/colorDisk.js');
const router = require('koa-router')();

router.get('/getAllColorDisk', colorDisk.getAllColorDisk);
router.get('/getQueryColorDisk/:id', colorDisk.getQueryColorDisk);
router.post('/createColorDisk', colorDisk.createColorDisk);
router.delete('/removeColorDisk/:id', colorDisk.removeColorDisk);
router.post('/updateColorDisk', colorDisk.updateColorDisk);

module.exports = router; // 导出router规则
