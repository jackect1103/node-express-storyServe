var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
// 用户数据表
var userSchema = new mongoose.Schema({
    userName: { type: String, require: true, index: { unique: true } },
    password: { type: String, require: true },
    birthday: String,
    gender: String,
    registerDate: { type: Date, default: Date.now() },
    img: String,
    freeze: { type: Boolean, default: false },
})

var userModel = mongoose.model('user', userSchema);
userModel.createIndexes();

//用户登录（前台）
var findLogin = (data) => {
    console.log(data.userName);
    console.log(data.password);
    var response = userModel.findOne(data);
    if (response) {
        return response;
    } else {
        return false;
    }
}

//注册用户（前台） 
var registerUser = (data) => {
    var user = new userModel(data);
    return user.save()
        .then(() => {
            return true;
        }).catch(() => {
            return false;
        })
}

//获取当前用户信息
var getSingleInfom = (curName) => {
    // console.log(curName);
    var response = userModel.findOne(curName)
    // console.log(response.userName);
    if (response) {
        return response;
    } else {
        return false;
    }

};

//获取所有用户信息
var getAllUsersInfom = () => {
    var result = userModel.find();
    if (result) {
        return result;
    } else {
        return false;
    }
}

//密码修改
var updatePW = (curName, pwd) => {
    console.log('curName:' + curName);
    console.log('password:' + pwd);
    return userModel.updateOne({ "userName": curName }, { $set: { "password": pwd } })
        .then(() => {
            return true;
        }).catch(() => {
            return false;
        });
}

//用户信息更新
var InfomsUpdate = (curName, infoms) => {
    console.log("model:" + curName);
    console.log("infoms:" + infoms);
    return userModel.updateOne({ "userName": curName }, { $set: infoms })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}

//删除用户信息
var deleteUser = (userName) => {
    console.log('删除用户信息:' + userName);
    return userModel.remove({ "userName": userName })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}

// 冻结用户
var freezeUserById = (id, freeze) => {
    return userModel.updateOne({ '_id': id }, { $set: { freeze } })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}

module.exports = {
    // 用户接口
    findLogin,
    registerUser,
    updatePW,
    getAllUsersInfom,
    InfomsUpdate,
    getSingleInfom,
    deleteUser,
    freezeUserById
}