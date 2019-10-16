var manager = require('../model/manager');

// 管理员登录
var adminLogin = async (req, res, next) => {
	var name = req.query.name;
	console.log(name);
	res.send({
		mag: "success",
		status: 0,
		data: name
	})
}
// 管理员注册
var adminRegister = async (req, res, next) => {

}
// 管理员修改个人信息
var adminUpdate = async (req, res, next) => {

}
// 管理员查找密码
var adminFindPassword = async (req, res, next) => {

}
// 获取所有用户信息（后台）
var getAllUser = async (req, res, next) => {
	var result = await manager.getAllUser()
	if (result) {
		res.send({
			mag: "获取用户信息成功",
			status: 0,
		})
	} else {
		res.send({
			mag: "获取用户信息失败",
			status: -1,
		})
	}

}
// 管理员退出
var adminLogOut = async (req, res, next) => {
	req.session.userName = '';
	res.send({
		mag:"退出成功",
		status:0
	})
}

module.exports = {
	adminLogin,
	adminRegister,
	adminUpdate,
	adminFindPassword,
    adminLogOut,
    getAllUser
}
