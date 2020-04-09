const Promise = require('bluebird');
const {
    MongoClient,
    Logger,
} = require('mongodb');

const {
    database,
    env,
} = require('./vars');

const logger = require('./logger');

const {
    uri,
    name,
} = database;

const options = {
    useUnifiedTopology: true,
    promiseLibrary: Promise,
};

if (env === 'development') {
    // Set debug level
    Logger.setLevel('debug');
    Logger.filter('class', ['Db']);
}

module.exports.connect = async () => {
    try {
        const client = await MongoClient.connect(uri, options);
        logger.info('Database connection established');

        const db = client.db(name);

        return { db, client };
    } catch (error) {
        logger.error('Error connecting to MongoDb');
        process.exit(0);
    }
};
