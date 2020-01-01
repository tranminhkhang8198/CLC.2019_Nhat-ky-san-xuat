const _ = require('lodash');
const mongodb = require('mongodb');

class Tool {
    constructor(app) {
        this.app = app;

        this.model = {
            type: null,
            quantity: null,
            receiverId: null,
            receivedDate: null,
            returnedDate: null,
            note: null
        }
    }

    initWithObject(obj) {
        this.model.type = _.get(obj, 'type', null);
        this.model.quantity = _.get(obj, 'quantity', null);
        this.model.receiverId = _.get(obj, 'receiverId', null);
        this.model.receivedDate = _.get(obj, 'receivedDate', null);
        this.model.returnedDate = _.get(obj, 'returnedDate', null);
        this.model.note = _.get(obj, 'note', null);
    }

    async validate(model, cb = () => { }) {
        let errors = [];

        const reg = /^\d+$/;

        // Validate type
        if (model.type == null) {
            errors.push({
                message: 'Vui lòng nhập loại công cụ, dụng cụ'
            });
        }

        // Validate receiverId        
        if (model.receiverId == null) {
            errors.push({
                message: 'Vui lòng nhập id người nhận'
            })
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

        // Received date validate
        if (model.receivedDate != null) {
            if (!validator.isISO8601(model.receivedDate)) {
                errors.push({
                    message: 'Ngày nhận không hợp lệ'
                });
            }
        }

        // Returned date validate
        if (model.returnedDate != null) {
            if (!validator.isISO8601(model.returnedDate)) {
                errors.push({
                    message: 'Ngày trả không hợp lệ'
                });
            }
        }

        // --> Check receiver exists in DB
        if (model.receiverId != null) {
            if (!mongodb.ObjectID.isValid(model.receiverId)) {
                errors.push({
                    message: 'Id người nhận không hợp lệ'
                });
            } else {
                try {
                    const User = this.app.db.collection('user');
                    const user = await User.findOne({ _id: mongodb.ObjectID(model.receiverId) });

                    if (!user) {
                        errors.push({
                            message: 'Người nhận không tồn tại'
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
        const Tool = this.app.db.collection('tools');

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
                Tool.insertOne(model)
                    .then(tool => {
                        return cb(null, tool.ops[0]);
                    })
                    .catch(err => {
                        return cb(err, null);
                    });
            }
        });
    }

    async find(query, cb = () => { }) {
        const Tool = this.app.db.collection('tools');

        const pageNumber = query.pageNumber;
        const nPerPage = query.nPerPage;

        delete query.pageNumber;
        delete query.nPerPage;

        let responseToClient = {};

        Tool.find().count()
            .then(count => {
                const totalPages = ((count - (count % nPerPage)) / nPerPage) + 1;

                responseToClient["totalTools"] = count;

                responseToClient["totalPages"] = totalPages;

                return Tool
                    .find(query)
                    .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                    .limit(Number(nPerPage))
                    .toArray();

            }).then(tools => {
                let count = 0;
                let length = tools.length;

                if (length == 0) {
                    const message = 'Trang tìm kiếm không tồn tại';
                    return cb(message, null);
                }


                tools.forEach(async (elem) => {
                    try {
                        // Get Receiver Name
                        const User = this.app.db.collection('user');

                        const user = await User.findOne({ _id: mongodb.ObjectID(elem.receiverId) });
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
            const Tool = this.app.db.collection('tools');

            if (!mongodb.ObjectID.isValid(id)) {
                const message = {
                    errorMessage: 'Id không hợp lệ',
                    code: 500
                }

                return cb(message, null);
            }

            const tool = await Tool.findOne({ _id: mongodb.ObjectID(id) });

            if (!tool) {
                const message = {
                    errorMessage: "Document không tồn tại",
                    code: 404
                }
                return cb(message, null);
            }

            return cb(null, tool);

        } catch (err) {
            return cb(err, null);
        }
    }

    deleteById(id, cb = () => { }) {
        const Tool = this.app.db.collection('tools');

        this.findById(id, async (err, res) => {
            if (err) {
                return cb(err, null);
            }

            try {
                const tool = await Tool.deleteOne({ _id: mongodb.ObjectID(id) });
                const message = {
                    successMessage: "Document quản lý công cụ, dụng cụ được xóa thành công"
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
                            const Tool = this.app.db.collection('tools');
                            const tool = await Tool.update({ _id: mongodb.ObjectID(id) }, model);

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

module.exports = Tool;