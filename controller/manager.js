var manager = require('../model/manager');

// 管理员登录
var adminLogin = async (req, res, next) => {
	var { managerName, password } = req.body;
	req.session.managerName = managerName;
	var result = await manager.findManagerLogin({
		managerName,
		password
	});
	if (result) {
		res.send({
			msg: "login success",
			status: 0,
			data: { managerName }
		})
	} else {
		res.send({
			msg: "login failed",
			status: -1,
			data: { managerName }
		})
	}
}

// 管理员注册
var adminRegister = async (req, res, next) => {
	var { managerName, password } = req.body;
	console.log('管理员node的注册数据' + managerName + ',' + password);
	var result = await manager.registerManager({
		managerName,
		password
	});
	console.log(result);
	if (result) {
		res.send({
			msg: "注册成功",
			status: 0,
			data: {
				managerName
			}
		})
	} else {
		res.send({
			msg: "注册失败",
			status: -1,
			data: {
				managerName
			}
		})
	}
}

//获取当前管理员信息
var getCurrentManager = async (req, res, next) => {
	var managerName = req.session.managerName;
	// console.log(userName);
	var result = await manager.getSingleInfom({ managerName });
	if (result) {
		res.send({
			msg: "获取管理员信息成功",
			status: 0,
			data: {
				result
			}
		})
	} else {
		res.send({
			msg: "获取管理员信息失败",
			status: -1,
			data: {
				result
			}
		})
	}
}

// 管理员修改个人信息
var adminUpdate = async (req, res, next) => {
	var informs = req.body;
	var curName = req.session.managerName
	if (curName == informs.managerName) {
		var result = await manager.updateInforms(curName, informs);
		if (result) {
			res.send({
				msg: "信息修改成功",
				status: 0,
				data: {
					informs
				}
			})
		} else {
			res.send({
				msg: "信息修改失败",
				status: -1
			})
		}
	} else {
		res.send({
			msg: "信息不一致",
			status: -1
		})
	}
}

// 管理员修改密码
var adminFindPassword = async (req, res, next) => {
	var { managerName, password } = req.body;
	var maName = req.session.managerName;
	if (maName == managerName) {
		var result = await manager.findPassword(managerName, password);
		if (result) {
			res.send({
				msg: "修改密码成功",
				status: 0,
				data: {
					managerName,
					password
				}
			})
		} else {
			res.send({
				msg: "修改密码失败",
				status: -1
			})
		}
	} else {
		res.send({
			msg: "管理员信息错误",
			status: -1,
			data: {
				managerName
			}
		})
	}
}

// 管理员退出
var adminLogOut = async (req, res, next) => {
	req.session.managerName = '';
	res.send({
		mag: "退出成功",
		status: 0
	})
}

module.exports = {
	adminLogin,
	adminRegister,
	getCurrentManager,
	adminLogOut,
	adminUpdate,
	adminFindPassword,

}
