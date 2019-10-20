var article = require('../model/article');

// 获取所有文章
var getAllArticle = async (req, res, next) => {
    var articleDatas = await article.getAllArticles();
    if (articleDatas) {
        res.send({
            msg: "获取文章成功",
            status: 0,
            data: {
                articleDatas
            }
        })
    } else {
        res.send({
            msg: "获取文章失败",
            status: -1
        })
    }
}

// 添加文章
var addArticle = async (req, res, next) => {
    var informs = req.body;
    for (const key in informs) {
        console.log('添加文章信息=' + key + ":" + informs[key]);
    }
    var result = await article.insertArticle(informs);
    if (result) {
        res.send({
            msg: "添加文章成功",
            status: 0,
            data: {
                informs
            }
        })
    } else {
        res.send({
            msg: "添加文章失败",
            status: -1
        })
    }
}

// 修改文章信息
// 根据文章“_id”修改信息
var updArticle = async (req, res, next) => {
    var informs = req.body;
    var curID = informs._id;
    for (const key in informs) {
        console.log("informs=" + key + ':' + informs[key]);
    }
    var result = await article.updateArticleInfoms(curID, informs);
    if (result) {
        res.send({
            msg: "修改文章成功",
            status: 0,
            data: {
                curID
            }
        })
    } else {
        res.send({
            msg: "修改文章失败",
            status: -1,
            data: {
                curID
            }
        })
    }
}

// 删除文章
var deleteArticle = async (req, res, next) => {
    var id = req.body;
    var result = await article.removeArticleById(id);
    if (result) {
        res.send({
            msg: "删除文章成功",
            status: 0,
            data: {
                id
            }
        })
    } else {
        res.send({
            msg: "删除文章失败",
            status: -1,
            data: {
                id
            }
        })
    }
}
// 导出文章api接口
module.exports = {
    getAllArticle,
    addArticle,
    updArticle,
    deleteArticle
}