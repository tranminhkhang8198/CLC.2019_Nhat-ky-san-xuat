/**
 * @collectionName goodReceipt Thông tin nhập kho
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
class GoodReceipt {

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
                    const quantity = obj.quantity;
                    return true
                }
            },
            price: {
                errorMessage: "Đơn giá không hợp lệ ",
                doValidate: () => {
                    const price = obj.price;
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
                    const batchCode = obj.batchCode;
                    return true;
                }
            },
            expireDate: {
                errorMessage: "Ngày hết hạng không hợp lệ",
                doValidate: () => {
                    const expireDate = obj.expireDate;
                    return this.isValidDate(expireDate);
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

    create(body, cb = () => { }) {
        const collection = this.app.db.collection('goodReceipts');
        const obj = {
            "cooperative_id": _.get(body, 'cooperative_id', ''),
            "transDate": new Date(_.get(body, 'transDate', null)),
            "quantity": _.get(body, 'quantity', null),
            "price": _.get(body, 'price', null),
            "product_id": _.get(body, 'product_id', ''),
            "product_type": _.get(body, 'product_type', ''),
            "batchCode": _.get(body, "batchCode", ''),
            "expireDate": new Date(_.get(body, "expireDate", null)),
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
        const collection = this.app.db.collection('goodReceipts');
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
module.exports = GoodReceipt;