const httpStatus = require('http-status');

module.exports.testController = async (req, res, next) => {
    try {
        const body = req.body;
        const {
            name,
        } = body;
        const testObj = {
            name: name,
        }
        const {
            models,
        } = req.app;
        const result = await models.test.postNewTest(testObj);
        if (result.length <= 0) {
            return res, status(httpStatus.NOT_FOUND)
                .json({
                    conde: httpStatus.NOT_FOUND,
                    message: 'test is not found',
                })
        }
        return res.status(httpStatus.OK)
            .json({
                code: httpStatus.OK,
                message: 'Insert successfully',
                result: result,
            })


    } catch (error) {
        next(error)
    }

}