const _ = require('lodash');
/**
 * Permission roles
 * G: GET
 * P: POST 
 * U: PATCH
 * D: DELETE
 * 
 */
class Role {

    constructor(app) {
        this.app = app;
    }

    /**
     * Create new role
     * @param {string} role 
     * @param {callback fucntion} cb 
     */
    create(role, cb = () => { }) {
        const collection = this.app.db.collection('roles');

        const obj = {
            _id: _.get(role, '_id'),
            method: _.get(role, 'method'),
            created: new Date()
        }

        collection.insertOne(obj, (err, result) => {

            if (err) {
                return cb({ errorMessage: "Lỗi trong quá trình cập nhật CSDL", errorCode: 501 }, null);
            }
            else {
                return cb(null, result.ops);
            }
        })


    }

    /**
     * Compare user method with allow method on resource
     * @param {string} method 
     * @param {string} allowRole 
     * @param {callback function} cb 
     */
    compare(method, allowRole, cb = () => { }) {


        // Get protocol id
        const collection = this.app.db.collection('roles');
        const query = {
            method: `${method}`
        }
        const options = {
            _id: 1
        }
        collection.find(query, options).limit(1).toArray((err, result) => {
            if (err || !_.get(result, '[0]')) {
                return cb({ errorMessage: "Lỗi trong quá trình truy xuất dữ liệu", errorCode: 400 }, null);
            }
            else {
                const compare = allowRole.indexOf(result[0]._id.toString())
                if (compare > -1) {
                    return cb(null, true);
                }
                else {
                    return cb({ err: "Bạn không có quyền truy cập vào tài nguyên này", errorCode: 400 }, null);
                }
            }
        })


    }
    get(cb = () => { }) {
        const collection = this.app.db.collection('roles');
        collection.find().toArray((err, result) => {
            if (err || result.length == 0) {
                return err
                    ? cb({ errorMessage: "Lỗi trong quá trình truy vấn CSDL", errorCode: 500 }, null)
                    : cb({ errorMessage: "Không tìm thấy dữ liệu", errorCode: 400 }, null);
            }
            else {
                return cb(null, result);
            }
        })
    }
    delete(query, cb = () => { }) {
        const collection = this.app.db.collection('roles');
        collection.deleteOne(query, (err, result) => {
            if (err || result.deletedCount == 0) {
                return err
                    ? cb({ errorMessage: "Lỗi trong quá trình cập nhật CSDL", errorCode: 501 }, null)
                    : cb({ errorMessage: "Không tồn tại dữ liệu cần xóa", errorCode: 401 }, null);
            }
            else {
                return cb(null, {
                    responseMessage: `Đã xóa ${result.deletedCount} dữ liệu`
                });
            }
        })
    }
}

module.exports = Role