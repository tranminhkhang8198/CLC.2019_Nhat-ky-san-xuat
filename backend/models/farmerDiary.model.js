const _ = require("lodash");
const mongodb = require("mongodb");
const httpStatus = require('http-status');
const {
    ObjectID,
} = mongodb;

const APIError = require('../utils/APIError');

class FarmerDiary {
    /**
     * @constructor
     * @param {string} _id - Id của.
     * @param {string} seasonId - Id mùa vụ.
     * @param {string} farmerId - Id nông dân.
     * @param {Object[]} cropTasks - Các tác vụ nông dân ghi nhận
     * @param {string} cropTasks._id - Id tác vụ
     * @param {string} cropTasks.fieldsId - Id thửa ruộng
     * @param {Date} cropTasks.createdAt - Thời gian ghi nhật ký
     */
    constructor(db) {
        this.collectionName = 'farmerDiary';
        this.collection = db.collection(this.collectionName);

        this._id;
        this.farmerId;
        this.diaryId;
        this.cropTasks = [];
        this.createdAt;
        this.updatedAt;
        this.model = {};
    }

    setId(id) {
        this._id = this.toObjectId(id);
        return this;
    }

    setFarmerId(id) {
        this.farmerId = this.toObjectId(id);
        return this;
    }

    setDiaryId(id) {
        this.diaryId = this.toObjectId(id);
        return this;
    }

    setCropTasks(tasks) {
        this.cropTasks = tasks;
        return this;
    }

    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    setUpdatedAt(updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    setModel(data) {
        const {
            _id,
            farmerId,
            diaryId,
            cropTasks,
            createdAt,
            updatedAt,
        } = data;

        this.setId(_id)
            .setFarmerId(farmerId)
            .setDiaryId(diaryId)
            .setCropTasks(cropTasks)
            .setCreatedAt(createdAt)
            .setUpdatedAt(updatedAt);

        this.model = {
            _id: this._id,
            farmerId: this.farmerId,
            diaryId: this.diaryId,
            cropTasks: this.cropTasks,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }

    /**
     * Tạo mới nhật ký của nông dân
     * @param {Object} data
     * @param {string} data.diaryId - Id vụ mùa
     * @param {string} data.farmerId - Id nông dân
     * @param {Object[]} data.cropTasks - Các tác vụ ghi nhận trong ngày
     * @param {string} data.cropTasks._id - Id tác vụ
     * @param {string} data.cropTasks.fieldId - Id ruộng thực hiện tác vụ
     * @param {string} data.cropTasks.createdAt - Thời gian thực hiện tác vụ
     *
     * @returns {Promise<FarmerDiary>}
     */
    create = async (data) => {
        const _id = new ObjectID();
        const date = new Date();
        const diaryId = _.get(data, 'diaryId', '');
        const farmerId = _.get(data, 'farmerId', '');
        const cropTasks = _.get(data, 'cropTasks', []);

        this.setModel({
            _id,
            createdAt: date,
            updatedAt: date,
            diaryId,
            farmerId,
            cropTasks,
        });

        await this.collection.insertOne(this.model);
        return this;
    }


    findById = async (id) => {
        this.setId(id);
        return this.collection.find({ _id: this._id }).limit(1).next();
    }

    findByFarmerId = async (id) => {
        this.setFarmerId(id);
        return this.collection.find({ farmerId: this.farmerId }).toArray();
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

    getCollection = async () => {
        return this.collection.find({}).toArray();
    }

    dropCollection = async () => {
        return this.collection.deleteMany({});
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

module.exports = FarmerDiary;
