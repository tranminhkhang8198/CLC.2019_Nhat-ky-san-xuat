const { responseHandle, errorHandle } = require("./lastHandler");

module.exports.verifyUserV2 = (req, res, next) => {
    const resource = req.route.path.split("/")[2];
    const app = req.app;
    // console.log(route);
    // const resource = "cooperatives";
    //Verify token
    let token = req.get("authorization");
    if (!token) {
        token = req.query.token;
    }
    if (!token) {
        return errorHandle(res, "Không tìm thấy token", 404);
    }

    app.models.token.verify(token, (err, result) => {
        if (err) {
            return errorHandle(res, "Token Không hợp lệ", 404);
        } else {

            // Check permission
            app.models.permission.check(
                result._id,
                resource,
                req.method,
                (err, permission) => {
                    if (err) {
                        // console.log(err);
                        return errorHandle(res, err.errorMessage, err.errorCode);
                    } else {
                        if (permission) {
                            next();
                        } else {
                            return errorHandle(res, "Bạn không có quyền truy cập tài nguyên này", 405);
                        }
                    }
                }
            );
        }
    });
}



