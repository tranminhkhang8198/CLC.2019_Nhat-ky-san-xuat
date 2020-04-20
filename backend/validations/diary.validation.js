const _ = require('lodash');
module.exports.validateBeforeInsert = async (req, res, next) => {
    try {
        const {
            body,
            query,
        } = req;

        const validations = {

        }
        return next();
    } catch (error) {
        next(error);
    }
}