const { MongoClient } = require('mongodb');
const { mongodbUrl, dbName } = require('./config');
const options = { useUnifiedTopology: true };



exports.connect = (cb) => {

    MongoClient.connect(mongodbUrl, options, (err, client) => {

        return cb(err, client);

    })
};