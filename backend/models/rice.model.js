const _ = require("lodash");
const mongodb = require("mongodb");
const httpStatus = require('http-status');
const {
    ObjectID,
} = mongodb;

const APIError = require('../utils/APIError');

class RiceSeed {
    /**
     * @constructor
     * @param {string} name - Tên giống lúa.
     * @param {string} code - Mã giống lúa.
     */
    constructor(db) {
        this.collectionName = 'riceSeed';
        this.collection = db.collection(this.collectionName);

        this.name;
        this.code;
        this._id;
        this.model = {};

        this.dbObject = {};
    }

    /**
     * Set _id
     * @returns {Rice}
     */
    setId(id) {
        this._id = this.toObjectId(id);
        return this;
    }

    /**
     * Set name
     * @param {string} name - Tên giống lúa.
     * @returns {Rice}
     */
    setName(name) {
        this.name = name;
        return this;
    }

    /**
     * Set code
     * @param {string} code - Mã giống lúa.
     * @returns {Rice}
     */
    setCode(code) {
        this.code = code;
        return this;
    }

    /**
     * 
     * @param {Object} data - New model data.
     * @param {string} data.code - Rice seed name.
     * @param {string} data.name - Rice seed code.
     *
     * @returns {RiceSeed}
     */
    setModel(data) {
        const name = _.get(data, 'name', '');
        const code = _.get(data, 'code', '');
        const _id = _.get(data, '_id', '');

        this.setName(name).setCode(code).setId(_id);

        this.model = {
            _id: this._id,
            name: this.name,
            code: this.code,
        }
    }

    async create(data) {
        const code = _.get(data, 'code', '');
        const name = _.get(data, 'name', '');
        const _id = new ObjectID();

        this.setModel({ code, name, _id });

        const newRiceSeed = await this.collection.insertOne({
            _id: this._id,
            name: this.name,
            code: this.code,
        });
        this.dbObject = newRiceSeed;

        return this;
    }


    findById = async (id) => {
        this.setId(id);
        const result = await this.collection.find({ _id: this._id }).limit(1).next();
        this.setModel(result);
        return this;
    }

    findByCode = async (code) => {
        this.setCode(code);
        const result = await this.collection.find({ code: this.code }).limit(1).next();
        this.setModel(result);
        return this;
    }

    findByName = async (name) => {
        this.setName(name);
        const result = await this.collection.find({ name: this.name }).limit(1).next();
        this.setModel(result);
        return this;
    }

    findAll = async (filter = {}) => {
        const pageNumber = _.get(filter, 'pageNumber', 1);
        const pageSize = _.get(filter, 'pageSize', 100);

        const cursor = await this.collection.aggregate([
            {
                $facet: {
                    'countResult': [
                        {
                            $group: {
                                '_id': null,
                                'count': { '$sum': 1 },
                            },
                        },
                    ],
                    'riceseed': [
                        { $skip: parseInt(pageSize * (pageNumber - 1)) },
                        { $limit: parseInt(pageSize) },
                    ]
                },
            },
            { $unwind: '$countResult' },
            { $addFields: { 'documentCount': '$countResult.count' }},
            {
                $project: {
                    countResult: 0,
                },
            },
        ]).toArray();

        if (!cursor.length) {
            return {
                documentCount: 0,
                riceseed: [],
            };
        }

        const riceseed = _.get(cursor[0], 'riceseed', []);
        const documentCount = _.get(cursor[0], 'documentCount', 0);

        return {
            riceseed,
            documentCount,
        };
    }


    updateById = async (id, data) => {
        const code = _.get(data, 'code', '');
        const name = _.get(data, 'name', '');

        this.setName(name).setCode(code).setId(id);
        const result = await this.collection.findOneAndUpdate(
            { _id: this._id },
            {
                $set: {
                    code: this.code,
                    name: this.name,
                },
            },
            {
                returnOriginal: false,
            },

        );
        this.setModel(result.value)
        return this;
    }

    updateByCode = async (code, data) => {
        const name = _.get(data, 'name', '');

        this.setCode(code).setName(name);
        const result = await this.collection.findOneAndUpdate(
            { code: this.code },
            {
                $set: {
                    name: this.name,
                },
            },
            {
                returnOriginal: false,
            },

        );
        this.setModel(result.value);
        return this;
    }

    deleteById = async (id) => {
        this.setId(id)
        this.collection.deleteOne({ _id: this._id });
    }

    check = async (data) => {
        const code = _.get(data, 'code', '');
        const name = _.get(data, 'name', '');

        this.setCode(code).setName(name);
        const result = await this.collection.find({
            $or: [
                { code: this.code },
                { name: this.name },
            ],
        }).limit(1).next();
        return result;
    }

    dropCollection = async () => {
        const result = await this.collection.deleteMany({});
        return result;
    }

    /**
     * Convert string to ObjectId
     * @param {string} id - Inputed id.
     *
     * @returns {ObjectID}
     */
    toObjectId = (id) => {
        if (typeof id != 'string') {
            return new ObjectID(id.toString());
        }

        return new ObjectID(id);
    }
}

module.exports = RiceSeed;
