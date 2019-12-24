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

    validate(model, cb = () => { }) {
        let errors = [];

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

        //     // Get plant protection product name
        //     plantProtectionProductWarehouse.forEach(elem => {
        //         plantProtectionProduct.findOne({ _id: mongoose.Types.ObjectId(elem.plantProtectionProductId) })
        //             .then((plantProtectionProduct) => {
        //                 elem['plantProtectionProductName'] = plantProtectionProduct.name;

        //                 responseToClient["data"] = elem;

        //                 count = count + 1;

        //                 if (count == length) {
        //                     return cb(null, responseToClient);
        //                 }
        //             }).catch(err => {
        //                 return cb(err, null);
        //             });
        //     });
        // }).catch((err) => {
        //     return cb(err, null);
        // });

        // plantProtectionProductWarehouse.find(query)
        //     .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
        //     .limit(Number(nPerPage))
        //     .toArray()
        //     .then((plantProtectionProductWarehouses) => {

        //         // Get plant protection product name
        //         let count = 0;
        //         let length = plantProtectionProductWarehouses.length;

        //         if (length == 0) {
        //             const message = 'Trang tìm kiếm không tồn tại';
        //             return cb(message, null);
        //         }

        //         plantProtectionProductWarehouses.forEach((elem) => {
        //             plantProtectionProduct.findOne({ _id: mongoose.Types.ObjectId(elem.plantProtectionProductId) })
        //                 .then((plantProtectionProduct) => {
        //                     elem['plantProtectionProductName'] = plantProtectionProduct.name;

        //                     responseToClient.push(elem);

        //                     count = count + 1;

        //                     if (count == length) {
        //                         return cb(null, responseToClient);
        //                     }
        //                 }).catch(err => {
        //                     return cb(err, null);
        //                 });
        //         });
        //     }).catch((err) => {
        //         return cb(err, null);
        //     });
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

    updateById(id, update, cb = () => { }) {
        const plantProtectionProductWarehouse = this.app.db.collection("plantProtectionProductWarehouse");

        this.findById(id, (err, res) => {
            if (err) {
                return cb(err, null);
            } else {
                this.initWithObject(res);

                let model = this.model;

                // Update model
                for (let key in update) {
                    if (model[key]) {
                        model[key] = update[key];
                    }
                }

                // Validate
                this.validate(model, (errors) => {
                    let messages = [];

                    if (errors.length > 0) {
                        _.each(errors, (err) => {
                            messages.push(err.message);
                        });

                        return cb(_.join(messages, ', '), null);

                    } else {
                        // Update to database
                        plantProtectionProductWarehouse.update({ _id: mongoose.Types.ObjectId(id) }, model)
                            .then(() => {
                                this.findById(id, (err, res) => {
                                    if (err) {
                                        return cb(err, null);
                                    }

                                    return cb(null, res);
                                });
                            }).catch(err => {
                                return cb(err, null);
                            });
                    }
                });
            }
        });
    }

}

module.exports = PlantProtectionProductWarehouse;