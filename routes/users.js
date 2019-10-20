var express = require('express');
var router = express.Router();
var userController = require('../controller/user');
var managerController = require('../controller/manager');
var storyController = require('../controller/story');
var articleController = require('../controller/article');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
// 用户接口
router.post('/userLogin', userController.userLogin);
router.post('/userRegister', userController.userRegister);
router.post('/userInfomsUpdate', userController.userInfomsUpdate);
router.post('/userFindPassword', userController.userFindPassword);
router.get('/getUserStatus', userController.getUserStatus);
router.get('/getAllUser', userController.getAllUser);
router.get('/getCurrentUser', userController.getCurrentUser);
router.get('/userLogOut', userController.userLogOut);
router.post('/removeUser', userController.removeUser);
router.post('/freezeUser', userController.freezeUser);

// 管理员接口
router.post('/adminLogin', managerController.adminLogin);
router.post('/adminRegister', managerController.adminRegister);
router.get('/getCurrentManager', managerController.getCurrentManager);
router.get('/adminLogOut', managerController.adminLogOut);
router.post('/adminUpdate', managerController.adminUpdate);
router.post('/adminFindPassword', managerController.adminFindPassword);

//小说接口
router.get('/getAllStroy', storyController.getAllStroy);
router.post('/addStory', storyController.addStory);
router.post('/updateNavel', storyController.updateNavel);
router.post('/deleteStory', storyController.deleteStory);


// 文章接口
router.get('/getAllArticle', articleController.getAllArticle);
router.post('/addArticle', articleController.addArticle);
router.post('/updArticle', articleController.updArticle);
router.post('/deleteArticle', articleController.deleteArticle);

module.exports = router;
