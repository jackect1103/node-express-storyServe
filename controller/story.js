var story = require('../model/story');

// 获取所有小说信息
var getAllStroy = async (req, res, next) => {
    var storyDatas = await story.allStoryInfoms();
    if (storyDatas) {
        res.send({
            msg: "获取信息成功", 
            status: 0,
            data: {
                storyDatas
            }
        })
    } else {
        res.send({
            msg: "获取信息失败",
            status: -1
        })
    }
}

//添加小说
var addStory = async (req, res, next) => {
    var informs = req.body;
    for (const key in informs) {
        console.log('添加小说信息=' + key + ":" + informs[key]);
    }
    var result = await story.insertStory(informs);
    if (result) {
        res.send({
            msg: "添加小说成功",
            status: 0,
            data: {
                informs
            }
        })
    } else {
        res.send({
            msg: "添加小说失败",
            status: -1
        })
    }
}

// 修改小说信息
// 根据小说“_id”修改信息
var updateNavel = async (req, res, next) => {
    var informs = req.body;
    var curID = informs._id;
    for (const key in informs) {
        console.log("informs=" + key + ':' + informs[key]);
    }
    var result = await story.updateStoryInfoms(curID, informs);
    if (result) {
        res.send({
            msg: "修改信息成功",
            status: 0,
            data: {
                curID
            }
        })
    } else {
        res.send({
            msg: "修改信息失败",
            status: -1,
            data: {
                curID
            }
        })
    }
}

// 根据小说“_id”
// 删除小说
var deleteStory = async (req, res, next) => {
    var id = req.body;
    var result = await story.removeStoryById(id);
    if (result) {
        res.send({
            msg: "删除小说成功",
            status: 0,
            data: {
                id
            }
        })
    } else {
        res.send({
            msg: "删除小说失败",
            status: -1,
            data: {
                id
            }
        })
    }
}

// 导出小说api接口
module.exports = {
    getAllStroy,
    addStory,
    updateNavel,
    deleteStory
}