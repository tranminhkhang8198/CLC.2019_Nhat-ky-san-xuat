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
}

