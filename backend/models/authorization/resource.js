const _ = require('lodash');


class Resource {


    constructor(app) {
        this.app = app;
    }

    /**
     * Create new resource
     * @param {string} resource 
     * @param {callback fucntion} cb 
     */
    create(resource, cb = () => { }) {

        const collection = this.app.db.collection('resource');

        const obj = {
            name: _.get(resource, 'name'),
            role: _.get(resource, 'role'),
            created: new Date()
        };

        // Check resource name in database
        collection.findOne({ name: { $eq: obj.name } }, (err, result) => {
            if (err || result) {
                return cb({ errorMessage: "resource already exist" }, null);
            }
            else {
                collection.insertOne(obj, (err, result) => {
                    if (err) {
                        return cb({ errorMessage: "error inserting new resource" }, null);
                    }
                    else {
                        return cb(null, result.ops);
                    }
                });
            }

        })


    }

    get(cb = () => { }) {
        const collection = this.app.db.collection('resource');
        collection.find().toArray((err, result) => {
            if (err || result.length == 0) {
                return err ? cb({ errorMessage: "Lỗi trong quá trình lấy dữ liệu" }, null) : cb({ errorMessage: "Không tìm thấy dữ liệu" }, null);
            }
            else {
                return cb(null, result);
            }
        })
    }
    delete(query, cb = () => { }) {
        const collection = this.app.db.collection('resource');
        collection.deleteOne(query, (err, result) => {
            if (err || result.deletedCount == 0) {
                return err ? cb({ errorMessage: "Lỗi trong quá trình xóa khỏi CSDL" }, null) : cb({ errorMessage: "Không có dữ liệu nào để xóa" }, null);
            }
            else {
                return cb(null, {
                    responseMessage: `Đã xóa ${result.deletedCount} dữ liệu`
                });
            }
        })
    }

    update(query, body, cb = () => { }) {
        const collection = this.app.db.collection('resource');
        let update = {
            $set: {
            }
        }
        for (let k in body) update['$set'][k] = body[k];

        collection.updateOne(query, update, (err, result) => {
            if (err || result.result.nModified == 0) {
                return err ? cb({ errorMessage: "Lỗi trong quá trình cập nhật CSDL" }, null) : cb({ errorMessage: "Không có dữ liệu nào để cập nhật" }, null);
            }
            else {
                return cb(null, { responseMessage: `Đã chỉnh sửa ${result.result.nModified} dữ liệu` });
            }
        })
    }

    /**
     * Get role of resource
     * @param {string} name 
     * @param {callback function} cb 
     */
    role(name, cb = () => { }) {
        const collection = this.app.db.collection('resource');
        console.log("name", name);
        const query = {
            name: `${name}`
        }
        const options = {
            name: true,
            role: true
        }
        collection.find(query, options).limit(1).toArray((err, result) => {
            if (err || !_.get(result, '[0]')) {
                return cb({ errorMessage: "Role is not found" }, null);
            }
            else {
                console.log("result", result);
                const role = _.get(result, '[0]').role;
                return cb(null, role);
            }
        })
    }
}

module.exports = Resource;