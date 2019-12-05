/**
 * @collectionName diaries Nhat ky canh tac
 * @field plant_id ID loai giong cay
 * @field area_id ID khu vuc trong cay
 * @field HTX_id Id cua HTX
 * @field begin Ngay bat day
 * @field end Ngay ket thuc
 * 
 */



const _ = require('lodash');
const { ObjectID } = require('immutable')

class Diary {
    constructor(app) {
        this.app = app;
    }


    validate(diary, cb = () => { }) {

        const collection = this.app.db.collection('diaries');

        const validations = {
            plant_id: {
                errorMessage: "Loai cay trong khong hop le",
                doValidate: () => {
                    const plant_id = _.get(diary, 'plant_id', null);
                    if (plant_id == null) {
                        return false;
                    }
                    return true
                }
            },
            area_id: {
                errorMessage: "Khu vuc khong hop le",
                doValidate: () => {
                    const area_id = _.get(diary, 'area_id', null);
                    if (area_id == null) {
                        return false;
                    }
                    return true;
                }
            },
            HTX_id: {
                errorMessage: "HTX khong hop le",
                doValidate: () => {
                    const HTX_id = _.get(diary, 'HTX_id', null);
                    if (HTX_id == null) {
                        return false
                    }
                    return true;
                }
            },
            begin: {
                errorMessage: "Ngay bat dau khong hop le",
                doValidate: () => {
                    const begin = _.get(diary, 'begin', '');
                    return true;
                }
            },
            end: {
                errorMessage: "Ngay ket thuc khong hop le",
                doValidate: () => {
                    const end = _.get(diary, 'end', '')
                    return true;
                }
            }

        }

        var errors = [];

        _.each(validations, (validation, field) => {
            const isValid = validation.doValidate;
            if (isValid) {
                errors.push(validation.errorMessage)
            }
        })
        if (errors.length) {
            // Kiem tra trang thai cua khu vuc la trong hay dang trong
            const collection = this.app.db.collection('area');
            const query = {

            }
            const options = {

            }
            collection.findOne(query, options).toArray((err, result) => {
                if (err || !_.get(result, '[0]')) {
                    return cb({ errorMessage: "Khu vuc khong hop le" }, null);
                }
                if (result) {
                    const area = _.get(result, '[0]');
                    if (area.isBusy) {
                        return cb({ errorMessage: "Khu vuc dang duoc su dung" }, null)

                    } else {
                        return cb(null, diary);
                    }
                }
            })
        }

    }

    search(params, cb = () => { }) {

        const collection = this.app.db.collection('diary');
        const query = _.get(params, 'query', {});
        const options = _.get(params, 'options', {});
        const resultNumber = _.get(params, 'resultNumber', 0);
        const pageNumber = _.get(params, 'pageNumber', 0);
        collection.find(query, options).limit(resultNumber).skip(pageNumber * resultNumber).toArray((err, result) => {
            if (err) {
                return cb({ errMessage: "Loi trong qua trinh tim kiem" }, null);
            }
            else {
                return cb(null, result);
            }
        })
    }

    create(params, cb = () =>) {
        const obj = {
            plant_id: params.plant_id,
            area_id: params.area_id,
            HTX_id: params.HTX_id,
            begin: params.begin,
            end: params.end
        }

        this.validate(obj, (err, diary) => {
            if (err) {
                return cb({ errorMessage: err.errorMessage }, null);
            }
            else {
                const collection = this.app.db.collection('diary');
                collection.insert(diary, (err, result) => {
                    if (err) {
                        return cb({ errorMessage: "Loi trong qua trinh them vao csdl", null})
                    }
                    else {
                        return cb(null, result);
                    }
                })
            }
        })
    }

    update(params, cb = () => { }) {
        const collection = this.app.db.collection('diary');
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
        const collection = this.app.db.collection('diary');
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

