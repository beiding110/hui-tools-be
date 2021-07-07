const CONFIG = require('../config/index.js')

const URL = CONFIG.db.url;

const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.log(err, '数据库连接失败'));

module.exports = mongoose;