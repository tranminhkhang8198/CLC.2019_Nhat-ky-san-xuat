/**
 * Error Handle In Response
 * @param {request object} res
 * @param {string} errorMessage
 * @param {int} code
 * @returns {*|JSON|Promise<any>}
 */
module.exports.errorHandle = (res, errorMessage, code = 500) => {
    return res.status(code).json({
        errorMessage: errorMessage
    });
};

/**
 * Response Handle In Response
 * @param {*} res
 * @param {*} data
 * @param {*} code
 * @returns {*|JSON|Promise<any>}
 */
module.exports.responseHandle = (res, data, code = 200) => {
    return res.status(code).json(data);
};

