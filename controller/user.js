var people = require('../model/user');

// 用户登录(post)
var userLogin = async (req, res, next) => {
	var { userName, password } = req.body;
	req.session.userName = userName;
	var result = await people.findLogin({
		userName,
		password
	});
	if (result) {
		if (!result.freeze) {
			res.send({
				mag: "登陆成功",
				status: 0,
				data: { userName, password }
			})
		} else {
			res.send({
				mag: "账号已冻结",
				status: -1,
				data: { userName, password }
			})
		}
	} else {
		res.send({
			mag: "登录失败",
			status: -1,
			data: { userName, password }
		})
	}
}

// 用户注册(post)
var userRegister = async (req, res, next) => {
	var { userName, password } = req.body;
	var findLoginResult = await people.findLogin({ userName });
	if (!findLoginResult) {
		var result = await people.registerUser({
			userName,
			password
		});
		if (result) {
			res.send({
				mag: "register success",
				status: 0,
				data: {
					"userName": userName,
					"password": password
				}
			})
		} else {
			res.send({
				mag: "register failed",
				status: -1,
			})
		}
	} else {
		res.send({
			msg: "该用户已存在",
			status: -1,
			data: {
				userName
			}
		})
	}
}

// 用户登录态(检查是否已经登录)
var getUserStatus = async (req, res, next) => {
	if (req.session.userName) {
		res.send({
			msg: "当前用户已登录",
			status: 0,
			data: {
				'userName': req.session.userName
			}
		})
	} else {
		res.send({
			msg: "当前用户未登录",
			status: -1
		})
	}
}

//获取当前用户信息
var getCurrentUser = async (req, res, next) => {
	var userName = req.session.userName;
	// console.log(userName);
	var result = await people.getSingleInfom({ userName });
	if (result) {
		res.send({
			mag: "获取用户信息成功",
			status: 0,
			data: {
				result
			}
		})
	} else {
		res.send({
			mag: "获取用户信息失败",
			status: -1,
			data: {
				result
			}
		})
	}
}

// 用户修改个人信息(post)
var userInfomsUpdate = async (req, res, next) => {
	var infoms = req.body;
	var userName = req.session.userName;
	if (userName == infoms.userName) {
		console.log("postinfoms:" + infoms.userName);
		console.log("postuserName:" + userName);
		var result = await people.InfomsUpdate(userName, infoms);
		if (result) {
			res.send({
				msg: "修改信息成功",
				status: 0,
				data: {
					infoms
				}
			})
		} else {
			res.send({
				msg: "修改信息失败",
				status: -1,
				data: {
					infoms
				}
			})
		}
	} else {
		res.send({
			mag: "信息不正确",
			status: -1,
		})
	}
}

// 获取所有用户信息（后台）
var getAllUser = async (req, res, next) => {
	var result = await people.getAllUsersInfom();
	if (result) {
		res.send({
			msg: "获取信息成功",
			status: 0,
			data: {
				result
			}
		})
	} else {
		res.send({
			msg: "获取信息失败",
			status: -1
		})
	}
}

// 用户修改密码(post)
var userFindPassword = async (req, res, next) => {
	var { userName, password } = req.body;
	var curName = req.session.userName;
	if (curName == userName) {
		console.log('1', password);
		var result = await people.updatePW(userName, password);
		if (result) {
			res.send({
				mag: "密码修改成功",
				status: 0,
				data: {
					"userName": userName,
					"password": password
				}
			})
		} else {
			res.send({
				mag: "密码修改失败",
				status: -1,
				data: {
					"userName": userName,
				}
			})
		}
	} else {
		res.send({
			mag: "信息不正确",
			status: -1,
		})
	}
}

// 用户退出
var userLogOut = async (req, res, next) => {
	req.session.userName = '';
	res.send({
		mag: "退出成功",
		status: 0
	})
}

// 删除用户（后台）
var removeUser = async (req, res, next) => {
	var { userName } = req.body;
	var result = await people.deleteUser(userName);
	if (result) {
		res.send({
			msg: "删除用户成功",
			status: 0,
			data: {
				userName
			}
		})
	} else {
		res.send({
			msg: "删除用户失败",
			status: -1,
			data: {
				userName
			}
		})
	}
}

// 根据id冻结用户
var freezeUser = async (req, res, next) => {
	var id = req.body;
	var response = await people.findLogin(id);
	var freeze = response.freeze ? false : true;
	console.log(freeze);
	var result = await people.freezeUserById(id, freeze);
	if (result) {
		res.send({
			msg: freeze ? "冻结用户成功" : "解冻用户成功",
			status: 0,
			data: {
				id
			}
		})
	} else {
		res.send({
			msg: "冻结操作失败",
			status: -1,
			data: {
				id
			}
		})
	}
}

module.exports = {
	userLogin,
	userRegister,
	getUserStatus,
	getCurrentUser,
	userInfomsUpdate,
	getAllUser,
	userFindPassword,
	userLogOut,
	removeUser,
	freezeUser
}
