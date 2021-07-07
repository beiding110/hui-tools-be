const mongoose = require('../index.js');

var Schema = mongoose.Schema;

let data = {
    data: String,
    addtime: String,
    updatetime: String,
    openid: String,
};

var dataSchema = Schema(data);
var Data = mongoose.model('data', dataSchema);

// dataSchema.methods.getTime

// dataSchema.query.addIndex = function() {
    
// }

module.exports = Data;
