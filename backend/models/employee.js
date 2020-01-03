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

const _ = require('lodash')

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
                    return true;
                }
            },
            phone: {
                errorMessage: "Số điện thoại không phù hợp",
                diValidate: () => {
                    const phone = obj.phone;
                    console.log(phone);
                    return true;
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
                    const jobtitle = obj.jobtitle;
                    return true;
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
        _.forEach(validations, (validation, field) => {
            if (!validation.doValidate) {
                errors.push(validation.errorMessage);
            }
        })
        if (errors.length == 0) {
            return cb(null, obj);
        }
        const err = _.join(errors, ',');
        return cb({ errorMessage: err, errorCode: 400 }, null);
    }

    create(params, cb = () => { }) {
        const collection = this.app.db.collection('user')
        const obj = {
            name: _.toString(_.get(params, 'name', '')),
            avatar: _.toString(_.get(params, 'avatar', '')),
            personalId: _.toString(_.get(params, 'personalId', '')),
            address: _.toString(_.get(params, 'address', '')),
            phone: _.get(params, 'phone', ''),
            email: _.trim(_.toLower(_.get(params, 'email', ''))),
            user: _.get(params, 'jobTitle', ''),
            HTXId: _.get(params, 'HTXId', ''),
            password: _.get(params, 'password', ''),
            created: new Date(),
        }

        this.validate(obj, (err, validObj) => {
            if (err) {
                return cb(err, null);
            }
            else {
                collection.insertOne(validObj, (err, result) => {
                    if (err) {
                        return cb({ errorMessage: "Xãy ra lỗi trong quá trình cập nhậ CSDL", errorCode: 500 }, null);
                    }
                    else {
                        return cb(null, result)
                    }
                })
            }
        })
    }

    get(params, cb = () => { }) {
        const pageNumber = _.get(params, 'pageNumber', 0);
        const resultNumber = _.get(params, 'resultNumber', 0);
        const HTXId = _.get(params, 'HTXId', null);

        if (HTXId == null) {
            return cb({ errorMessage: "Yêu cầu không được chấp nhận: Thiếu thông tin HTX", errorCode: 400 }, null);
        }
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
        collection.find(query, option).limit(resultNumber).skip(pageNumber * resultNumber)
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


}
module.exports = Employee;