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
            goodsReceipt: null,
            patchCode: null
        }
    }

    initWithObject(obj) {
        this.model.productId = _.get(obj, 'productId', null)
        this.model.productType = _.get(obj, 'productType', null)
        this.model.quantity = _.get(obj, 'quantity', null)
        this.model.goodsReceiptId = _.get(obj, 'goodsReceiptId', null)
    }

    create(body, cb = () => { }) {
        const Warehouse = this.app.db.collection('warehouses');

        // Create new warehouse document with req body
        this.initWithObject(body);

        let model = this.model;

        console.log(model);

        Warehouse.insertOne(model, (err, res) => {
            if (err) {
                return cb(err, null);
            }

            return cb(null, res.ops[0]);
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
}


module.exports = Warehouse;
