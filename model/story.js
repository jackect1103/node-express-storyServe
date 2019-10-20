var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)

// 小说数据表
var storySchema = new mongoose.Schema({
    storyId: { type: String, require: true, index: { unique: true } },
    name: { type: String, require: true, index: { unique: true } },
    author: String,  //定义一个属性作者 
    storyImg: String,   //定义一个属性图片
    role: String, //定义一个属性主角
    clickRaid: String, //定义一个属性点击率
    desc: String, //定义一个属性 小说简介
    category: String,//定义一个属性 小说类别
    sex: String,
    commitDate: { type: Date, default: Date.now() },
});

var storyModel = mongoose.model('novel', storySchema);
storyModel.createIndexes();

// 获取所有小说信息
var allStoryInfoms = () => {
    var storyDatas = storyModel.find();
    if (storyDatas) {
        return storyDatas;
    } else {
        return false;
    }
}

// 添加小说信息
var insertStory = (data) => {
    for (const key in data) {
        console.log(key + ":" + data[key]);
    }
    var story = new storyModel(data);
    return story.save()
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}

// 修改小说信息
var updateStoryInfoms = (curID, data) => {
    for (const key in data) {
        console.log("修改小说信息=" + key + ':' + data[key]);
    }
    return storyModel.updateOne({ "_id": curID }, { $set: data })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}

// 根据小说“_id”删除
var removeStoryById = (id) => {
    console.log('根据小说“_id”删除:' + id);
    return storyModel.remove(id)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}

module.exports = {
    allStoryInfoms,
    insertStory,
    updateStoryInfoms,
    removeStoryById
}