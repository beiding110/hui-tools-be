var express = require('express');
var router = express.Router();

const util = require('../utils/app');
const resFrame = require('../utils/resFrame');

const Data = require('../db/schema/data');

router.get('/export', function(req, res, next) {
    const query = req.query;
    const _id = query._id;

    // Data.find().then(result => {
    //     var body = resFrame(body);
    //     res.send(body);
    // });

    Data.findById(_id, function(err, data) {
        if(err) {
            var body = resFrame('error', '', err);
            res.send(body);
            return;
        }

        var body = resFrame(data);
        res.send(body);
    });
});

router.post('/import', function(req, res, next) {
    try {
        const body = req.body;
        const _id = body._id;
        const data = body.data;

        if(_id) {
            Data.updateOne({
                _id
            }, {
                data,
                updatetime: util.getTime(),
            }, function(err, data) {
                if(err) {
                    var body = resFrame('error', '', err);
                    res.send(body);
                    return;
                }
        
                var body = resFrame(body);
                res.send(body);
            });
        } else {
            var newData = new Data({
                data: body.data,
                addtime: util.getTime(),
                updatetime: util.getTime(),
            });

            newData.save().then(() => {
                console.log('data saved');
        
                var body = resFrame(`${newData._id}`);
                res.send(body);
            });
        }
    } catch(e) {
        console.log(e);
    }

    // Data.find    
});

router.post('/upload', function(req, res, next) {
    try {
        const body = req.body;
        const openid = body.openid;
        const data = body.data;        

        if(!openid) {
            let resBody = resFrame('error', '', '无效openid');
            res.send(resBody);
            return;
        }

        Data.find({
            openid
        }, function(err, docs) {
            if(err) {
                var body = resFrame('error', '', err);
                res.send(body);
                return;
            }

            if (docs.length) {
                Data.updateOne({
                    openid
                }, {
                    data,
                    updatetime: util.getTime(),
                }, function(err, data) {
                    if(err) {
                        var body = resFrame('error', '', err);
                        res.send(body);
                        return;
                    }
            
                    var body = resFrame('v', `${docs[0]._id}`, '数据更新完成');
                    res.send(body);
                });
                return;
            }
    
            var newData = new Data({
                openid,
                data,
                addtime: util.getTime(),
                updatetime: util.getTime(),
            });
    
            newData.save().then(() => {    
                var body = resFrame('v', `${newData._id}`, '数据上传完成');
                res.send(body);
            });
        });
        
    } catch(e) {
        console.log(e);
    }

    // Data.find    
});

router.get('/download', function(req, res, next) {
    const query = req.query;
    const openid = query.openid;

    if(!openid) {
        var body = resFrame('error', '', '无效openid');
        res.send(body);
        return;
    }

    Data.find({
        openid,
    }).then(docs => {
        let doc = docs[0];

        let resBody = resFrame('v', doc.data || '', '数据同步完成');
        res.send(resBody);

        return;
    });
});

module.exports = router;
