const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');

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

        // --> Check receiver exists in DB
        if (model.receiverId != null) {
            try {
                const User = this.app.db.collection('user');
                const user = await User.findOne({ _id: mongoose.Types.ObjectId(model.receiverId) });

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
}

module.exports = Tool;