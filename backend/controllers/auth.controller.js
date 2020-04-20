const httpStatus = require('http-status');
const { ObjectID } = require('mongodb');

function getAccessResource(path) {
    const pathArr = path.split("/")
    const apiIdx = _.indexOf(pathArr, 'api');
    return pathArr[apiIdx + 1];
}

module.exports.ensureManager = async (req, res, next) => {
    try {
        let accessToken = req.get("authorization");
        if (!accessToken) {
            accessToken = req.query.token;
        }
        if (!accessToken) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY)
                .json({
                    code: httpStatus.UNPROCESSABLE_ENTITY,
                    message: "Can't find token from request",
                })
                .end();
        }
        const {
            token,
            user,
        } = req.app.models;
        const {
            coopID,
            empID,
        } = req.params;

        const payload = await token.verify(accessToken);
        const currentUser = await user.getByID(new ObjectID(payload._id), { password: 0 });
        if (currentUser.user !== 'manager' || currentUser.HTXId.toString() !== coopID) {
            return res.status(httpStatus.UNAUTHORIZED)
                .json({
                    code: httpStatus.UNAUTHORIZED,
                    message: 'Unauthorized',
                })
                .end();
        }

        req.user = currentUser;
        return next();
    } catch (error) {
        next(error);
    }
}

module.exports.ensureAdmin = async (req, res, next) => {
    try {
        let accessToken = req.get("authorization");
        if (!accessToken) {
            accessToken = req.query.token;
        }
        if (!accessToken) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY)
                .json({
                    code: httpStatus.UNPROCESSABLE_ENTITY,
                    message: "Can't find token from request",
                })
                .end();
        }
        const {
            token,
            user,
        } = req.app.models;
        const {
            coopID,
            empID,
        } = req.params;

        const payload = await token.verify(accessToken);
        const currentUser = await user.getByID(new ObjectID(payload._id), { password: 0 });
        if (currentUser.user !== 'administrator') {
            return res.status(httpStatus.UNAUTHORIZED)
                .json({
                    code: httpStatus.UNAUTHORIZED,
                    message: 'Unauthorized',
                })
                .end();
        }

        req.user = currentUser;
        return next();

    } catch (error) {
        next(error);
    }
}