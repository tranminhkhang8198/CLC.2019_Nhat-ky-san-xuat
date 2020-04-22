const Joi = require("@hapi/joi");
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const joiSchema = {
    post: Joi.object({
        name: Joi.string().required().messages({
            "string.base": "Tên tác vụ, công việc phải là text.",
            "any.required": "Vui lòng nhập tên tác vụ, sự kiện",
        }),
        startDate: Joi.date().iso().messages({
            "date.format": "Ngày bắt đầu công việc không hợp lệ.",
        }),
        endDate: Joi.date().iso().messages({
            "date.format": "Ngày kết thúc công việc không hợp lệ.",
        }),
        type: Joi.string()
            .required()
            .valid("Bón Phân", "Phun Thuốc", "Nước", "CV khác")
            .messages({
                "any.only": `Loại công việc phải là một trong bốn loại "Bón Phân", "Phun Thuốc", "Nước", "CV khác".`,
                "any.required": "Vui lòng nhập loại công việc.",
            }),
        note: Joi.string(),
        diaryId: Joi.required().messages({
            "any.required": "Vui lòng nhập id nhật ký chung của vụ mùa.",
        }),
    }),

};

module.exports.validateCreateInput = async (req, res, next) => {
    const errors = [];
    
    const diaryId = _.get(req.body, 'diaryId', '');
    const farmerId = _.get(req.body, 'farmerId', '');
    const cropTasks = _.get(req.body, 'cropTasks', '');

    if (!ObjectID.isValid(diaryId)) {
        errors.push({
            field: 'diaryId',
            location: 'body',
            message: 'Invalid diaryId',
        });
    }

    cropTasks.forEach(item => {
        if (!ObjectID.isValid(item._id)) {
            errors.push({
                field: 'cropTask._id',
                location: 'body',
                message: 'Invalid cropTaskId',
            });
        }

        const fieldsId = _.get(item, 'fieldsId', []);
        fieldsId.forEach(fieldId => {
            if (!ObjectID.isValid(fieldId)) {
                errors.push({
                    field: 'cropTask.fieldId',
                    location: 'body',
                    message: 'Invalid fieldId',
                });
            }
        })
    })

    if (!ObjectID.isValid(farmerId)) {
        errors.push({
            field: 'farmerId',
            location: 'body',
            message: 'Invalid farmerId',
        });
    }

    cropTasks.forEach(item => {

    })

    if (errors.length) {
        return res.status(422).json({
            errors,
            message: 'Error validating',
        }).next();
    }

    return next();
}