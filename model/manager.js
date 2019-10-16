var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)

// 管理员数据表
var managerSchema = new mongoose.Schema({
    userName: { type: String, require: true, index: { unique: true } },
    password: { type: String, require: true },
    birthday: String,
    gender: String,
    registerDate: { type: Date, default: Date.now() }
})

var managerModel = mongoose.model('manager', managerSchema);
managerModel.createIndexes();

// 获取所有用户信息（后台）
var getAllUser = () => {
    return managerModel.find();
}

// 获取管理员信息
var findManagerLogin = () => {
    // managerModel.findOne();
}

//注册管理员
var registerManager = () => {
    // managerModel.insert(param);
}

//修改管理员
var updateManager = () => {
    // managerModel.update(oldParam, newParam);
}

//删除用户（用于后台）
var deleteSingleUser = () => {
    // managerModel.remove();
}

module.exports = {
    getAllUser,
    findManagerLogin,
    registerManager,
    updateManager,
    deleteSingleUser,
}