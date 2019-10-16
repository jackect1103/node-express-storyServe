import { Mongoose } from "mongoose";

// 小说数据表
var storySchema = new mongoose.Schema({          //json的结构;
    storyId: String,  //定义一个属性storyId
    name: String,   //定义一个属性storyId
    author: String,  //定义一个属性storyId
    storyImg: String,   //定义一个属性storyId
    role: String, //定义一个属性主角
    clickRaid: String, //定义一个属性点击率
    desc: String, //定义一个属性 小说简介
    category: String,
    sex: String
}, { collection: 'story' });
var storyModel = Mongoose.model('story', storySchema);


// 获取小说信息
var findAllStory = storyModel.find();

//添加小说
var insertStory = storyModel.insert(param);

//修改小说
var updateStory = storyModel.update(oldParam,newParam);

//删除小说
var deleteSingleStory = storyModel.remove();


module.exports = {
    findAllStory,
    insertStory,
    updateStory,
    deleteSingleStory
}