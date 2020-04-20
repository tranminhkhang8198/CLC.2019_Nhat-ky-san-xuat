/**
 * @modelName employee Thành sự thuộc HTX
 * @field (String) _id ID của nhân sự trong CSDL,
 * @field (String) name Họ và Tên của nhân sự
 * @field (String) phone Số điện thoại
 * @field (String) address Địa chỉ
 * @field (String) jobTitle Chức vụ
 * @field (String) jobDesc Mô tả
 * @field (String) note ghi chú
 */
const httpStatus = require('http-status');
const _ = require('lodash')
const { ObjectID } = require('mongodb')
const APIError = require('../utils/APIError')
class Employee {

    constructor(app) {
        this.app = app;
    }

    validate(obj, cb = () => { }) {
        const validations = {
            name: {
                errorMessage: "Tên nhân sự không hợp lệ",
                doValidate: () => {
                    const name = obj.name;
                    console.log("name", name);
                    if (name && name.length) {
                        return true;
                    }
                    return false;
                }
            },
            phone: {
                errorMessage: "Số điện thoại không phù hợp",
                doValidate: () => {
                    const phone = obj.phone;
                    if (phone && phone.length > 9) {
                        return true;
                    }
                    return false;
                }
            },
            address: {
                errorMessage: "Địa chỉ không hợp lệ",
                doValidate: () => {
                    const address = obj.address
                    return true;
                }

            },
            jobTitle: {
                errorMessage: "Tên chức vụ không hợp lệ",
                doValidate: () => {
                    const jobtitle = obj.user;
                    if (jobtitle && jobtitle.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            jobDesc: {
                errorMessage: "Thông tin chức vụ không hợp lệ",
                doValidate: () => {
                    const jobDesc = obj.jobDesc;
                    return true;
                }
            },
            note: {
                errorMessage: "Ghi chú không hợp lệ",
                doValidate: () => {
                    const note = obj.note;
                    return true;
                }
            }
        }
        let errors = []
        _.each(validations, (validation, field) => {

            const isValid = validation.doValidate();
            if (!isValid) {

                const errorMessage = validation.errorMessage;
                errors.push(errorMessage);

            }

        });
        if (errors.length == 0) {
            return cb(null, obj);
        }
        const err = _.join(errors, ',');
        return cb({ errorMessage: err, errorCode: 400 }, null);
    }

    beforeUpdateChecking(obj, cb = () => { }) {
        const collection = this.app.db.collection('user');
        this.validate(obj, (err, validObj) => {
            if (err) {
                return cb(err, null);
            }
            else {
                console.log(validObj);
                const query = {
                    phone: obj.phone
                }
                collection.find(query).limit(1).toArray((err, result) => {
                    if (err || _.get(result, '[0]', false)) {
                        return err
                            ? cb({ errorMessage: "Lỗi trong quá trình truy xuất dữ liệu", errorCode: 500 }, null)
                            : cb({ errorMessage: "Người dùng đã tồn tại trong CSDL", errorCode: 400 }, null);
                    }
                    else {
                        return cb(null, validObj);
                    }
                })
            }
        })
    }

    create(params, cb = () => { }) {
        const collection = this.app.db.collection('user')
        const obj = {
            name: _.toString(_.get(params, 'name', '')),
            avatar: _.toString(_.get(params, 'avatar', '')),
            personalId: _.toString(_.get(params, 'personalId', '')),
            address: _.toString(_.get(params, 'address', '')),
            phone: _.get(params, 'phone', 'hi there'),
            email: _.trim(_.toLower(_.get(params, 'email', ''))),
            user: _.get(params, 'jobTitle', ''),
            HTXId: _.get(params, 'HTXId', ''),
            password: _.get(params, 'password', ''),
            created: new Date(),
        }


        this.beforeUpdateChecking(obj, (err, validObj) => {
            if (err) {
                return cb(err, null);
            }
            else {
                collection.insertOne(validObj, (err, result) => {
                    if (err) {
                        return cb({ errorMessage: "Xãy ra lỗi trong quá trình cập nhậ CSDL", errorCode: 500 }, null);
                    }
                    else {
                        let returnObj = result.ops[0];
                        returnObj.jobTitle = returnObj.user;
                        delete returnObj['user'];
                        _.unset(returnObj, 'password');
                        returnObj.salary = "600"
                        returnObj.jobDesc = ""
                        return cb(null, returnObj)
                    }
                })
            }
        })
    }

    get(params, cb = () => { }) {
        let pageNumber = _.get(params, 'pageNumber', 0);
        const resultNumber = _.get(params, 'resultNumber', 0);
        const HTXId = _.get(params, 'HTXId', null);

        if (HTXId == null) {
            return cb({ errorMessage: "Yêu cầu không được chấp nhận: Thiếu thông tin HTX", errorCode: 400 }, null);
        }
        pageNumber > 0 ? pageNumber = pageNumber - 1 : pageNumber = 0
        const collection = this.app.db.collection('user');
        const query = {
            HTXId: HTXId
        }
        const option = {
            projection: {
                email: 0,
                password: 0,
                personalId: 0
            }

        }
        collection.find(query, option).limit(parseInt(resultNumber)).skip(pageNumber * resultNumber)
            .map(doc => {
                doc.jobTitle = doc.user;
                delete doc['user'];
                return doc;
            }).toArray((err, result) => {
                if (err || result.length == 0) {
                    return err
                        ? cb({ errorMessage: "Lỗi trong quá trình truy xuất dữ liệu", errorCode: 500 }, null)
                        : cb({ errorMessage: "Không tìm thấy dữ liệu", errorCode: 400 }, null)
                }
                else {
                    return cb(null, result);
                }
            })
    }
    async updateByEmpID(_id, updateData) {
        try {
            const result = await this.app.db.collection('user').findOneAndUpdate(
                {
                    _id: _id,
                },
                {
                    $set: updateData,

                },
                {
                    returnOriginal: false,
                    projection: {
                        password: 0,
                    },
                }
            );
            return result;

        } catch (error) {
            throw new APIError({
                message: 'Failed on updating employee information',
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: error.stack,
                isPublic: false,
                errors: error.errors,
            })
        }
    }
    async searchByName(name, pagination, projection = {}) {
        try {
            const collection = this.app.db.collection('user');
            const result = await collection.find(
                {
                    name: new RegExp(`${name}`, "igm"),
                },
                {
                    projection: projection
                },
            );
            const count = await result.count();
            const resultArr = await result.skip(pagination.pageNumber * pagination.pageSize)
                .limit(pagination.pageSize)
                .toArray();
            return {
                total: count,
                records: resultArr
            };

        } catch (error) {
            throw new APIError({
                message: 'Failed on updating employee information',
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: error.stack,
                isPublic: false,
                errors: error.errors,
            })
        }
    }


    getTotal(params, cb = () => { }) {
        const collection = this.app.db.collection('user');
        const HTXId = _.get(params, 'HTXId', '');
        if (!HTXId || HTXId.length <= 0) {
            return cb({ errorMessage: "HTX ID không hợp lệ" }, null);
        }
        const query = {
            'HTXId': HTXId
        }
        collection.find(query).count((err, result) => {
            if (err || result === 0) {
                return err
                    ? cb({ errorMessage: "Lỗi trong quá trình truy xuất dữ liệu", errorCode: httpStatus.INTERNAL_SERVER_ERROR }, null)
                    : cb({ errorMessage: "Không tìm thấy dữ liệu", errorCode: httpStatus.NOT_FOUND }, null);
            }
            else {
                return cb(null, { total: result });
            }
        })
    }

    /**
    *=========================================================
    *=                Deletion functions                     =
    *=        Put all the deletion functions below       	  =
    *=========================================================
    */

    async removeFromCoop(empID, HTXId) {
        try {

            const result = await this.app.db.collection('user').findOneAndUpdate(
                {
                    _id: empID,
                    HTXId: HTXId,
                },
                {
                    $set: {
                        HTXId: null,
                    }
                },
                {
                    returnOriginal: false,
                    projection: {
                        password: 0,
                    }
                }
            );
            return result.value;

        } catch (error) {
            throw new APIError({
                message: 'Failded on removing employee from Corperatives',
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: error.stack,
                isPublic: false,
                errors: error.errors,
            })
        }
    }


}
module.exports = Employee;