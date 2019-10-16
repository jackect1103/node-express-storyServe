import { Mongoose } from "mongoose";

// 小说数据表
var articleSchema = new mongoose.Schema({          //json的结构;
    articleyId: String,  //定义一个属性articleyId
    title: String,   //定义一个属性articleyId
    category: String,
    articleyImg: String,   //定义一个属性articleyId
    desc: String, //定义一个属性 小说简介
    content: String,//内容
    date: String
}, { collection: 'story' });
var articleModel = Mongoose.model('article', articleSchema);


// 获取文章信息
var findAllArticle = articleModel.find();

//添加文章
var insertArticle = articleModel.insert(param);

//修改文章
var updateArticle = articleModel.update(oldParam,newParam);

//删除文章
var deleteSingleArticle = articleModel.remove();


module.exports = {
    findAllArticle,
    insertArticle,
    updateArticle,
    deleteSingleArticle,
}