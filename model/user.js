var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
// 用户数据表
var userSchema = new mongoose.Schema({
    userName: { type: String, require: true, index: { unique: true } },
    password: { type: String, require: true },
    birthday: String,
    gender: String,
    registerDate: { type: Date, default: Date.now() }
})

var userModel = mongoose.model('user', userSchema);
userModel.createIndexes();

//用户登录（前台）
var findLogin = (data) => {
    return userModel.findOne(data);
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
var getSingleInfom = (curName)=>{
    console.log(curName);
    var response = userModel.findOne(curName)
    console.log(response.userName);
    if (response) {
        return response;
     }else{
         return false;
     }
           
};

//密码修改
var updatePW = (curName, password) => {
    console.log(curName, password);
    return userModel.update({ curName }, { $set: { password } })
        .then(() => {
            return true;
        }).catch(() => {
            return false;
        });
}

//用户信息更新
var InfomsUpdate = (curName, infoms) => {
    console.log("model:"+curName);
    console.log(infoms);
    return userModel.update(curName , infoms)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}


module.exports = {
    // 用户接口
    findLogin,
    registerUser,
    updatePW,
    InfomsUpdate,
    getSingleInfom
}