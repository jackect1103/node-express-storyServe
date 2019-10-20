var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)

// 管理员数据表
var managerSchema = new mongoose.Schema({
    managerName: { type: String, require: true, index: { unique: true } },
    password: { type: String, require: true },
    birthday: String,
    gender: String,
    registerDate: { type: Date, default: Date.now() },
    img: String
})

var managerModel = mongoose.model('manager', managerSchema);
managerModel.createIndexes();

 
// 管理员登录
var findManagerLogin = (data) => {
    console.log(data.managerName);
    console.log(data.password);
    return managerModel.findOne(data);
}

//注册管理员
var registerManager = (data) => {
    console.log('管理员注册数据：' + data);
    for (const key in data) {
        console.log(key+":"+data[key]);
    }
    var manager = new managerModel(data)
    return manager.save()
        .then(() => {
            return true
        })
        .catch(() => {
            return false;
        })
}

//获取当前管理员信息
var getSingleInfom = (curName) => {
    // console.log(curName);
    var response = managerModel.findOne(curName)
    // console.log(response.userName);
    if (response) {
        return response; 
    } else {
        return false;
    }

};

//修改密码
var findPassword = (curName, password) => {
    console.log('修改密码curName' + curName);
    console.log('修改密码password' + password);
    return managerModel.updateOne({ 'managerName': curName }, { $set: { "password": password } })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}

//修改管理员信息
var updateInforms = (curName, informs) => {
    console.log('修改管理员信息curName:' + curName);
    for (const iterator in informs) {
        console.log('修改管理员信息informs:' + informs[iterator]);
    }
    return managerModel.updateOne({ "managerName": curName }, { $set: informs })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}

module.exports = {
    findManagerLogin,
    registerManager,
    getSingleInfom,
    findPassword,
    updateInforms
}