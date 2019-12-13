/**
 * @collectionName diaries Nhat ky canh tac
 * @field plant_id ID loai giong cay
 * @field fields Danh sach cac field
 * @field HTX_id Id cua HTX
 * @field begin Ngay bat day
 * @field end Ngay ket thuc
 * 
 */



const _ = require('lodash');
const { ObjectID } = require('mongodb')

class Diary {
    constructor(app) {
        this.app = app;
    }


    validate(diary, cb = () => { }) {

        const collection = this.app.db.collection('diaries');
        const validations = {
            plant_id: {
                errorMessage: "Loại cây trồng không hợp lệ",
                doValidate: () => {
                    const plant_id = _.get(diary, 'plant_id', null);
                    if (plant_id == null) {
                        return false;
                    }
                    return true
                }
            },
            fields: {
                errorMessage: "Khu vực không hợp lệ",
                doValidate: () => {
                    const fields = _.get(diary, 'fields', []);
                    if (fields.length === 0) {
                        return false;
                    }
                    return true;
                }
            },
            HTX_id: {
                errorMessage: "Hợp tác xã không hợp lệ",
                doValidate: () => {
                    const HTX_id = _.get(diary, 'HTX_id', null);
                    if (HTX_id == null) {
                        return false
                    }
                    return true;
                }
            },
            begin: {
                errorMessage: "Ngày bắt đầu không hợp lệ",
                doValidate: () => {
                    const begin = _.get(diary, 'begin', null);
                    return this.isValidDate(begin) ? true : false;
                }
            },
            end: {
                errorMessage: "Ngày kết thúc không hợp lệ",
                doValidate: () => {
                    const end = _.get(diary, 'end', null);
                    return this.isValidDate(end) ? true : false;
                }
            }

        }

        var errors = [];

        _.each(validations, (validation, field) => {
            const isValid = validation.doValidate();
            if (!isValid) {
                errors.push(validation.errorMessage)
            }
        })
        if (errors.length) {
            const err = _.join(errors, ',');
            return cb({ errorMessage: err }, null);
        }
        else {
            // Kiem tra trang thai cua khu vuc la trong hay dang trong
            const collection = this.app.db.collection('fields');
            var fields = []
            _.forEach(diary.fields, field => {
                fields.push(new ObjectID(field));
            })
            const query = {
                _id: {
                    $in: fields
                }
            }
            const options = {

            }
            collection.find(query, options).toArray((err, result) => {
                if (err || result.length <= 0) {
                    return err ? cb({ errorMessage: "Khu vực không hợp lệ" }, null) : cb({ errorMessage: "Khu vực gieo trồng không tồn tại" }, null);
                }
                else {
                    var busy = [];
                    _.forEach(result, field => {
                        if (field.status) {
                            // return cb({ errorMessage: "Khu vực đang được sử dụng" }, null)
                            busy.push(field._id);
                        }

                    })
                    if (busy.length) {
                        const err = _.join(busy, ',');
                        return cb({ errorMessage: `thửa ${err} đang được sử dụng` }, null);
                    }
                    else {
                        return cb(null, diary);
                    }

                }
            })
        }


    }
    isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }

    search(params, cb = () => { }) {

        const collection = this.app.db.collection('diaries');
        const query = _.get(params, 'query', {});
        const options = _.get(params, 'options', {});
        const resultNumber = _.get(params, 'resultNumber', 0);
        const pageNumber = _.get(params, 'pageNumber', 0);
        collection.find(query, options).limit(resultNumber).skip(pageNumber * resultNumber).toArray((err, result) => {
            if (err) {
                return cb({ errMessage: "Lỗi trong quá trình tìm kiếm" }, null);
            }
            else {
                return cb(null, result);
            }
        })
    }

    create(params, cb = () => { }) {

        let obj = {
            plant_id: _.get(params, 'plant_id', null),
            fields: _.get(params, 'fields', []),
            HTX_id: _.get(params, 'HTX_id', null),
            begin: new Date(_.get(params, 'begin', null)),
            end: new Date(_.get(params, 'end', null))
        }

        this.validate(obj, (validateErr, diary) => {
            if (validateErr) {
                return cb({ errorMessage: validateErr.errorMessage }, null);
            }
            else {
                const collection = this.app.db.collection('diaries');
                collection.insertOne(diary, (err, result) => {
                    if (err) {
                        console.log("insert error", err);
                        return cb({ errorMessage: "Lỗi trong qúa trình thêm vào CSDL" }, null)
                    }
                    else {
                        // TODO: Thay đổi trạng thái của khu vực được gieo trồng
                        return cb(null, diary);
                    }
                })
            }
        })
    }


    update(params, cb = () => { }) {
        const collection = this.app.db.collection('diaries');
        var query = params.query;
        var updateData = body.update;

        // TODO: Validate before update
        if (query._id) {
            try {
                query._id = new ObjectID(query._id);

            } catch (error) {
                return cb({ errorMessage: "ID khong hop le" }, null);
            }
        }

        collection.updateMany(query, updateData, { returnNewDocument: true }, (err, result) => {
            if (err || result.result.nModified == 0) {
                console.log("err: ", err);
                return err ? cb({ errorMessage: "Loi trong qua trinh cap nhat thong tin nhat ky" }, null) : cb({ errorMessage: "Nothing to update" }, null);
            }
            else {
                console.log("query result", result);
                return cb(null, { nModified: `${result.result.nModified}` });
            }
        })


    }

    remove(params, cb = () => { }) {
        const collection = this.app.db.collection('diaries');
        const query = _.get(params, 'query', null);
        if (query == null) {
            return cb({ errMessage: "Tac vu yeu cau phai co dieu kien" }, null);
        }
        try {
            console.log(query);

            var _id = _.get(query, "_id", null);
            if (_id != null) {
                _id = new ObjectID(_id);
                _.set(query, '_id', _id);
            }
            console.log(query);
            collection.deleteMany(query)
            return cb(null, query)
        } catch (error) {
            return cb({ errMessage: "Loi trong qua trinh xoa HTX" }, null);
        }
    }
}

module.exports = Diary;

