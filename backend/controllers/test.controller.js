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