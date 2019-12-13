

const _ = require('lodash');
const { ObjectID } = require('immutable');

class Field {

    constructor(app) {
        this.app = app;
    }
    validate(field, cb = () => { }) {
        return cb(null, field);
    }

    create(params, cb = () => { }) {
        const collection = this.app.db.collection('fields');
        const obj = {
            name: _.get(params, 'name', ''),
            area_id: _.get(params, 'area_id', ''),
            square: _.get(params, 'square', ''),
            unit: _.get(params, 'unit', ''),
            status: _.get(params, 'status', 0)

        }
        this.validate(obj, (err, validData) => {
            if (err) {
                return cb({ errorMessage: err.errorMessage }, null);
            }
            else {
                collection.insertOne(validData, (err, result) => {
                    if (err) {
                        return cb({ errorMessage: "Lỗi trong quá trình thêm dữ liệu" }, null);
                    }
                    else {
                        return cb(null, result.ops[0]);
                    }
                })
            }
        })
    }
}
module.exports = Field;