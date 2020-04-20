const httpStatus = require('http-status');
const _ = require('lodash');

module.exports.validateRiceInput = (req, res, next) => {
    const code = _.get(req.body, 'code', '');
    const name = _.get(req.body, 'name', '');

    if (!code) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
            message: 'code field is required',
            code: httpStatus.UNPROCESSABLE_ENTITY,
        })
    }

    if (!name) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
            message: 'name field is required',
            code: httpStatus.UNPROCESSABLE_ENTITY,
        })
    }

    return next();
};
