/**
 * @collectionName goodsReceipt Thông tin nhập kho
 * @field (String) _id ID của hóa đơn nhập kho
 * @field (String) cooperative_id ID của HTX
 * @field (Date) transDate Ngày nhận
 * @field (Number) quantity Số lượng nhận
 * @field (Number) price giá mua
 * @field (String) product_id ID
 * @field (String) product_type Loại sản phẩm cần nhập kho
 * @field (String) batchCode Mã lô
 * @field (Date) expireDate Hạn sử dụng
 * @field (Date) inDate Ngày nhập kho
 * @field (String) notes Ghi chú
 */

const _ = require('lodash');
const { ObjectID } = require('mongodb');
const httpStatus = require('http-status');
class GoodsReceipt {

    constructor(app) {
        this.app = app;
    }

    validate(obj, cb = () => { }) {
        const validations = {
            transDate: {
                errorMessage: "Ngày giao dịch không hợp lệ",
                doValidate: () => {
                    const transDate = obj.transDate;
                    if (this.isValidDate(transDate)) {
                        return true;
                    }
                    return false;

                }

            },
            quantity: {
                errorMessage: "Số lượng không hợp lệ",
                doValidate: () => {

                    const quantities = _.map(obj.detail, 'quantity');
                    quantities.forEach(quantity => {
                        if (quantity = null) {
                            return false;
                        }
                    })
                    return true
                }
            },
            price: {
                errorMessage: "Đơn giá không hợp lệ ",
                doValidate: () => {
                    const prices = _.map(obj.detail, 'price');
                    prices.forEach(price => {
                        if (price == null) {
                            return false;
                        }
                    })
                    return true;
                }

            },
            product_id: {
                errorMessage: "Product ID không hợp lệ",
                doValidate: () => {
                    const product_id = obj.product_id;
                    return true;
                }
            },
            product_type: {
                errorMessage: "Product type không hợp lệ",
                doValidate: () => {
                    const product_type = obj.product_type;
                    return true;
                }
            },
            batchCode: {
                errorMessage: " Mã lô không hợp lệ",
                doValidate: () => {
                    obj.detail.forEach(detail => {
                        if (detail.batchCode == null) {
                            return false;
                        }
                    })
                    return true;
                }
            },
            expireDate: {
                errorMessage: "Ngày hết hạng không hợp lệ",
                doValidate: () => {
                    obj.detail.forEach(detail => {
                        if (this.isValidDate(detail.expireDate) == false) {
                            return false;
                        }
                    })
                    return true;
                }
            },
            inDate: {
                errorMessage: "Ngày nhập kho không hợp lệ",
                doValidate: () => {
                    const inDate = obj.inDate;
                    return this.isValidDate(inDate);
                }
            },
            notes: {
                errorMessage: "Notes không hợp lệ",
                doValidate: () => {
                    const notes = obj.notes;
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
        else {
            const err = _.join(errors, ',');
            return cb({ errorMessage: err }, null);
        }


    }
    isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }

    /**
    *==========================================================
    *=                Creation functions                      =
    *=        Put all the creation functions below            =
    *==========================================================
    */

    async insertOne(obj) {
        try {
            const result = await this.app.db.collection('goodsReceipts').insertOne(obj);
            return result.ops[0];
        } catch (error) {
            throw new APIError({
                message: 'Failed on inserting goods receipt',
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: error.stack,
                isPublic: false,
                errors: error.errors,
            });
        }
    }

    /**
    *===================================================
    *=                Query functions                  =
    *=        Put all the query functions below        =
    *===================================================
    */

    get(params, cb = () => { }) {
        const collection = this.app.db.collection('goodsReceipts');
        const pageNumber = _.get(params, 'pageNumber', 0);
        const resultNumber = _.get(params, 'resultNumber', 0);
        collection.find().limit(resultNumber).skip(pageNumber * resultNumber).toArray((err, result) => {
            if (err || result.length == 0) {
                return err
                    ? cb({ errorMessage: "Xãy ra lỗi trong quá trình cập nhật CSDL", errorCode: 500 }, null)
                    : cb({ errorMessage: "Không tìm thấy dữ liệu", errorCode: 400 }, null);

            }
            else {
                return cb(null, result);
            }
        })
    }


    search(params, cb = () => { }) {
        const pageNumber = _.get(params, 'pageNumber', 0);
        const resultNumber = _.get(params, 'resultNumber', 0);
        _.unset(params, 'resultNumber');
        _.unset(params, 'pageNumber');
        const collection = this.app.db.collection('goodsReceipts');
        collection.find(query).limit(pageNumber).skip(pageNumber * resultNumber).toArray((err, result) => {
            if (err || result.length == 0) {
                return err
                    ? cb({ errorMessage: "Lỗi trong quá trình truy vấn dữ liệu", errorCode: 500 }, null)
                    : cb({ errorMessage: "Không tìm thấy dữ liệu", errorCode: 400 }, null);
            }
            else {
                return console(null, result);
            }
        })
    }

    create(body, cb = () => { }) {
        const collection = this.app.db.collection('goodsReceipts');
        let detail = [];
        body.detail.forEach(rawDetail => {
            const quantity = _.get(rawDetail, 'quantity', null);
            const price = _.get(rawDetail, 'price', null);
            const patchCode = _.get(rawDetail, 'patchCode', null);
            const expireDate = _.get(rawDetail, 'expireDate', null);
            detail.push({
                quantity: quantity,
                price: price,
                patchCode: patchCode,
                expireDate: expireDate
            })
        })


        const obj = {
            "cooperative_id": _.get(body, 'cooperative_id', ''),
            "transDate": new Date(_.get(body, 'transDate', null)),
            "product_id": _.get(body, 'product_id', ''),
            "product_type": _.get(body, 'product_type', ''),
            "detail": detail,
            "inDate": new Date(_.get(body, 'indate', null)),
            "notes": _.get(body, 'notes', ''),
            "createdDate": new Date()
        }
        this.validate(obj, (err, validObj) => {
            collection.insertOne(obj, (err, result) => {
                if (err) {
                    return cb({ errorMessage: "Xãy ra lỗi trong quá trình cập nhật CSDL", errorCode: 500 }, null)
                }
                else {
                    return cb(null, validObj);
                }
            })
        })


    }

    delete(query, cb = () => { }) {
        const collection = this.app.db.collection('goodsReceipts');
        // Check ID in query if exist
        if (query._id) {
            _.set(query, '_id', new ObjectID(query._id));
        }
        collection.deleteOne(query, (err, result) => {
            if (err || result.deletedCount == 0) {
                return err
                    ? cb({ errorMessage: "Lỗi trong quá trình cập nhật CSDL", errorCode: 500 }, null)
                    : cb({ errorMessage: "Không tìm thấy dữ liệu cần xóa ", errorCode: 400 }, null);
            }
            else {
                return cb(null, {
                    responseMessage: `Đã xóa dữ ${result.deletedCount} liệu`
                });
            }
        })

    }

}
module.exports = GoodsReceipt;