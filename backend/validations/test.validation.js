module.exports.validateBeforeInsert = async (req, res, next) => {
    try {
        //do some validation

        next();

    } catch (error) {
        next(error);
    }
}