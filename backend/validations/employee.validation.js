const httpStatus = require('http-status');
const _ = require('lodash');
module.exports.validateBeforeUpdate = async (req, res, next) => {
    try {
        const {
            params,
            body
        } = req;
        const validations = {
            name: {
                errorMessage: [
                    'Name must be string',
                    'Name must not contain numbers or symbols',
                ],
                doValidate: () => {
                    const name = _.get(body, 'name', null);
                    const withoutSymbolsAndNumbers = /[^a-zA-Z]\s\d/igm
                    if (name === null) {
                        return -1;
                    }
                    if (typeof name !== 'string' && !(name instanceof String)) {
                        return 0;
                    }
                    if (withoutSymbolsAndNumbers.test(name)) {
                        return 1
                    }
                    return -1;
                }
            },
            personalId: {
                errorMessage: [

                ],
                doValidate: () => {
                    const personalId = _.get(body, 'personalId', null);
                    if (personalId === null) {
                        return -1;
                    }
                    return -1;
                }
            }
        }

        const errors = [];
        _.each(validations, (validation) => {
            const isError = validation.doValidate();
            if (isError !== -1) {
                errors.push(validation.errorMessage[isError]);
            }
        });
        if (errors.length > 0) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY)
                .json({
                    code: httpStatus.UNPROCESSABLE_ENTITY,
                    message: 'responseMessage'
                })
                .end();
        }
        return next();
    } catch (error) {
        next(error);
    }
}