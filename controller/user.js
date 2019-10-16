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
		res.send({
			mag: "login success",
			status: 0,
			data: {
				"userName": userName
			}
		})
	} else {
		res.send({
			mag: "login failed",
			status: -1,
			data: {
				"userName": userName
			}
		})
	}
}
// 用户注册(post)
var userRegister = async (req, res, next) => {
	var { userName, password } = req.body;
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
var getCurrentUser = async(req, res, next)=>{
	var userName = req.session.userName; 
	console.log(userName); 
	var result = await people.getSingleInfom({
		userName
	});
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
			data:{
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
		console.log("post:"+infoms);
		console.log("post:"+userName);
		var result = await people.updateUser({
			userName,
			infoms
		});
		if(result){
			res.send({
				msg:"修改信息成功",
				status:0
			})
		}else{
			res.send({
				msg:"修改信息失败",
				status:0
			})
		}
	}
}

// 用户修改密码(post)
var userFindPassword = async (req, res, next) => {
	var { userName, password } = req.body;
	var curName = req.session.userName;
	if (curName == userName) {
		console.log('1', password);
		var result = await people.updatePW({
			userName,
			password
		});
		if (result) {
			res.send({
				mag: "密码修改成功",
				status: 0,
				data: {
					"userName": userName,
				}
			})
		} else {
			res.send({
				mag: "密码修改失败",
				status: -1,
				
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

module.exports = {
	userLogin,
	userRegister,
	getUserStatus,
	getCurrentUser,
	userInfomsUpdate,
	userFindPassword,
	userLogOut,
}
