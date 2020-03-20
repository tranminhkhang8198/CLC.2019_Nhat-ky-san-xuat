const _ = require('lodash');
const mongodb = require('mongodb');

const catchAsync = require('../utils/catchAsync');

class Tool {
    constructor(app) {
        this.app = app;

        this.model = {
            name: null,
            total: null,
            available: null,
            image: null,
            note: null,
            cooperativeId: null
        }
    }

    initWithObject(obj) {
        this.model.name = _.get(obj, 'name', null)
        this.model.total = _.get(obj, 'total', null)
        this.model.available = _.get(obj, 'available', null)
        this.model.image = _.get(obj, 'image', null)
        this.model.note = _.get(obj, 'note', null);
        this.model.cooperativeId = _.get(obj, 'cooperativeId', null);
    }

    async create(obj) {
        const Tool = this.app.db.collection('tools');

        // init model
        this.initWithObject(obj);

        const tool = await Tool.insertOne(this.model);

        return tool.ops[0];
    }
}

module.exports = Tool;