var mongoose = require('mongoose');

//定义一个全局的mongoose
var Mongoose = {
	url:'mongodb://localhost/agoniDB',
	connect(){
		mongoose.connect(this.url,{ useUnifiedTopology: true, useNewUrlParser: true },function(err){
			if(err){
				console.log('连接数据库失败');
				return;
			}
		})
		console.log('连接数据库成功');
	}
}

module.exports = {
	Mongoose
}