const _ = require('lodash');
const mongodb = require('mongodb');
const validator = require('validator');

class Subcontractor {
    constructor(app) {
        this.app = app;

        this.model = {
            name: null,
            serviceProvided: null,
            hiredDate: null,
            cost: null,
            quantityEmployee: null,
            note: null
        }
    }

    initWithObject(obj) {
        this.model.name = _.get(obj, 'name', null);
        this.model.serviceProvided = _.get(obj, 'serviceProvided', null);
        this.model.hiredDate = _.get(obj, 'hiredDate', null);
        this.model.cost = _.get(obj, 'cost', null);
        this.model.quantityEmployee = _.get(obj, 'quantityEmployee', null);
        this.model.note = _.get(obj, 'note', null);
    }

    async validate(model, cb = () => { }) {
        let errors = [];

        const reg = /^\d+$/;

        // Validate name
        if (model.name == null) {
            errors.push({
                message: 'Vui lòng nhập tên nhà thầu phụ'
            });
        }

        // Validate service provided 
        if (model.serviceProvided == null) {
            errors.push({
                message: 'Vui lòng nhập dịch vụ cung cấp'
            })
        }

        // Hired date validate
        if (model.hiredDate != null) {
            if (!validator.isISO8601(model.hiredDate)) {
                errors.push({
                    message: 'Ngày thuê không hợp lệ'
                });
            }
        }

        // Cost Validate
        if (!validator.isDecimal(model.cost) || (model.cost < 0)) {
            errors.push({
                message: 'Tiền thuê phải là số dương'
            });
        }

        // Cost Validate
        if (!reg.test(model.quantityEmployee)) {
            errors.push({
                message: 'Số lượng lao động tham gia phải là số nguyên dương'
            });
        }

        return cb(errors);
    }

    create(body, cb = () => { }) {
        const Subcontractor = this.app.db.collection('subcontractors');

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
                Subcontractor.insertOne(model)
                    .then(subcontractor => {
                        return cb(null, subcontractor.ops[0]);
                    })
                    .catch(err => {
                        return cb(err, null);
                    });
            }
        });
    }

    async find(query, cb = () => { }) {
        const Subcontractor = this.app.db.collection('subcontractors');

        const pageNumber = query.pageNumber;
        const nPerPage = query.nPerPage;

        delete query.pageNumber;
        delete query.nPerPage;

        let responseToClient = {};

        Subcontractor.find().count()
            .then(count => {
                const totalPages = ((count - (count % nPerPage)) / nPerPage) + 1;

                responseToClient["totalSubcontractors"] = count;

                responseToClient["totalPages"] = totalPages;

                return Subcontractor
                    .find(query)
                    .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                    .limit(Number(nPerPage))
                    .toArray();

            }).then(subcontractors => {
                let count = 0;
                let length = subcontractors.length;

                if (length == 0) {
                    const message = 'Trang tìm kiếm không tồn tại';
                    return cb(message, null);
                }

                responseToClient["data"] = subcontractors;

                return cb(null, responseToClient);

            }).catch(err => {
                return cb(err, null);
            });
    }

    async findById(id, cb = () => { }) {
        try {
            const Subcontractor = this.app.db.collection('subcontractors');

            if (!mongodb.ObjectID.isValid(id)) {
                const message = {
                    errorMessage: 'Id không hợp lệ',
                    code: 500
                }

                return cb(message, null);
            }

            const subcontractor = await Subcontractor.findOne({ _id: mongodb.ObjectID(id) });

            if (!subcontractor) {
                const message = {
                    errorMessage: "Document không tồn tại",
                    code: 404
                }
                return cb(message, null);
            }

            return cb(null, subcontractor);

        } catch (err) {
            return cb(err, null);
        }
    }

    deleteById(id, cb = () => { }) {
        const Subcontractor = this.app.db.collection('subcontractors');

        this.findById(id, async (err, res) => {
            if (err) {
                return cb(err, null);
            }

            try {
                const subcontractor = await Subcontractor.deleteOne({ _id: mongodb.ObjectID(id) });
                const message = {
                    successMessage: "Document nhà thầu phụ được xóa thành công"
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
                            const Subcontractor = this.app.db.collection('subcontractors');
                            const subcontractor = await Subcontractor.update({ _id: mongodb.ObjectID(id) }, model);

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

module.exports = Subcontractor;