var { findAllArticle,
    insertArticle,
    updateArticle,
    deleteSingleArticle, } = require('../model/article');
/**
 * 文章接口
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
// 获取所有文章
var getAllArticle = async (req, res, next) => {

}
// 添加文章
var addArticle = async (req, res, next) => {

}
// 修改文章
var updArticle = async (req, res, next) => {

}
// 删除文章
var deleteArticle = async (req, res, next) => {

}
// 导出文章api接口
module.exports = {
    getAllArticle,
    addArticle,
    updArticle,
    deleteArticle
}