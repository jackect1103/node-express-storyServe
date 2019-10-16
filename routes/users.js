var express = require('express');
var router = express.Router();
var userController = require('../controller/user');
var managerController = require('../controller/manager');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 用户 
router.post('/userLogin', userController.userLogin);
router.post('/userRegister', userController.userRegister);
router.post('/userInfomsUpdate', userController.userInfomsUpdate);
router.post('/userFindPassword', userController.userFindPassword);
router.get('/getUserStatus', userController.getUserStatus);
router.get('/getUserStatus', userController.getUserStatus);
router.get('/getCurrentUser', userController.getCurrentUser);

// 管理员
router.post('/adminLogin', managerController.adminLogin);
router.post('/adminRegister', managerController.adminRegister);
router.post('/adminUpdate', managerController.adminUpdate);
router.post('/adminFindPassword', managerController.adminFindPassword);


module.exports = router;
