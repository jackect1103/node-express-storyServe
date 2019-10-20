var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)

// 小说数据表
var articleSchema = new mongoose.Schema({          //json的结构;
    articleyId: { type: String, require: true, index: { unique: true } },  //定义一个属性articleyId
    title: { type: String, require: true, index: { unique: true } },   //定义一个属性articleyId 
    category: String,
    articleyImg: String,   //定义一个属性articleyId
    desc: String, //定义一个属性 小说简介
    content: String,//内容
    data: { type: Date, default: Date.now() },
});
var articleModel = mongoose.model('article', articleSchema);
articleModel.createIndexes();

// 获取文章信息
var getAllArticles = () => {
    var response = articleModel.find();
    if (response) {
        return response;
    } else {
        return false;
    }
}

//添加文章
var insertArticle = (data) => {
    for (const key in data) {
        console.log(key + ":" + data[key]);
    }
    var acticle = new articleModel(data);
    return acticle.save()
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}

//修改文章
var updateArticleInfoms = (curID, data) => {
    for (const key in data) {
        console.log("修改文章信息=" + key + ':' + data[key]);
    }
    return articleModel.updateOne({ "_id": curID }, { $set: data })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}

//删除文章
var removeArticleById = (id) => {
    console.log('根据文章“_id”删除:' + id);
    return articleModel.remove(id)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        })
}


module.exports = {
    getAllArticles,
    insertArticle,
    updateArticleInfoms,
    removeArticleById,
}