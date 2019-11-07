const {MongoClient} = require('mongodb');
const {mongodbUrl, dbName} = require('./config')



exports.connect = (cb) => {

    MongoClient.connect(mongodbUrl, (err, client) => {

        return cb(err, client);

    })
};