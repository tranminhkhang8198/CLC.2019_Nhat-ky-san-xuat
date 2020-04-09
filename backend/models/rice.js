const _ = require("lodash");
const mongodb = require("mongodb");
const {
    ObjectID,
} = mongodb;

class RiceSeed {
    /**
     * @constructor
     * @param {string} name - Tên giống lúa.
     * @param {string} code - Mã giống lúa.
     */
    constructor(app) {
        this.collectionName = 'riceSeed';
        this.collection = app.db.collection(this.collectionName);

        this.name;
        this.code;
        this._id;

        this.dbObject = {};
    }

    /**
     * Set _id
     * @returns {Rice}
     */
    setId() {
        this._id = new ObjectID();
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

        this.setName(name).setCode(code).setId();

        return {
            _id: this._id,
            name: this.name,
            code: this.code,
        }
    }

    async create(data) {
        this.setModel(data);
        const newRiceSeed = await this.collection.insertOne({
            _id: this._id,
            name: this.name,
            code: this.code,
        });
        this.dbObject = newRiceSeed;

        return this;
    }
}

module.exports = RiceSeed;
