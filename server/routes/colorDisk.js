// server/routes/api.js

const colorDisk = require('../controllers/colorDisk.js');
const router = require('koa-router')();

router.get('/getAllColorDisk', colorDisk.getAllColorDisk);
router.get('/getColorDiskByUserId/:userId', colorDisk.getColorDiskByUserId);
router.post('/createColorDisk', colorDisk.createColorDisk);

module.exports = router; // 导出router规则
