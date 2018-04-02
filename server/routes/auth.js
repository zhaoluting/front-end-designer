const auth = require('../controllers/user.js');
const router = require('koa-router')();

router.get('/user/:id', auth.getUserById);
router.post('/user/postUserAuth', auth.postUserAuth);
router.post('/user/getUserByName', auth.getUserByName);
router.post('/user/createUser', auth.createUser);
router.post('/user/updateUser', auth.updateUser);

module.exports = router;
