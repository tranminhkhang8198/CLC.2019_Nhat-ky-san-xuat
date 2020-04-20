const verifyUser = (req, resource, res, next) => {
    //Verify token
    let token = req.get("authorization");
    if (!token) {
        token = req.query.token;
    }
    if (!token) {
        return cb(
            {
                errorMessage: "Không tìm thấy token trên request"
            },
            null
        );
    }

    app.models.token.verify(token, (err, result) => {
        if (err) {
            return cb(
                {
                    errorMessage: "Token không hợp lệ"
                },
                null
            );
        } else {

            // Check permission
            app.models.permission.check(
                result._id,
                resource,
                req.method,
                (err, permission) => {
                    if (err) {
                        return cb(
                            {
                                errorMessage:
                                    "Lỗi trong quá trình kiểm tra quyền truy cập",
                                errorCode: 501
                            },
                            null
                        );
                    } else {
                        if (permission) {
                            return cb(null, permission);
                        } else {
                            return cb(
                                {
                                    errorMessage:
                                        "Bạn không có quyền truy cập vào tài nguyên này",
                                    errorCode: 401
                                },
                                null
                            );
                        }
                    }
                }
            );
        }
    });
};

module.exports.verifyUser = verifyUser;