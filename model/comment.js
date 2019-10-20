var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)

var commentSchema = new mongoose.Schema({
    
})


var commentModel = mongoose.model('comment', commentSchema);
commentModel.createIndexes();