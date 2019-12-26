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
        this.model.productType = _.get(obj, 'productType', null);
        this.model.quantity = _.get(obj, 'quantity', null);
        this.model.tradeDate = _.get(obj, 'tradeDate', null);
        this.model.goodsReceiptId = _.get(obj, 'goodsReceiptId', null);
        this.model.cooperativeId = _.get(obj, 'cooperativeId', null);
        this.model.note = _.get(obj, 'note', null);
    }

    async validate(model, cb = {}) {
        let errors = [];

        const reg = /^\d+$/;

        let check = 0;

        // Validate productType
        const productTypes = ["Thuốc bvtv", "Phân bón", "Giống"];

        if (model.productType == null) {
            console.log("Something here");
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

        // Validate receiverID        
        if (model.receiverId == null) {
            errors.push({
                message: 'Vui lòng nhập id người nhận'
            })
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

        // Trade date validate
        if (model.tradeDate != null) {
            if (!validator.isISO8601(model.tradeDate)) {
                errors.push({
                    message: 'Ngày xuất kho không hợp lệ'
                });
            }
        }

        // Cooperative Id Validate
        if (model.cooperativeId == null) {
            errors.push({
                message: 'Vui lòng nhập id họp tác xã'
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

            if (productTypes.indexOf(model.productType) >= 0) {
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
                    const product = await productCollection.findOne({ _id: mongoose.Types.ObjectId(model.productId) });

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

        // --> Check HTX exists in db
        if (model.cooperativeId != null) {
            try {
                const cooperativeCollection = this.app.db.collection('cooperatives');

                const cooperative = await cooperativeCollection.findOne({ cooperativeID: model.cooperativeId });

                if (!cooperative) {
                    errors.push({
                        message: 'Hợp tác xã không tồn tại'
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }

        // --> Check goods receipt exists in DB


        // --> Check receiver exists in DB
        if (model.receiverId != null) {
            try {
                const userCollection = this.app.db.collection('user');
                const user = await userCollection.findOne({ _id: mongoose.Types.ObjectId(model.receiverId) });

                if (!user) {
                    errors.push({
                        message: 'Người nhận không tồn tại'
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }

        return cb(errors);
    }

    create(body, cb = () => { }) {
        const goodsIssue = this.app.db.collection('goodsIssues');

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

    async find(query, cb = () => { }) {
        const goodsIssue = this.app.db.collection('goodsIssues');
        const productTypes = ["Thuốc bvtv", "Phân bón", "Giống"];


        const pageNumber = query.pageNumber;
        const nPerPage = query.nPerPage;

        delete query.pageNumber;
        delete query.nPerPage;

        let responseToClient = {};

        goodsIssue.find().count()
            .then(count => {
                const totalPages = ((count - (count % nPerPage)) / nPerPage) + 1;

                responseToClient["totalGoodsIssues"] = count;

                responseToClient["totalPages"] = totalPages;

                return goodsIssue
                    .find(query)
                    .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                    .limit(Number(nPerPage))
                    .toArray();

            }).then(goodsIssues => {
                let count = 0;
                let length = goodsIssues.length;

                if (length == 0) {
                    const message = 'Trang tìm kiếm không tồn tại';
                    return cb(message, null);
                }


                goodsIssues.forEach(async (elem) => {
                    try {
                        // Get product collection
                        let productCollection = null;

                        if (productTypes.indexOf(elem.productType) >= 0) {
                            if (productTypes.indexOf(elem.productType) == 0) {
                                productCollection = this.app.db.collection('plantProtectionProduct')
                            }

                            if (productTypes.indexOf(elem.productType) == 1) {
                                productCollection = this.app.db.collection('fertilizer');
                            }

                            // Check db giong lua
                        }

                        // Get Product Name
                        const product = await productCollection.findOne({ _id: mongoose.Types.ObjectId(elem.productId) });
                        elem["productName"] = product.name;

                        // Get Receiver Name
                        const userCollection = this.app.db.collection('user');

                        const user = await userCollection.findOne({ _id: mongoose.Types.ObjectId(elem.receiverId) });
                        elem["receiverName"] = user.name;

                        if (!responseToClient['data']) {
                            responseToClient['data'] = [];
                        }
                        responseToClient['data'].push(elem);

                        // Trigger To Return Response
                        count = count + 1;
                        if (count == length) {
                            return cb(null, responseToClient);
                        }
                    } catch (err) {
                        return cb(err, null);
                    }
                });
            }).catch(err => {
                return cb(err, null);
            });
    }

    async findById(id, cb = () => { }) {
        try {
            const goodsIssueCollection = this.app.db.collection('goodsIssues');

            const goodsIssue = await goodsIssueCollection.findOne({ _id: mongoose.Types.ObjectId(id) });

            if (!goodsIssue) {
                const message = "Hóa đơn xuất kho không tồn tại"
                return cb(message, null);
            }

            return cb(null, goodsIssue);

        } catch (err) {
            return cb(err, null);
        }
    }

    async deleteById(id, cb = () => { }) {
        try {
            const goodsIssueCollection = this.app.db.collection('goodsIssues');

            const goodsIssue = await goodsIssueCollection.findOne({ _id: mongoose.Types.ObjectId(id) });

            if (!goodsIssue) {
                const message = "Hóa đơn xuất kho không tồn tại"
                return cb(message, null);
            } else {
                const goodsIssue = await goodsIssueCollection.deleteOne({ _id: mongoose.Types.ObjectId(id) });

                const message = {
                    successMessage: "Hóa đơn được xóa thành công"
                }
                return cb(null, message);
            }
        } catch (err) {
            return cb(err, null);
        }
    }

}

module.exports = GoodsIssue;