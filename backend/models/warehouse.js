const _ = require('lodash');
const mongodb = require('mongodb');
const validator = require('validator');


class Warehouse {
    constructor(app) {
        this.app = app;

        this.model = {
            productId: null,
            productType: null,
            quantity: null,
            goodsReceiptId: null,
            patchCode: null
        }
    }

    initWithObject(obj) {
        this.model.productId = _.get(obj, 'productId', null)
        this.model.productType = _.get(obj, 'productType', null)
        this.model.quantity = _.get(obj, 'quantity', null)
        this.model.goodsReceiptId = _.get(obj, 'goodsReceiptId', null)
        this.model.patchCode = _.get(obj, 'patchCode', null);
    }

    async validate(model, cb = {}) {
        let errors = [];

        const reg = /^\d+$/;

        // Validate productType
        const productTypes = ["Thuốc bvtv", "Phân bón", "Giống"];

        if (model.productType == null) {
            errors.push({
                message: 'Vui lòng nhập loại sản phẩm'
            });
        } else {
            if (productTypes.indexOf(model.productType) < 0) {
                errors.push({
                    message: 'Loại sản phẩm không tồn tại'
                });
            }
        }

        // Validate productId
        if (model.productId == null) {
            errors.push({
                message: 'Vui lòng nhập id sản phẩm'
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

        // Goods receipt validate
        if (model.goodsReceiptId == null) {
            errors.push({
                message: 'Vui lòng nhập id nhập kho của sản phẩm'
            });
        }

        // CHECK EXISTS IN DB
        // --> Check product exists
        if (model.productId != null) {
            let productCollection = null;

            if (!mongodb.ObjectID.isValid(model.productId)) {
                errors.push({
                    message: 'Id sản phẩm không hợp lệ'
                });
            } else if (productTypes.indexOf(model.productType) >= 0) {
                if (productTypes.indexOf(model.productType) == 0) {
                    productCollection = this.app.db.collection('plantProtectionProduct')
                }

                if (productTypes.indexOf(model.productType) == 1) {
                    productCollection = this.app.db.collection('fertilizer');
                }

                // Check db giong lua
            }

            if (productCollection != null) {
                try {
                    const product = await productCollection.findOne({ _id: mongodb.ObjectID(model.productId) });

                    if (!product) {
                        errors.push({
                            message: 'Sản phẩm không tồn tại trong danh mục'
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }

        // --> Check goods receipt exists in DB
        if (model.goodsReceiptId != null) {
            if (!mongodb.ObjectID.isValid(model.goodsReceiptId)) {
                errors.push({
                    message: 'Id hóa đơn nhập không hợp lệ'
                });
            } else {
                try {
                    const GoodsReceipt = this.app.db.collection('goodsReceipts');

                    const goodsReceipt = await GoodsReceipt.findOne({ _id: mongodb.ObjectID(model.goodsReceiptId) });

                    if (!goodsReceipt) {
                        errors.push({
                            message: 'Hóa đơn nhập không tồn tại'
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }


        return cb(errors);
    }

    create(body, cb = () => { }) {
        const Warehouse = this.app.db.collection('warehouses');

        // Create new warehouse document with req body
        this.initWithObject(body);

        let model = this.model;

        this.validate(model, (errors) => {
            let messages = [];

            if (errors.length > 0) {
                _.each(errors, (err) => {
                    messages.push(err.message);
                });

                return cb(_.join(messages, ', '), null);

            } else {
                Warehouse.insertOne(model, (err, res) => {
                    if (err) {
                        return cb(err, null);
                    }

                    return cb(null, res.ops[0]);
                });
            }
        });
    }

    async find(query, cb = () => { }) {
        const Warehouse = this.app.db.collection('warehouses');

        const pageNumber = query.pageNumber;
        const nPerPage = query.nPerPage;

        delete query.pageNumber;
        delete query.nPerPage;

        let responseToClient = {};

        Warehouse.find().count()
            .then(count => {
                const totalPages = ((count - (count % nPerPage)) / nPerPage) + 1;

                responseToClient["totalSubcontractors"] = count;

                responseToClient["totalPages"] = totalPages;

                return Warehouse
                    .find(query)
                    .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                    .limit(Number(nPerPage))
                    .toArray();

            }).then(warehouses => {
                let length = warehouses.length;

                if (length == 0) {
                    const message = 'Trang tìm kiếm không tồn tại';
                    return cb(message, null);
                }

                responseToClient["data"] = warehouses;

                return cb(null, responseToClient);

            }).catch(err => {
                return cb(err, null);
            });
    }


    async findById(id, cb = () => { }) {
        try {
            const Warehouse = this.app.db.collection('warehouses');

            if (!mongodb.ObjectID.isValid(id)) {
                console.log("ok");
                const message = {
                    errorMessage: 'Id không hợp lệ',
                    code: 500
                }

                return cb(message, null);
            }

            const warehouse = await Warehouse.findOne({ _id: mongodb.ObjectID(id) });

            if (!warehouse) {
                const message = {
                    errorMessage: "Document không tồn tại",
                    code: 404
                }
                return cb(message, null);
            }

            return cb(null, warehouse);

        } catch (err) {
            return cb(err, null);
        }
    }

    deleteById(id, cb = () => { }) {
        const Warehouse = this.app.db.collection('warehouses');

        this.findById(id, async (err, res) => {
            if (err) {
                return cb(err, null);
            }

            try {
                const warehouse = await Warehouse.deleteOne({ _id: mongodb.ObjectID(id) });
                const message = {
                    successMessage: "Document kho được xóa thành công"
                }
                return cb(null, message);

            } catch (err) {
                return cb({ errorMessage: err, code: 500 }, null);
            }

        });
    }

    async updateById(id, update, cb = () => { }) {
        this.findById(id, (err, res) => {
            if (err) {
                return cb(err, null);

            } else {
                this.initWithObject(res);
                let model = this.model;

                // Update model
                if (update._id) {
                    delete update._id;
                }
                for (let key in update) {
                    if (key in model) {
                        model[key] = update[key];
                    }
                }

                // Validate
                this.validate(model, async (errors) => {
                    let messages = [];

                    if (errors.length > 0) {
                        _.each(errors, (err) => {
                            messages.push(err.message);
                        });

                        return cb({ errorMessage: _.join(messages, ', '), code: 409 }, null);

                    } else {
                        // Update to database
                        try {
                            const Warehouse = this.app.db.collection('warehouses');
                            const warehouse = await Warehouse.update({ _id: mongodb.ObjectID(id) }, model);

                            this.findById(id, (err, res) => {
                                return cb(null, res);
                            });

                        } catch (err) {
                            return cb({ errorMessage: "Lỗi trong quá trình cập nhật", code: 500 }, null);
                        }
                    }
                });
            }
        });
    }
}


module.exports = Warehouse;
