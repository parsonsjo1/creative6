var express = require('express');
var router = express.Router();
var mongo = require('mongodb');


var MongoClient = mongo.MongoClient;
var dbUrl = 'mongodb://localhost:27017/message';

var collection;

String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

MongoClient.connect(dbUrl, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection success: ', dbUrl);
        collection = db.collection('message');

    }

})

/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile('index.html', { root: 'public' });
    
});

router.post('/message', function (req, res, next) {
    var pin = Math.floor(Math.random() * (9999));
    var hash = req.body.name.hashCode() * pin * 31;
    console.log(req.body);
    console.log(hash);
    var item = {
        hash: hash,
        message: req.body.message
    }
    console.log(item);
    collection.insertOne(item, function (err, result) {
        if (err) { console.log(err) }
        else {
            res.send({ data: pin });
        }
    });

});

router.get('/message/:name/:pin', function (req, res, next) {
    var hashs = req.params.name.hashCode() * req.params.pin * 31;
    console.log(hashs);
    //collection.find({ "hash": hashs }, function (err, doc) {
    //    if (err) {
    //        console.log(err)
    //        res.send(null);
    //    }
    //    else {
    //        console.log(doc.hasNext());
    //        collection.removeOne({ hash: req.params.hashCode });
    //        var theMessage = doc.next().message;
    //        console.log(theMessage);
    //        res.send(theMessage);
    //    }
    //});
    collection.find({ "hash" : hashs }).toArray(function (err, result) {
        if (err) {
            console.log(err);
        } else if (result.length) {
            console.log("Query Successful");
            console.log(result);
            collection.removeOne({ 'hash': hashs });
            res.send(result[0].message)
        } else {
            console.log("No Documents found");
        }

    })
})


module.exports = router;