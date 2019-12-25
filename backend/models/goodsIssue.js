const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');

class GoodsIssue {
    constructor(app) {
        this.app = app;

        this.model = {
            receiverId: null,
            productId: null,
            productType: null,
            quantity: null,
            tradeDate: null,
            goodsReceiptId: null,
            cooperativeId: null,
            note: null
        }
    }

    initWithObject(obj) {
        this.model.receiverId = _.get(obj, 'receiverId', null);
        this.model.productId = _.get(obj, 'productId', null);
        this.model.productType = _.trim(_.get(obj, 'productType'), null);
        this.model.quantity = _.get(obj, 'quantity', null);
        this.model.tradeDate = _get(obj, 'tradeDate', tradeDate);
        this.model.goodsReceiptId = _.get(obj, 'goodsReceiptId', null);
        this.model.cooperativeId = _.get(obj, 'cooperativeId', null);
        this.model.note = _.get(obj, 'note', null);
    }

    validate(model, cb = {}) {
        let errors = [];

        const reg = /^\d+$/;

        const cooperative = this.app.db.collection('cooperatives');

        // Validate productType
        if (model.productType == null) {
            errors.push({
                message: 'Vui lòng nhập loại sản phẩm'
            });
        }

        // Validate receiverID        
        if (model.receiverId == null) {
            errors.push({
                message: 'Vui lòng nhập id người nhận'
            })
        } else {
            // Check receiver exits

        }

        // Validate productId
        if (model.productType == null) {
            errors.push({
                message: 'Vui lòng nhập id sản phẩm'
            });
        } else {
            // Check product exists in db

        }

        // Quantity Validate
        if (model.quantity == null) {
            errors.push({
                message: 'Vui lòng nhập số lượng'
            });
        } else if (!reg.test(model.quantity)) {
            errors.push({
                message: 'Số lượng phải là số nguyên dương'
            });
        }

        if (model.tradeDate != null) {
            if (!validator.isISO8601(model.tradeDate)) {
                errors.push({
                    message: 'Ngày mua không hợp lệ'
                });
            }
        }

        // Cooperative Id Validate
        if (model.cooperativeId == null) {
            errors.push({
                message: 'Vui lòng nhập id họp tác xã'
            });
        } else {
            // Check cooperative exists
        }

        if (model.goodsReceiptId == null) {
            errors.push({
                message: 'Vui lòng nhập id nhập kho của sản phẩm'
            });
        } else {
            // Check goods receipt exists

        }
    }

    create(body, cb = () => { }) {
        const goodsIssue = this.app.db.collection('goodsIssue');

        // Create new goods issue with req body
        this.initWithObject(body);

        let model = this.model;
        const db = this.app.db;

        this.validate(model, (errors) => {
            let messages = [];

            if (errors.length > 0) {
                _.each(errors, (err) => {
                    messages.push(err.message);
                });

                return cb(_.join(messages, ', '), null);

            } else {
                goodsIssue.insertOne(model)
                    .then(goodsIssue => {
                        return cb(null, goodsIssue.ops[0]);
                    })
                    .catch(err => {
                        return cb(err, null);
                    });
            }
        });
    }

    find(query, cb = () => { }) {
        const plantProtectionProductWarehouse = this.app.db.collection('plantProtectionProductWarehouse');
        const plantProtectionProduct = this.app.db.collection('plantProtectionProduct');

        const pageNumber = query.pageNumber;
        const nPerPage = query.nPerPage;

        delete query.pageNumber;
        delete query.nPerPage;

        let responseToClient = {};

        plantProtectionProductWarehouse.find().count()
            .then(count => {
                const totalPages = ((count - (count % nPerPage)) / nPerPage) + 1;

                responseToClient["totalPages"] = totalPages;

                return plantProtectionProductWarehouse
                    .find(query)
                    .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                    .limit(Number(nPerPage))
                    .toArray();

            }).then(plantProtectionProductWarehouses => {
                let count = 0;
                let length = plantProtectionProductWarehouses.length;

                if (length == 0) {
                    const message = 'Trang tìm kiếm không tồn tại';
                    return cb(message, null);
                }

                // Get Plant Protection Product Name
                plantProtectionProductWarehouses.forEach(elem => {
                    plantProtectionProduct.findOne({ _id: mongoose.Types.ObjectId(elem.plantProtectionProductId) })
                        .then(plantProtectionProduct => {
                            elem["plantProtectionProductName"] = plantProtectionProduct.name;

                            if (!responseToClient['data']) {
                                responseToClient['data'] = [];
                            }
                            responseToClient['data'].push(elem);

                            // Trigger To Return Response
                            count = count + 1;
                            if (count == length) {
                                return cb(null, responseToClient);
                            }
                        }).catch(err => {
                            return cb(err, null);
                        });

                });
            }).catch(err => {
                return cb(err, null);
            });
    }
}