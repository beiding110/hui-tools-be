var express = require('express');
var router = express.Router();

const resFrame = require('../utils/resFrame');
const request = require('request');
const CONFIG = require('../config/index');

/* GET users listing. */
router.post('/getopenid', function(req, res, next) {
  const body = req.body;
  const code = body.code;

  const appid = CONFIG.mp.appid;
  const secret = CONFIG.mp.secret;

  request({
    url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
    method: 'GET',
  }, function(error, response, body) {
    if(error) {
      console.log(error);
      return;
    }

    try {
      body = JSON.parse(body);
    } catch(e) {
      body = body;
    }

    var resBody = resFrame(body.openid);
    res.send(resBody);
  })
});

module.exports = router;
