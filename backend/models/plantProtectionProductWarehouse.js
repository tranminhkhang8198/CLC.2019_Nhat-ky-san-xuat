const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');


class PlantProtectionProductWarehouse {
    constructor(app) {
        this.app = app;

        this.model = {
            plantProtectionProductId: null,
            tradeDate: null,
            quantity: null,
            manufacturingDate: null,
            expiryDate: null,
            quarantineDate: null,
            distributionAgent: null,
            cooperativeId: null,
            created: new Date()
        }
    }

    initWithObject(obj) {
        this.model.plantProtectionProductId = _.trim(_.get(obj, 'plantProtectionProductId', null));
        this.model.quantity = _.get(obj, 'quantity', null);
        this.model.tradeDate = _.get(obj, 'tradeDate', null);
        this.model.manufacturingDate = _.get(obj, 'manufacturingDate', null);
        this.model.expiryDate = _.get(obj, 'expiryDate', null);
        this.model.quarantineDate = _.get(obj, 'quarantineDate', null);
        this.model.distributionAgent = _.get(obj, 'distributionAgent', null);
        this.model.cooperativeId = _.trim(_.get(obj, 'cooperativeId', null));
    }

    validate(cb = () => { }) {
        let errors = [];

        const model = this.model;
        const reg = /^\d+$/;

        const plantProtectionProduct = this.app.db.collection("plantProtectionProduct");
        const cooperative = this.app.db.collection('cooperatives');

        // Plant Protection Product Name Validate
        if (model.plantProtectionProductId == null) {
            errors.push({
                message: 'Vui lòng nhập id thuốc bảo vệ thực vật'
            });
        }

        // Cooperative Id Validate
        if (model.cooperativeId == null) {
            errors.push({
                message: 'Vui lòng nhập id họp tác xã'
            });
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

        // Quarantine Date Validate
        if (model.quarantineDate == null) {
            errors.push({
                message: 'Vui lòng nhập thời gian cách ly'
            });
        } else if (!reg.test(model.quarantineDate)) {
            errors.push({
                message: 'Thời gian cách ly phải là số nguyên dương'
            });
        }

        // Date Validate
        if (model.manufacturingDate == null) {
            errors.push({
                message: 'Vui lòng nhập ngày sản xuất'
            });
        } else if (!validator.isISO8601(model.manufacturingDate)) {
            errors.push({
                message: 'Ngày sản xuất không hợp lệ'
            });
        }

        if (model.expiryDate == null) {
            errors.push({
                message: 'Vui lòng nhập hạn sử dụng'
            });
        } else if (!validator.isISO8601(model.expiryDate)) {
            errors.push({
                message: 'Hạn sử dụng không hợp lệ'
            });
        }

        if (model.tradeDate != null) {
            if (!validator.isISO8601(model.tradeDate)) {
                errors.push({
                    message: 'Ngày mua không hợp lệ'
                });
            }
        }

        // Check Plant Protection Product Exists
        plantProtectionProduct.findOne({ _id: mongoose.Types.ObjectId(model.plantProtectionProductId) })
            .then((plantProtectionProduct) => {
                if (!plantProtectionProduct) {
                    errors.push({
                        message: 'Thuốc bảo vệ thực vật không tồn tại trong danh mục'
                    });
                }

                return cooperative.findOne({ cooperativeID: model.cooperativeId });
            }).then((cooperative) => {
                if (!cooperative) {
                    errors.push({
                        message: 'Hợp tác xã không tồn tại'
                    });
                }

                return cb(errors);
            }).catch((err) => {
                console.log(err);
            });
    }

    create(body, cb = () => { }) {
        const plantProtectionProductWarehouse = this.app.db.collection('plantProtectionProductWarehouse');

        // Create new warehouse with req body
        this.initWithObject(body);

        console.log(this.model);

        let model = this.model;
        const db = this.app.db;

        this.validate((errors) => {
            let messages = [];

            if (errors.length > 0) {
                _.each(errors, (err) => {
                    messages.push(err.message);
                });

                return cb(_.join(messages, ', '), null);

            } else {
                plantProtectionProductWarehouse.insertOne(model)
                    .then(plantProtectionProductWarehouse => {
                        return cb(null, plantProtectionProductWarehouse.ops[0]);
                    })
                    .catch(err => {
                        return cb(err, null);
                    });
            }
        });
    }

    find(query, cb = () => { }) {
        const plantProtectionProductWarehouse = this.app.db.collection('plantProtectionProductWarehouse');

        plantProtectionProductWarehouse.find(query).toArray()
            .then((plantProtectionProductWarehouses) => {
                return cb(null, plantProtectionProductWarehouses);
            }).catch((err) => {
                return cb(err, null);
            });
    }

    findById(id, cb = () => { }) {
        const plantProtectionProductWarehouse = this.app.db.collection('plantProtectionProductWarehouse');

        plantProtectionProductWarehouse.findOne({ _id: mongoose.Types.ObjectId(id) })
            .then((plantProtectionProductWarehouse) => {
                if (!plantProtectionProductWarehouse) {
                    const message = 'Thuốc bảo vệ thực vật không tồn tại trong kho';
                    return cb(message, null);
                }

                return cb(null, plantProtectionProductWarehouse);
            }).catch((err) => {
                return cb(err, null);
            });
    }

    deleteById(id, cb = () => { }) {
        const plantProtectionProductWarehouse = this.app.db.collection('plantProtectionProductWarehouse');

        this.findById(id, (err, res) => {
            if (err) {
                return cb(err, null);
            } else {
                plantProtectionProductWarehouse.deleteOne({ _id: mongoose.Types.ObjectId(id) })
                    .then((plantProtectionProductWarehouse) => {

                        const message = {
                            successMessage: 'Thuốc bảo vệ thực vật được xóa khỏi kho thành công'
                        }

                        return cb(null, message);

                    }).catch((err) => {
                        return cb(err, null);
                    });
            }
        });
    }
}

module.exports = PlantProtectionProductWarehouse;