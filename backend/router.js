const _ = require("lodash");
const upload = require("./models/multer");


exports.routers = app => {
    /**
     * @apiDefine set $set
     */

    /**
     * Error Handle In Response
     * @param {request object} res
     * @param {string} errorMessage
     * @param {int} code
     * @returns {*|JSON|Promise<any>}
     */
    const errorHandle = (res, errorMessage, code = 500) => {
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
    const responseHandle = (res, data, code = 200) => {
        return res.status(code).json(data);
    };

    /**
     *
     * @param {requset object} req
     * @param {string} resource
     * @param {callback function} cb
     * @returns {cb(err, permission<true|false>)}
     */
    const verifyUser = (req, resource, cb = () => { }) => {
        //Verify token
        let token = req.get("authorization");
        if (!token) {
            token = req.query.token;
        }
        if (!token) {
            return cb(
                {
                    errorMessage: "Access denied"
                },
                null
            );
        }

        app.models.token.verify(token, (err, result) => {
            if (err) {
                return cb(
                    {
                        errorMessage: "Loi xac dinh token"
                    },
                    null
                );
            } else {
                // Check permission
                app.models.permission.checkPermission(
                    result._id,
                    resource,
                    req.method,
                    (err, permission) => {
                        if (err) {
                            return cb(
                                {
                                    errorMessage:
                                        "Loi trong qua trinh kiem tra quyen truy cap"
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
                                            "Ban khong co quyen truy cap vao tai nguyen nay"
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

    /**
     * @method GET
     * @endpoint /
     * @description Root api
     *
     */
    app.get("/", (req, res) => {
        return res.json({
            version: "1.0"
        });
    });

    /**
     * @api {post} /users Create new user
     * @apiVersion 0.1.0
     * @apiName CreateUser
     * @apiGroup User
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/users
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} name Ten nguoi su dung
     * @apiParam {File} avatar Ảnh đại diện của user.
     * @apiParam {String} personalId So CMND cua nguoi su dung
     * @apiParam {String} address Địa chỉ cua nguoi su dung
     * @apiParam {String} phone So dien thoai cua nguoi su dung
     * @apiParam {String} email Địa chỉ email cua nguoi su dung
     * @apiParam {String} user Chuc vu cua nguoi su dung
     * @apiParam {String} HTXId ID cua hop tac xa
     * @apiParam {String} password Mat khau cua nguoi su dung
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       "name": "Nguyen Van Loi",
     *       "avatar": file,
     *       "personalId":"384736273",
     *       "address": "Ninh Kieu, Can Tho",
     *       "phone": "093827463",
     *       "email": "admin@gmail.com",
     *       "user": "user",
     *       "HTXId": "dowidnfjd",
     *       "password": "123456"
     *     }
     *
     * @apiSuccess {String} name Ten nguoi su dung
     * @apiSuccess {String} avatar Ten file avatar
     * @apiSuccess {String} personalId So CMND cua nguoi su dung
     * @apiSuccess {String} phone So dien thoai cua nguoi su dung
     * @apiSuccess {String} email Địa chỉ email cua nguoi su dung
     * @apiSuccess {String} user Chuc vu cua nguoi su dung
     * @apiSuccess {String} HTXId ID cua hop tac xa
     * @apiSuccess {String} created Thoi gian nguoi dung duoc tao
     * @apiSuccess {String} _id ID cua nguoi su dung
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "name": "Nguyen Quang Khai",
     *      "avatar": "http://localhost:3003/image-1576222546040.png",
     *      "personalId": "381823821",
     *      "address": "14/132, 3/2 street, Ninh Kieu, Can Tho",
     *      "email": "vanloi10c@gmail.com",
     *      "user": "user",
     *      "HTXId": "115",
     *      "created": "2019-11-12T12:13:24.216Z",
     *      "_id": "5dcaa1e4e363dc1df58f0317"
     *  }
     *
     * @apiError Name-is-required Thieu truong ten nguoi dung
     * @apiError Personal-id-is-invalid So CMND sai
     * @apiError Phone-number-already-exist Nguoi dung da ton tai trong CSDL
     * @apiError Phone-number-is-reqired Thieu SDT
     * @apiError Passsword-is-required-and-more-than-3-characters Khong co ma khau hoac mat khau qua ngan
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Phone number already exist"
     *     }
     * @apiPermission none
     */
    app.post("/api/users/", upload.single('avatar'), (req, res, next) => {
        let avatar = "http://localhost:3003/default.png"
        if (req.file) {
            avatar = "http://localhost:3003/" + req.file.filename;
        }
        const body = req.body;
        _.set(body, 'avatar', avatar);
        const resource = "user";
        verifyUser(req, resource, (err, result) => {
            if (err) {
                _.unset(body, "user");
                app.models.user.create(body, (err, info) => {
                    console.log(info);
                    return err
                        ? errorHandle(res, err, 503)
                        : responseHandle(res, info);
                });
            } else {
                app.models.user.create(body, (err, info) => {
                    console.log(info);
                    return err
                        ? errorHandle(res, err, 503)
                        : responseHandle(res, info);
                });
            }
        });
    });

    app.post('/upload', upload.single('avatar'), (req, res, next) => {
        console.log(req.file);
        if (!req.file) {
            res.status(500);
            return next(err);
        }
        res.json({ fileUrl: 'http://192.168.0.7:3001/images/' + req.file.filename });
    })

    /**
     * @api {post} /login Login user
     * @apiVersion 0.1.0
     * @apiName LoginUser
     * @apiGroup User
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/login
     *
     *
     * @apiParam {String} phone So dien thoai cua nguoi su dung
     * @apiParam {String} password Mat khau cua nguoi su dung
     * @apiParamExample {json} Request-Example:
     *     {
     *       "phone": "0847362182",
     *       "password":"123456"
     *     }
     *
     * @apiSuccess {String} _id ID token
     * @apiSuccess {String} created Ngay login
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e
     *          yJfaWQiOiI1ZGQ2YTVjMWEwYWJkYTcwZmQ2YmZjYzkiLCJuYW
     *          1lIjoiTmd1eWVuIHZhbiBsb2kiLCJwZXJzb25hbElkIjoiNDc
     *          zNzI2MzcyMiIsImFkZHJlc3MiOiIiLCJwaG9uZSI6IjA4NDcz
     *          ODE5MjIxIiwiZW1haWwiOiJsb2lAZ21haWwuY29tIiwidXNlci
     *          I6InVzZXIiLCJIVFhJZCI6bnVsbCwicGFzc3dvcmQiOiIkMmI
     *          kMTAkVE51bm1UR3poV2FhLjZtOUtSU1Z3LnBTU2JHT284RHZC
     *          b3JZZFdZMWJXUmZXQnNiZ1BhTlMiLCJjcmVhdGVkIjoiMjAxO
     *          S0xMS0yMVQxNDo1NzowNS4yMDBaIiwiaWF0IjoxNTc0MzQ4Mj
     *          g5LCJleHAiOjE1NzQzNDgzNDl9.JeuNFsCBVC30Glz5YsBTb3
     *          GzaqwdTfApwrLYIKxWrMU",
     *          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX
     *          VCJ9.eyJfaWQiOiI1ZGQ2YTVjMWEwYWJkYTcwZmQ2YmZjYzki
     *          LCJuYW1lIjoiTmd1eWVuIHZhbiBsb2kiLCJwZXJzb25hbElkI
     *          joiNDczNzI2MzcyMiIsImFkZHJlc3MiOiIiLCJwaG9uZSI6Ij
     *          A4NDczODE5MjIxIiwiZW1haWwiOiJsb2lAZ21haWwuY29tIiw
     *          idXNlciI6InVzZXIiLCJIVFhJZCI6bnVsbCwicGFzc3dvcmQi
     *          OiIkMmIkMTAkVE51bm1UR3poV2FhLjZtOUtSU1Z3LnBTU2JHT
     *          284RHZCb3JZZFdZMWJXUmZXQnNiZ1BhTlMiLCJjcmVhdGVkIj
     *          oiMjAxOS0xMS0yMVQxNDo1NzowNS4yMDBaIiwiaWF0IjoxNTc
     *          0MzQ4Mjg5LCJleHAiOjE1NzQzNDg0MDl9.VZKH4yNpTsH0Umi
     *          lLNUI45rtsA3QvuiRAy8UHRav__A"
     *      }
     *
     * @apiError Phone-and-password-are-required Thieu SDT hoac mat khau
     * @apiError User-is-not-found Khong tim thay nguoi su dung
     * @apiError Wrong-password Sai mat khau
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Password is wrong"
     *     }
     * @apiPermission none
     */
    app.post("/api/login", (req, res, next) => {
        const body = req.body;

        app.models.user.login(body, (err, result) => {
            return err
                ? errorHandle(res, err, 504)
                : responseHandle(res, result);
        });
    });



    app.delete("/api/token", (req, res, next) => {
        const { refreshToken } = req.body;
        if (refreshToken) {
            app.db.models.token.remove(refreshToken, (err, result) => {
                if (err) {
                    return errorHandle(res, "err.errorMessage", 403);
                } else {
                    return responseHandle(res, result);
                }
            });
        }
    });

    /**
     * @api {post} /refresh_token Xac thuc lay access token moi
     * @apiVersion 0.1.0
     * @apiName PostToken
     * @apiGroup Token
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/refresh_token
     *
     *
     * @apiParam {String} refresh_token refresh token cua nguoi dung
     * @apiParamExample {json} Request-Example:
     *     {
     *       "refresh_token": "fsfsdhfwrtwjf34yrwi4rjfweoifhefjwpuwfseo.oiehskdlwhwsfoiwdfsj3ljdnvkjdbfwoh"
     *     }
     *
     * @apiSuccess {String} refresh_token refresh token moi
     * @apiSuccess {String} token access token moi
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "refresh_token": "fsjdoiwukmvwafojf9wa4rrjirhfelkfsarwjijgerhggjh8reighoighergelrgsfhg",
     *      "token": "sdfhwefdfbnbvsuerisbcfuhriufbwfjbskfheiurhkjfiurtherwgfkjsdhfsg"
     *  }
     *
     * @apiError Verify-JWT-token-failed refresh token khong hop le
     * @apiError Request-without-refresh-token Khong tim thay refresh token tren request
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Request without refresh token"
     *     }
     * @apiPermission none
     */
    app.post("/api/refresh_token", (req, res, next) => {
        const { refreshToken } = req.body;
        if (refreshToken) {
            // Check refresh token
            app.models.token.refresh(refreshToken, (err, result) => {
                if (err) {
                    return errorHandle(res, "Verify JWT token falied", 403);
                } else {
                    return responseHandle(res, result);
                }
            });
        } else {
            return errorHandle(res, "Request without refresh token", 402);
        }
    });

    /**
     * @api {get} /users/me Get user info from token
     * @apiVersion 0.1.0
     * @apiName CheckToken
     * @apiGroup User
     *
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/users/me
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiSuccess {String} _id ID token
     * @apiSuccess {String} created Ngay tao token
     * @apiSuccess {Object} user Thong tin cua user
     * @apiSuccess {String} user._id ID cua user
     * @apiSuccess {String} user.name Ten cua user
     * @apiSuccess {String} user.personalId So CMND cua user
     * @apiSuccess {String} user.address Địa chỉ cua user
     * @apiSuccess {String} user.phone So dien thoai cua user
     * @apiSuccess {String} user.email Địa chỉ email cua user
     * @apiSuccess {String} user.user Loai nguoi dung
     * @apiSuccess {String} user.HTXId ID cua hop tac xa
     * @apiSuccess {String} user.created ngay tao account cua user
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "_id": "5dca9992d683f81b09183344",
     *      "created": "2019-11-12T11:37:54.687Z",
     *      "user": {
     *          "_id": "5dca995fd683f81b09183342",
     *          "name": "Nguyen Quang Khai",
     *          "personalId": "381823821",
     *          "address": "14/132, 3/2 street, Ninh Kieu, Can Tho",
     *          "phone": "0836810112",
     *          "email": "vanloi10c@gmail.com",
     *          "user": "manager",
     *          "HTXId": "115"
     *      },
     *          "created": "2019-11-12T11:37:03.461Z"
     *  }
     *
     * @apiError Access-dinied Token khong hop le
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "Access dinied"
     *     }
     * @apiPermission none
     */
    app.get("/api/users/me", (req, res, next) => {
        let tokenId = req.get("authorization");
        if (!tokenId) {
            tokenId = req.query.token;
        }

        if (!tokenId) {
            return errorHandle(res, "Request without token", 505);
        }

        app.models.token.verify(tokenId, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage, 401);
            } else {
                return responseHandle(res, result, 200);
            }
        });
    });

    /**
     * @api {get} /users/:userId Get user info from id
     * @apiVersion 0.1.0
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/users/all
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} userId User ID hoac gia tri "all" voi yeu cau tat ca user
     *
     * @apiSuccess {String} _id ID cua user
     * @apiSuccess {String} name Ten cua user
     * @apiSuccess {String} personalId So CMND cua user
     * @apiSuccess {String} address Địa chỉ cua user
     * @apiSuccess {String} phone So dien thoai cua user
     * @apiSuccess {String} email Địa chỉ email cua user
     * @apiSuccess {String} user Loai nguoi dung
     * @apiSuccess {String} HTXId ID cua hop tac xa
     * @apiSuccess {String} created ngay tao account cua user
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  [
     *      {
     *          "_id": "5dc7c9fbeae2ba2a92117f4c",
     *          "name": "Nguyen Van Loi",
     *          "personalId": "381823821",
     *          "address": "14/132, 3/2 street, Ninh Kieu, Can Tho",
     *          "phone": "0836810223",
     *          "email": "vanloi10c@gmail.com",
     *          "user": "user",
     *          "HTXId": "115",
     *          "password": "$2b$10$tLavRp8.KFIcD8Rk4BBn7eR1qtfzBJsM6kUcNEyB5N.fLfZldXPoi",
     *          "created": "2019-11-10T08:27:39.377Z"
     *      }
     *  ]
     *
     * @apiError Permission-denied Token khong hop le
     * @apiError User-ID-is-invalid User Id khong dung
     * @apiError Users-are-not-found Khong tim thay nguoi dung
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *     {
     *       "error": "Access denied"
     *     }
     *
     * @apiPermission manager-admin
     */
    app.get("/api/users/:userId", (req, res, next) => {
        const userId = req.params.userId;
        if (!userId || userId.length == 0) {
            return errorHandle(res, "User ID is invalid", 501);
        }
        const resource = "user";
        verifyUser(req, resource, (err, permission) => {
            if (err) {
                errorHandle(res, "Permission denied");
            } else {
                app.models.user.get(userId, (err, data) => {
                    return err
                        ? errorHandle(res, "Users are not found", 503)
                        : responseHandle(res, data);
                });
            }
        });
    });

    /**
     * @api {patch} /users Update users info
     * @apiVersion 0.1.0
     * @apiName PatchUsers
     * @apiGroup User
     *
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/users
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {Object} Query Bo Loc danh sach nguoi dung cho viec update
     * @apiParam {String} Query.Params Danh sach thuoc tinh cua bo loc. VD: name, _id, phone, address
     * @apiParam {Object} update Thong tin can update
     * @apiParam {Object} update.set Tap hop cac thuoc tinh can update
     * @apiParam {String} update.set.Params Danh sach thuoc tinh can update. VD: name, address, _id,...
     * @apiParamExample {json} Request-Example:
     *      {
     *          "query":{
     *              "name":"Nguyen Van Loi"
     *          },
     *          "update":{
     *              "$set":{
     *                  "HTXfdId": "116"
     *              }
     *          }
     *      }
     *
     * @apiSuccess {String} nModified So luong du lieu da cap nhat
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "nModified": "4"
     *  }
     *
     * @apiError Permission-denied Token khong hop le
     * @apiError User-id-is-invalid-in-query-block User Id khong hop le
     * @apiError Nothing-to-update Query sai hoac du lieu update da ton tai trong database
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *     {
     *       "error": "Nothing to update"
     *     }
     *
     * @apiPermission manager-admin
     */
    app.patch("/api/users", (req, res, next) => {
        const resource = "user";
        verifyUser(req, resource, (err, allow) => {
            if (err) {
                return errorHandle(res, "Access denied", 503);
            } else {
                // process task
                const body = req.body;
                app.models.user.update(body, (err, user) => {
                    return err
                        ? errorHandle(res, err.errorMessage)
                        : responseHandle(res, user);
                });
            }
        });
    });

    /**
     * @api {post} /roles Them phuong thuc moi
     * @apiVersion 0.1.0
     * @apiName PostRole
     * @apiGroup Role
     *
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/roles
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {char(1)} _id Ki hieu cua method
     * @apiParam {String} permission Ten method
     *
     * @apiParamExample {json} Request-Example:
     *      {
     *          "_id":"D",
     *          "permission":"DELETE"
     *      }
     *
     * @apiSuccess {String} _id ki hieu cua method
     * @apiSuccess {String} permission Ten method
     * @apiSuccess {String} created Ngay them vao database
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  [
     *      {
     *          "_id": "D",
     *          "permission": "DELETE",
     *          "created": "2019-11-14T07:10:50.507Z"
     *      }
     *  ]
     * @apiError Permission-denied Token khong hop le
     * @apiError error-creating-new-role Thong tin tao moi sai
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *     {
     *       "error": "error creating new role"
     *     }
     *
     * @apiPermission manager-admin
     */
    app.post("/api/roles", (req, res, next) => {
        const body = req.body;
        app.models.role.create(body, (err, role) => {
            return err
                ? errorHandle(res, err.errorMessage, 501)
                : responseHandle(res, role);
        });
    });

    /**
     * @api {post} /resources Them resource can quan ly quyen
     * @apiVersion 0.1.0
     * @apiName PostResource
     * @apiGroup Resource
     *
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/resources
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} name Ten resource can quan ly
     * @apiParam {Object} role Danh sach role cho nguoi dung
     * @apiParam {String} role.user Ki hieu quyen cho nguoi dung la user
     * @apiParam {String} role.manager Ki hieu quyen cho nguoi dung la manager
     * @apiParam {String} role.administrator Ki hieu quyen cho nguoi dung la administrator
     * @apiParamExample {json} Request-Example:
     *      {
     *          "name":"user",
     *          "role":{
     *              "user":"G",
     *              "manager":"GU",
     *              "administrator":"GUDP"
     *          }
     *      }
     *
     * @apiSuccess {String} name Ten resource da quan ly.
     * @apiSuccess {Object} role danh sach role doi voi tung loai nguoi dung.
     * @apiSuccess {String} role.user Ki hieu quyen cho nguoi dung la user
     * @apiSuccess {String} role.manager Ki hieu quyen cho nguoi dung la manager
     * @apiSuccess {String} role.administrator Ki hieu quyen cho nguoi dung la administrator
     * @apiSuccess {String} created ngay them moi resource
     * @apiSuccess {String} _id id cua resource
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  [
     *      {
     *          "name": "main",
     *          "role": {
     *              "user": "",
     *              "manager": "G",
     *              "administrator": "GPUD"
     *          },
     *          "created": "2019-11-14T07:39:33.888Z",
     *          "_id": "5dcd04b5e99a6d1c435e6ff1"
     *      }
     *  ]
     * @apiError Permission-denied Token khong hop le
     * @apiError Resource-already-exist resource da ton tai
     *
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *     {
     *       "error": "resource already exist"
     *     }
     *
     * @apiPermission manager-admin
     */
    app.post("/api/resources", (req, res, next) => {
        const body = req.body;
        app.models.resource.create(body, (err, role) => {
            return err
                ? errorHandle(res, err.errorMessage, 501)
                : responseHandle(res, role);
        });
    });


    app.get("/api/resources", (req, res, next) => {
        app.models.resource.get((err, resources) => {
            return err ? errorHandle(res, err.errorMessage, 401) : responseHandle(res, resources);
        })
    })

    app.delete("/api/resources", (req, res, next) => {
        const query = req.query;
        app.models.resource.delete(query, (err, responseMessage) => {
            return err ? errorHandle(res, err.errorMessage, 401) : responseHandle(res, responseMessage);
        })
    })

    app.patch('/api/resources', (req, res, next) => {
        const query = req.query;
        const body = req.body;
        app.models.resource.update(query, body, (err, responseMessage) => {
            return err ? errorHandle(res, err.errorMessage, 401) : responseHandle(res, responseMessage);
        })
    })

    /**
     * @api {get} /api/cooperatives Tìm kiếm thông tin HTX.
     * @apiVersion 0.1.0
     * @apiName GetCooperatives
     * @apiGroup Cooperatives
     *
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/cooperatives
     *
     * @apiHeader {String} authorization Token.
     * @apiParam {Object} query Dieu kien tim kiem.
     * @apiParam {Object} options Cau truc ket qua tra ve.
     * @apiParam {Number} resultNumber so luong ket qua tra ve theo phan trang (tuy chon).
     * @apiParam {Number} pageNumber trang du lieu can tra ve theo phan trang (tuy chon).
     *
     * @apiSuccess (Response Fileds) {Object[]} records Danh sach HTX.
     * @apiSuccess (Response Fileds) {String} records._id ID cua Hop tac xa.
     * @apiSuccess (Response Fileds) {String} records.name Tên gọi của hợp tác xã.
     * @apiSuccess (Response Fileds) {String} records.foreignName Tên nước ngoài của HTX.
     * @apiSuccess (Response Fileds) {String} records.abbreviationName Tên viết tắt.
     * @apiSuccess (Response Fileds) {String} records.logo Logo của HTX.
     * @apiSuccess (Response Fileds) {String} records.status Thông tin trạng thái của HTX.
     * @apiSuccess (Response Fileds) {String} records.cooperativeID Mã số HTX.
     * @apiSuccess (Response Fileds) {String} records.tax Mã số thuế của HTX.
     * @apiSuccess (Response Fileds) {String} records.surrgate Người đại diện.
     * @apiSuccess (Response Fileds) {String} records.director Giám đốc.
     * @apiSuccess (Response Fileds) {String} records.address Địa chỉ của hợp tác xã.
     * @apiSuccess (Response Fileds) {String} records.phone Số điện thoại của HTX.
     * @apiSuccess (Response Fileds) {String} records.fax Địa chỉ fax của HTX.
     * @apiSuccess (Response Fileds) {String} records.website Đia chỉ website của HTX.
     * @apiSuccess (Response Fileds) {String} records.representOffice Văn phòng đại diện.
     * @apiSuccess (Response Fileds) {String[]} records.docs Danh sách tài liệu.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "records": [
     *          {
     *              "_id": "5de653f18a92cd1e06fc0b59",
     *              "name": "Hop tac xa nga nam",
     *              "foreignName": "Hop tac xa nga nam",
     *              "abbreviationName": "NN",
     *              "logo": "",
     *              "status": "Dang hoat dong",
     *              "cooperativeID": "HTXNN",
     *              "tax": "NN23442",
     *              "surrgate": "Nguyen Tan Vu",
     *              "director": "Huynh Van Tan",
     *              "address": "",
     *              "phone": "0836738223",
     *              "fax": "NN341",
     *              "website": "nn.com",
     *              "representOffice": "",
     *              "docs": ""
     *          }
     *      ]
     *  }
     * 
     * @apiError Permission-denied Token khong hop le
     * @apiError Loi-Trong-qua-trinh-tim-kiem   Lỗi trong quá trình tìm kiếm.
     * @apiError ID-khong-hop-le ID không hợp lệ
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *     {
     *       "error": "ID không hợp lệ"
     *     }
     * 
     * @apiPermission manager-admin
     */
    app.get('/api/cooperatives', (req, res, next) => {
        const body = req.body;
        app.models.cooperative.search(body, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage, 401);
            }
            else {
                return responseHandle(res, result);
            }
        })
    })

    /**
     * @api {post} /api/cooperatives Thêm HTX mới
     * @apiVersion 0.1.0
     * @apiName PostCooperatives
     * @apiGroup Cooperatives
     *
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/cooperatives
     *
     * @apiHeader {String} authorization Token.
     * 
     * @apiParam {String} name Tên của HTX.
     * @apiParam {String} foreignName Tên nước ngoài của HTX.
     * @apiParam {String} abbreviationName Tên viết tắt của HTX.
     * @apiParam {String} logo Logo của HTX.
     * @apiParam {String} status Tình trạng họat động của HTX.
     * @apiParam {String} cooperativeID Mã số của HTX.
     * @apiParam {String} tax Mã số thuế của HTX.
     * @apiParam {String} surrgate Tên người đại diện của HTX.
     * @apiParam {String} director Tên giams đốc của HTX.
     * @apiParam {String} phone Số điện thoại của HTX.
     * @apiParam {String} email Địa chỉ email của HTX.
     * @apiParam {String} fax Địa chỉ fax của HTX.
     * @apiParam {String} website Địa chỉ website của HTX.
     * @apiParam {String} representOffice Địa chỉ văn phòng đại diện của HTX.
     * @apiParam {Array} docs Danh sách file tài liệu liên quan đến HTX.
     *
     * 
     * @apiParamExample {json} Request-Example:
     *  {
     *  	"foreignName":"Hop tac xa u minh ha3",
     *  	"abbreviationName":"UMH3",
     *  	"logo":"",
     *  	"status":"Dang hoat dong",
     *  	"cooperativeID":"HTXUMH3",
     *  	"tax":"NN23446",
     *  	"surrgate":"Nguyen Tan Vu",
     *  	"director":"Huynh Van Tan",
     *  	"phone":"0836738224",
     *  	"email":"nn@gmail.com",
     *  	"fax":"NN344",
     *  	"website":"nn.com",
     *  	"represendOffice":"",
     *  	"docs":""
     *  }
     * 
     * 
     * @apiSuccess {String} name Tên của HTX.
     * @apiSuccess {String} foreignName Tên nước ngoài của HTX.
     * @apiSuccess {String} abbreviationName Tên viết tắt của HTX.
     * @apiSuccess {String} logo Logo của HTX.
     * @apiSuccess {String} status Tình trạng họat động của HTX.
     * @apiSuccess {String} cooperativeID Mã số của HTX.
     * @apiSuccess {String} tax Mã số thuế của HTX.
     * @apiSuccess {String} surrgate Tên người đại diện của HTX.
     * @apiSuccess {String} director Tên giams đốc của HTX.
     * @apiSuccess {String} phone Số điện thoại của HTX.
     * @apiSuccess {String} email Địa chỉ email của HTX.
     * @apiSuccess {String} fax Địa chỉ fax của HTX.
     * @apiSuccess {String} website Địa chỉ website của HTX.
     * @apiSuccess {String} representOffice Địa chỉ văn phòng đại diện của HTX.
     * @apiSuccess {Array} docs Danh sách file tài liệu liên quan đến HTX.     
     * @apiSuccess {String} _id ID của htx trong csdl.
     * 
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "name": "Hop tac xa U Minh Ha",
     *      "foreignName": "Hop tac xa u minh ha",
     *      "abbreviationName": "UMH",
     *      "logo": "",
     *      "status": "Dang hoat dong",
     *      "cooperativeID": "HTXUMH",
     *      "tax": "NN23445",
     *      "surrgate": "Nguyen Tan Vu",
     *      "director": "Huynh Van Tan",
     *      "address": "",
     *      "phone": "0836738224",
     *      "fax": "NN344",
     *      "website": "nn.com",
     *      "representOffice": "",
     *      "docs": "",
     *      "_id": "5decdd74e8296d17b3e7a5a0"
     *  }
     * @apiError Permission-denied Token khong hop le.
     * @apiError HTX-da-ton-tai-trong-csdl Hợp tác xã đã tồn tại trong csdl
     *
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *     {
     *       "error": "HTX da ton tai trong csdl"
     *     }
     * 
     * @apiPermission manager-admin
     */
    app.post('/api/cooperatives', (req, res, next) => {
        const body = req.body;
        // verifyUser(req, 'cooperative', (err, accept) => {
        //     if (err) {
        //         errorHandle(res, "Nguoi dung khong duoc phep truy cap", 405);
        //     } else {
        app.models.cooperative.create(body, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage, 404);
            }
            else {
                return responseHandle(res, result)
            }
            //         })
            //     }
        })
    })

    /**
     * @api {patch} /api/cooperatives Cập nhật thông tin của HTX.
     * @apiVersion 0.1.0
     * @apiName PatchCooperatives
     * @apiGroup Cooperatives
     *
     * @apiHeader {String} authorization Token.
     * 
     * @apiParam (query) {String} _id ID của HTX trong CSDL (tùy chọn).
     * @apiParam (query) {String} name Tên của HTX (tùy chọn).
     * @apiParam (query) {String} foreignName Tên nước ngoài của HTX (tùy chọn).
     * @apiParam (query) {String} abbreviationName Tên viết tắt của HTX (tùy chọn).
     * @apiParam (query) {String} logo Logo của HTX (tùy chọn).
     * @apiParam (query) {String} status Tình trạng họat động của HTX (tùy chọn).
     * @apiParam (query) {String} cooperativeID Mã số của HTX (tùy chọn).
     * @apiParam (query) {String} tax Mã số thuế của HTX (tùy chọn).
     * @apiParam (query) {String} surrgate Người đại diện của HTX (tùy chọn).
     * @apiParam (query) {String} director Giám đốc của HTX (tùy chọn).
     * @apiParam (query) {String} address Địa chỉ của HTX (tùy chọn).
     * @apiParam (query) {String} phone Số điện thoại của HTX (tùy chọn).
     * @apiParam (query) {String} fax Số fax của HTX (tùy chọn).
     * @apiParam (query) {String} website Địa chỉ website của HTX (tùy chọn).
     * @apiParam (query) {String} representOffice Địa chỉ văn phòng đại diện của HTX (tùy chọn).
     * @apiParam (query) {String[]} docs Danh sách file liên quan của HTX (tùy chọn).
     * 
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/cooperatives?_id=5df306ee040d111f9b9e56bf
     * 
     * @apiParam (body) {String} _id ID của HTX trong CSDL (tùy chọn).
     * @apiParam (body) {String} name Tên của HTX (tùy chọn).
     * @apiParam (body) {String} foreignName Tên nước ngoài của HTX (tùy chọn).
     * @apiParam (body) {String} abbreviationName Tên viết tắt của HTX (tùy chọn).
     * @apiParam (body) {String} logo Logo của HTX (tùy chọn).
     * @apiParam (body) {String} status Tình trạng họat động của HTX (tùy chọn).
     * @apiParam (body) {String} cooperativeID Mã số của HTX (tùy chọn).
     * @apiParam (body) {String} tax Mã số thuế của HTX (tùy chọn).
     * @apiParam (body) {String} surrgate Người đại diện của HTX (tùy chọn).
     * @apiParam (body) {String} director Giám đốc của HTX (tùy chọn).
     * @apiParam (body) {String} address Địa chỉ của HTX (tùy chọn).
     * @apiParam (body) {String} phone Số điện thoại của HTX (tùy chọn).
     * @apiParam (body) {String} fax Số fax của HTX (tùy chọn).
     * @apiParam (body) {String} website Địa chỉ website của HTX (tùy chọn).
     * @apiParam (body) {String} representOffice Địa chỉ văn phòng đại diện của HTX (tùy chọn).
     * @apiParam (body) {String[]} docs Danh sách file liên quan của HTX (tùy chọn).
     * 
     * @apiParamExample {json} Request-Example:
     *  {
     *      "name": "Hop tac xa u minh ha"
     *  
     *  }
     *
     * @apiSuccess {json} successMessage Số documents đã được update.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "successMessage": "Số lượng dữ liệu đã chỉnh sửa: 4"
     *  }
     * @apiError Permission-denied Token không hợp lệ.
     * @apiError ID-khong-hop-le ID không hợp lệ.
     * @apiError Nothing-to-update Query không kết quả hoặc dữ liệu đã được update.
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *     {
     *       "error": "Nothing to update"
     *     }
     * 
     * @apiPermission manager-admin
     */
    app.patch('/api/cooperatives', (req, res, next) => {
        const body = req.body;
        const query = req.query;
        app.models.cooperative.update(query, body, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage, 404);
            }
            else {
                return responseHandle(res, result);
            }
        })
    })

    /**
     * @api {delete} /api/cooperatives Xóa thông tin của HTX.
     * @apiVersion 0.1.0
     * @apiName DeleteCooperatives
     * @apiGroup Cooperatives
     *

     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam (query) {String} _id ID của HTX trong CSDL (tùy chọn).
     * @apiParam (query) {String} name Tên của HTX (tùy chọn).
     * @apiParam (query) {String} foreignName Tên nước ngoài của HTX (tùy chọn).
     * @apiParam (query) {String} abbreviationName Tên viết tắt của HTX (tùy chọn).
     * @apiParam (query) {String} logo Logo của HTX (tùy chọn).
     * @apiParam (query) {String} status Tình trạng họat động của HTX (tùy chọn).
     * @apiParam (query) {String} cooperativeID Mã số của HTX (tùy chọn).
     * @apiParam (query) {String} tax Mã số thuế của HTX (tùy chọn).
     * @apiParam (query) {String} surrgate Người đại diện của HTX (tùy chọn).
     * @apiParam (query) {String} director Giám đốc của HTX (tùy chọn).
     * @apiParam (query) {String} address Địa chỉ của HTX (tùy chọn).
     * @apiParam (query) {String} phone Số điện thoại của HTX (tùy chọn).
     * @apiParam (query) {String} fax Số fax của HTX (tùy chọn).
     * @apiParam (query) {String} website Địa chỉ website của HTX (tùy chọn).
     * @apiParam (query) {String} representOffice Địa chỉ văn phòng đại diện của HTX (tùy chọn).
     * @apiParam (query) {String[]} docs Danh sách file liên quan của HTX (tùy chọn).
     *  
     * @apiExample {curl} Example usage:
     *     curl -X DELETE http://localhost:3001/api/cooperatives?_id=5df306ee040d111f9b9e56bf
     *
     * @apiSuccess {json} successMessage Thông báo đã xóa thành công dữ liệu.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "responseMessage": "Xóa thành công: 1 dữ liệu"
     *  }
     * @apiError Permission-denied Token khong hop le
     * @apiError Du-lieu-khong-ton-tai Dữ liệu không tồn tại.
     * @apiError Tac-vu-eyu-cau-phai-co-dieu-kien Tác vụ yêu cầu phải có điều kiện.
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *  {
     *      "error": "Dữ liệu không tồn tại"
     *  }
     * 
     * @apiPermission manager-admin
     */
    app.delete('/api/cooperatives', (req, res, next) => {
        const query = req.query;
        app.models.cooperative.delete(query, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage, 404);
            }
            else {
                return responseHandle(res, result);
            }
        })
    })

    /**
     * @api {post} /api/diaries Tạo nhật ký mới.
     * @apiVersion 0.1.0
     * @apiName PostDiaries
     * @apiGroup Diaries
     *
     *
     * @apiHeader {String} authorization Token.
     * 
     * @apiParam (body) {String} plant_id ID của loại cây trồng.
     * @apiParam (body) {String[]} area_id ID của khu vực gieo trồng.
     * @apiParam (body) {String} HTX_id ID của HTX.
     * @apiParam (body) {Number} begin Thời gian bắt đầu mùa vụ (dạng ISO-8601)).
     * @apiParam (body) {Number} end Thời gian kết thúc mùa vụ (dạng ISO-8601)).  
     * 
     * @apiParamExample {json} Request-Example:
     *  {
     *  	"plant_id":"dfejdkfsdh",
     *  	"fields":["5dedc932bad8e32650d38788","5dedc93ebad8e32650d38789"],
     *  	"HTX_id":"UM",
     *  	"begin":"2019-12-13 04:14",
     *  	"end":"2019-12-15 17:20"
     *  }

     *
     * @apiSuccess {String} plant_id ID của loại cây trồng.
     * @apiSuccess {String[]} area_id ID của khu vực gieo trồng.
     * @apiSuccess {String} HTX_id ID của HTX.
     * @apiSuccess {Number} begin Thời gian bắt đầu mùa vụ (dạng ISO-8601)).
     * @apiSuccess {Number} end Thời gian kết thúc mùa vụ (dạng ISO-8601)). 
     * @apiSuccess {String} _id ID của nhật ký trong CSDL.
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "plant_id": "dfejdkfsdh",
     *      "fields": [
     *          "5dedc932bad8e32650d38788",
     *          "5dedc93ebad8e32650d38789"
     *      ],
     *      "HTX_id": "UM",
     *      "begin": "2019-12-12T21:14:00.000Z",
     *      "end": "2019-12-15T10:20:00.000Z",
     *      "_id": "5df32bce13f76d331d8fa1ec"
     *  }
     * @apiError Permission-denied Token không hợp lệ.
     * @apiError Loai-cay-trong-khong-hop-le Loại cây trồng không hợp lệ.
     * @apiError Khu-vuc-khong-hop-le Khu vực không hợp lệ.
     * @apiError HTX-khong-hop-le Hợp tác xã không hợp lệ.
     * @apiError Ngay-bat-dau-khong-hop-le Ngày bắt đầu không hợp lệ
     * @apiError Ngay-ket-thuc-khong-hop-le Ngày kết thúc không hợp lệ
     * @apiError Khu-vuc-khong-hop-le Khu vực không hợp lệ
     * @apiError Thua-{}-Dang-duoc-su-dung thửa đang được sử dụng
     * @apiError Loi-trong-qua-trinh-them-vao-CSDL Lỗi trong qúa trình thêm vào CSDL
     *
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *     {
     *       "error": "Lỗi trong qúa trình thêm vào CSDL"
     *     }
     * 
     * @apiPermission manager-admin
     */
    app.post('/api/diaries', (req, res, next) => {
        const body = req.body;
        app.models.diary.create(body, (err, result) => {
            return err ? errorHandle(res, err.errorMessage, 400) : responseHandle(res, result);
        })
    })

    app.get('/api/diaries', (req, res, next) => {
        const body = req.body;
        app.models.diary.search(body, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage, 404);
            }
            else {
                return responseHandle(res, result);
            }
        })
    })

    app.patch('/api/diaries', (req, res, next) => {
        const body = req.body;
        app.models.diary.update(body, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage, 404);
            }
            else {
                return responseHandle(res, result);
            }
        })
    })

    app.delete('/api/diaries', (req, res, next) => {
        const body = req.body;
        app.models.diary.remove(body, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage, 404);
            }
            else {
                return responseHandle(res, result);
            }
        })
    })



    app.post('/api/fields', (req, res, next) => {
        const body = req.body;
        app.models.field.create(body, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage, 404);
            }
            else {
                return responseHandle(res, result);
            }
        })
    })










    // *************************************************************************** //
    // ROUTES FOR PLANT PROTECTION PRODUCT

    /**
     * @api {get} /api/plant-protection-products Get all plant protection products
     * @apiName GetAllPlantProtectionProducts
     * @apiGroup PlantProtectionProducts
     * @apiExample {curl} Tìm kiếm thuốc bảo vệ thực vật:
     *     curl -i http://localhost:3001/api/plant-protection-products?pageNumber=9&nPerPage=20
     *
     * @apiHeader {String} authorization Token.
     * 
     * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
     * @apiParam {Number} nPerPage Số lượng thuốc bvtv trên mỗi trang
     *
     * @apiSuccess {Number} totalPages Tổng số lượng trang 
     * @apiSuccess {String} name Tên thuốc bảo vệ thực vật
     * @apiSuccess {String} activeIngredient Hoạt chất
     * @apiSuccess {String} content Hàm lượng
     * @apiSuccess {String} plantProtectionProductGroup Nhóm thuốc
     * @apiSuccess {Integer} ghs Nhóm độc GHS
     * @apiSuccess {Integer} who Nhóm độc WHO
     * @apiSuccess {Array} scopeOfUse Phạm vi sử dụng
     * @apiSuccess {String} plant Cây trồng
     * @apiSuccess {String} pest Dịch hại
     * @apiSuccess {String} dosage Liều lượng
     * @apiSuccess {String} phi
     * @apiSuccess {String} usage Cách dùng
     * @apiSuccess {Array} registrationInfo Thông tin đăng ký
     * @apiSuccess {String} registrationUnit Đơn vị đăng ký
     * @apiSuccess {String} registrationUnitAddress Địa chỉ
     * @apiSuccess {String} manufacturer Nhà sản xuất
     * @apiSuccess {String} manufacturerAddress Địa chi sản xuất
     * @apiSuccess {ObjectId} pppId ID của thuốc bảo vệ thực vật
     * @apiSuccess {ObjectId} _id ID của thuốc bảo vệ thực vật || Phạm vi sử dụng || Thông tin đăng ký
     *
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * {
     *      "totalPages": 317,
     *      "data": [
     *          {
     *              "_id": "5dce66cb5c25ee6da0a29ac8",
     *              "name": " Ababetter  3.6EC",
     *              "activeIngredient": "Abamectin",
     *              "content": "36g/l",
     *              "plantProtectionProductGroup": "",
     *              "ghs": "",
     *              "who": "2",
     *              "created": "2019-11-15T08:50:19.842Z",
     *              "scopeOfUse": [
     *                  {
     *                      "_id": "5dce66cc5c25ee6da0a29ac9",
     *                      "pppId": "5dce66cb5c25ee6da0a29ac8",
     *                      "plant": "dưa hấu",
     *                      "pest": "bọ trĩ",
     *                      "dosage": "0.2 - 0.3 lít/ha",
     *                      "phi": "7",
     *                      "usage": "Lượng nước phun 400 lít/ha. Phun tkhi mật độ \r\nbọ trĩ  2-3 con/ ngọn",
     *                      "created": "2019-11-15T08:50:20.100Z"
     *                  }
     *              ],
     *              "registrationInfo": {
     *                  "_id": "5dce66cc5c25ee6da0a29acd",
     *                  "pppId": "5dce66cb5c25ee6da0a29ac8",
     *                  "registrationUnit": "Công ty TNHH MTV Lucky",
     *                  "registrationUnitAddress": "",
     *                  "manufacturer": "Hebei Yetian Agrochemicals Co., Ltd.",
     *                  "manufacturerAddress": "Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.",
     *                  "created": "2019-11-15T08:50:20.107Z"
     *              }
     *          },
     *          {
     *              "_id": "5dce66e25c25ee6da0a29ace",
     *              "name": " Ababetter  5EC",
     *              "activeIngredient": "Abamectin",
     *              "content": "50g/l",
     *              "plantProtectionProductGroup": "",
     *              "ghs": "",
     *              "who": "2",
     *              "created": "2019-11-15T08:50:42.728Z",
     *              "scopeOfUse": [
     *                  {
     *                      "_id": "5dce66e25c25ee6da0a29acf",
     *                      "pppId": "5dce66e25c25ee6da0a29ace",
     *                      "plant": "lúa",
     *                      "pest": "sâu cuốn lá",
     *                      "dosage": "150 - 250 ml/ha",
     *                      "phi": "",
     *                      "usage": "Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2",
     *                      "created": "2019-11-15T08:50:42.728Z"
     *                  },
     *                  {
     *                      "_id": "5dce66e25c25ee6da0a29ad0",
     *                      "pppId": "5dce66e25c25ee6da0a29ace",
     *                      "plant": "quýt",
     *                      "pest": "nhện đỏ",
     *                      "dosage": "0.0375 - 0.0625%",
     *                      "phi": "",
     *                      "usage": "Phun ướt đều plant khi mật độ khoảng \r\n5 - 6 con/ lá",
     *                      "created": "2019-11-15T08:50:42.728Z"
     *                  }
     *              ],
     *              "registrationInfo": {
     *                  "_id": "5dce66e25c25ee6da0a29ad1",
     *                  "pppId": "5dce66e25c25ee6da0a29ace",
     *                  "registrationUnit": "Công ty TNHH MTV Lucky",
     *                  "registrationUnitAddress": "",
     *                  "manufacturer": "Hebei Yetian Agrochemicals Co., Ltd.",
     *                  "manufacturerAddress": "Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.",
     *                  "created": "2019-11-15T08:50:42.728Z"
     *              }
     *          }
     *          ...
     *      ]
     * } 
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *     {
     *       "errorMessage": "Trang tìm kiếm không tồn tại"
     *     }
     * 
     * @apiPermission none
     */



    app.get("/api/plant-protection-products", (req, res, next) => {
        const query = req.query;

        app.models.plantProtectionProduct.find(query, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });

    /**
     * @api {get} /api/plant-protection-products Get plant protection product by query
     * @apiName GetPlantProtectionProductByQuery
     * @apiGroup PlantProtectionProducts
     *
     * @apiExample {curl} Tìm thuốc bảo vệ thực vật theo _id:
     *     curl -i http://localhost:3001/api/plant-protection-products/query?_id=5dd6527842d8944aa7cef84e
     * 
     * @apiExample {curl} Tìm thuốc bảo vệ thực vật theo tên:
     *     curl -i http://localhost:3001/api/plant-protection-products/query?name=B52-usa 500EC
     *   
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} _id ID của thuốc bảo vệ thực vật
     * @apiParam {String} name Tên thuốc bảo vệ thực vật
     *
     * @apiSuccess {String} name Tên thuốc bảo vệ thực vật
     * @apiSuccess {String} activeIngredient Hoạt chất
     * @apiSuccess {String} content Hàm lượng
     * @apiSuccess {String} plantProtectionProductGroup Nhóm thuốc
     * @apiSuccess {Integer} ghs Nhóm độc GHS
     * @apiSuccess {Integer} who Nhóm độc WHO
     * @apiSuccess {Array} scopeOfUse Phạm vi sử dụng
     * @apiSuccess {String} plant Cây trồng
     * @apiSuccess {String} pest Dịch hại
     * @apiSuccess {String} dosage Liều lượng
     * @apiSuccess {String} phi
     * @apiSuccess {String} usage Cách dùng
     * @apiSuccess {Array} registrationInfo Thông tin đăng ký
     * @apiSuccess {String} registrationUnit Đơn vị đăng ký
     * @apiSuccess {String} registrationUnitAddress Địa chỉ
     * @apiSuccess {String} manufacturer Nhà sản xuất
     * @apiSuccess {String} manufacturerAddress Địa chi sản xuất
     * @apiSuccess {ObjectId} pppId ID của thuốc bảo vệ thực vật
     * @apiSuccess {ObjectId} _id ID của thuốc bảo vệ thực vật || Phạm vi sử dụng || Thông tin đăng ký
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *     "name": " Ababetter 3.6EC",
     *     "activeIngredient": "Abamectin",
     *     "content": "36g/l",
     *     "plantProtectionProductGroup": "Thuốc trừ sâu",
     *     "ghs": "7",
     *     "who": "6",
     *     "created": "2019-11-14T16:43:16.899Z",
     *     "_id": "5dcd842416d4391c7f8a4265",
     *     "scopeOfUse": [
     *         {
     *             "pppId": "5dcd842416d4391c7f8a4265",
     *             "plant": "dưa hấu",
     *             "pest": "bọ trĩ",
     *             "dosage": "0.2 - 0.3 lít/ha",
     *             "phi": "7",
     *             "usage": "Lượng nước phun 400 lít/ha. Phun tkhi mật độ \r\nbọ trĩ  2-3 con/ ngọn",
     *             "created": "2019-11-14T16:43:16.900Z",
     *             "_id": "5dcd842416d4391c7f8a4266"
     *         },
     *         {
     *             "pppId": "5dcd842416d4391c7f8a4265",
     *             "plant": "lúa",
     *             "pest": "sâu cuốn lá",
     *             "dosage": "200 - 300 ml/ha",
     *             "phi": "7",
     *             "usage": "Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2",
     *             "created": "2019-11-14T16:43:16.900Z",
     *             "_id": "5dcd842416d4391c7f8a4267"
     *         }
     *     ],
     *     "registrationInfo": {
     *         "pppId": "5dcd842416d4391c7f8a4265",
     *         "registrationUnit": "Công ty TNHH MTV Lucky",
     *         "registrationUnitAddress": "",
     *         "manufacturer": "Hebei Yetian Agrochemicals Co., Ltd.",
     *         "manufacturerAddress": "Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.",
     *         "created": "2019-11-14T16:43:16.900Z",
     *         "_id": "5dcd842416d4391c7f8a4268"
     *     }
     * }
     *
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *     {
     *       "errorMessage": "Không tìm thấy thuốc bảo vệ thực vật"
     *     }
     *
     * @apiPermission manager-admin
     */
    app.get("/api/plant-protection-products/query", (req, res, next) => {
        const query = req.query;

        app.models.plantProtectionProduct.findByQuery(query, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });

    /**
     * @api {post} /api/plant-protection-products Create new plant protection product
     * @apiName CreatePlantProtectionProduct
     * @apiGroup PlantProtectionProducts
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/plant-protection-products
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} name Tên thuốc bảo vệ thực vật
     * @apiParam {String} activeIngredient Hoạt chất
     * @apiParam {String} content Hàm lượng
     * @apiParam {String} plantProtectionProductGroup Nhóm thuốc
     * @apiParam {Integer} ghs Nhóm độc GHS
     * @apiParam {Integer} who Nhóm độc WHO
     * @apiParam {Array} scopeOfUse Phạm vi sử dụng
     * @apiParam {String} plant Cây trồng
     * @apiParam {String} pest Dịch hại
     * @apiParam {String} dosage Liều lượng
     * @apiParam {String} phi
     * @apiParam {String} usage Cách dùng
     * @apiParam {Array} registrationInfo Thông tin đăng ký
     * @apiParam {String} registrationUnit Đơn vị đăng ký
     * @apiParam {String} registrationUnitAddress Địa chỉ
     * @apiParam {String} manufacturer Nhà sản xuất
     * @apiParam {String} manufacturerAddress Địa chi sản xuất
     *
     *
     * @apiParamExample {json} Request-Example:
     * {
     *     "name": " Ababetter  3.6EC",
     *     "activeIngredient": "Abamectin",
     *     "content": "36g/l",
     *     "plantProtectionProductGroup": "Thuốc trừ sâu",
     *     "ghs": "7",
     *     "who": "6",
     *     "scopeOfUse": [
     *         {
     *             "plant": "dưa hấu",
     *             "pest": "bọ trĩ",
     *             "dosage": "0.2 - 0.3 lít/ha",
     *             "phi": "7",
     *             "usage": "Lượng nước phun 400 lít/ha. Phun tkhi mật độ \r\nbọ trĩ  2-3 con/ ngọn"
     *         },
     *         {
     *             "plant": "lúa",
     *             "pest": "sâu cuốn lá",
     *             "dosage": "200 - 300 ml/ha",
     *             "phi": "7",
     *             "usage": "Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2"
     *         }
     *     ],
     *     "registrationInfo": {
     *         "registrationUnit": "Công ty TNHH MTV Lucky",
     *         "registrationUnitAddress": "",
     *         "manufacturer": "Hebei Yetian Agrochemicals Co., Ltd.",
     *         "manufacturerAddress": "Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China."
     *     }
     * }
     *
     * @apiSuccess {String} name Tên thuốc bảo vệ thực vật
     * @apiSuccess {String} activeIngredient Hoạt chất
     * @apiSuccess {String} content Hàm lượng
     * @apiSuccess {String} plantProtectionProductGroup Nhóm thuốc
     * @apiSuccess {Integer} ghs Nhóm độc GHS
     * @apiSuccess {Integer} who Nhóm độc WHO
     * @apiSuccess {Array} scopeOfUse Phạm vi sử dụng
     * @apiSuccess {String} plant Cây trồng
     * @apiSuccess {String} pest Dịch hại
     * @apiSuccess {String} dosage Liều lượng
     * @apiSuccess {String} phi
     * @apiSuccess {String} usage Cách dùng
     * @apiSuccess {Array} registrationInfo Thông tin đăng ký
     * @apiSuccess {String} registrationUnit Đơn vị đăng ký
     * @apiSuccess {String} registrationUnitAddress Địa chỉ
     * @apiSuccess {String} manufacturer Nhà sản xuất
     * @apiSuccess {String} manufacturerAddress Địa chi sản xuất
     * @apiSuccess {ObjectId} pppId ID của thuốc bảo vệ thực vật
     * @apiSuccess {ObjectId} _id ID của thuốc bảo vệ thực vật || Phạm vi sử dụng || Thông tin đăng ký
     *
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *     "name": " Ababetter  3.6EC",
     *     "activeIngredient": "Abamectin",
     *     "content": "36g/l",
     *     "plantProtectionProductGroup": "Thuốc trừ sâu",
     *     "ghs": "7",
     *     "who": "6",
     *     "created": "2019-11-14T16:43:16.899Z",
     *     "_id": "5dcd842416d4391c7f8a4265",
     *     "scopeOfUse": [
     *         {
     *             "pppId": "5dcd842416d4391c7f8a4265",
     *             "plant": "dưa hấu",
     *             "pest": "bọ trĩ",
     *             "dosage": "0.2 - 0.3 lít/ha",
     *             "phi": "7",
     *             "usage": "Lượng nước phun 400 lít/ha. Phun tkhi mật độ \r\nbọ trĩ  2-3 con/ ngọn",
     *             "created": "2019-11-14T16:43:16.900Z",
     *             "_id": "5dcd842416d4391c7f8a4266"
     *         },
     *         {
     *             "pppId": "5dcd842416d4391c7f8a4265",
     *             "plant": "lúa",
     *             "pest": "sâu cuốn lá",
     *             "dosage": "200 - 300 ml/ha",
     *             "phi": "7",
     *             "usage": "Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2",
     *             "created": "2019-11-14T16:43:16.900Z",
     *             "_id": "5dcd842416d4391c7f8a4267"
     *         }
     *     ],
     *     "registrationInfo": {
     *         "pppId": "5dcd842416d4391c7f8a4265",
     *         "registrationUnit": "Công ty TNHH MTV Lucky",
     *         "registrationUnitAddress": "",
     *         "manufacturer": "Hebei Yetian Agrochemicals Co., Ltd.",
     *         "manufacturerAddress": "Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.",
     *         "created": "2019-11-14T16:43:16.900Z",
     *         "_id": "5dcd842416d4391c7f8a4268"
     *     }
     * }
     *
     * @apiError Name-is-required Thiếu trường tên thuốc bvtv
     * @apiError GHS-must-be-a-number Trường GHS phải là số
     * @apiError WHO-must-be-a-number Trường WHO phải là số
     * @apiError PHI-must-be-a-number Trường PHI phải là số
     * @apiErrorExample Thuốc bvtv tồn tại:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Thuốc bảo vệ thực vật với tên '" + name + "' đã tồn tại."
     *     }
     * 
     * @apiErrorExample Thiếu trường tên thuốc bvtv:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Vui lòng nhập tên thuốc bvtv"
     *     }
     * 
     * @apiErrorExample Trường WHO phải là số:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Trường WHO phải là số"
     *     }
     * 
     * @apiErrorExample Trường GHS phải là số:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Trường GHS phải là số"
     *     }
     * 
     * @apiErrorExample Trường PHI phải là số:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Trường PHI phải là số"
     *     }
     * @apiPermission none
     */
    app.post("/api/plant-protection-products", (req, res, next) => {
        const body = req.body;

        app.models.plantProtectionProduct.create(body, (err, info) => {
            return err ? errorHandle(res, err, 409) : responseHandle(res, info, 201);
        });
    });


    /**
     * @api {patch} /api/plant-protection-products Update plant protection product
     * @apiName UpdatePlantProtectionProduct
     * @apiGroup PlantProtectionProducts
     *
     * @apiExample {curl} Update thuốc bvtv theo _id:
     *     curl -i http://localhost:3001/api/plant-protection-products?_id=5df1d86fadb2472bffdde52c
     * 
     * @apiExample {curl} Update thuốc bvtv theo tên:
     *     curl -i http://localhost:3001/api/plant-protection-products?name=Alfatin 1.8EC
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} name Tên thuốc bảo vệ thực vật
     * @apiParam {String} activeIngredient Hoạt chất
     * @apiParam {String} content Hàm lượng
     * @apiParam {String} plantProtectionProductGroup Nhóm thuốc
     * @apiParam {Integer} ghs Nhóm độc GHS
     * @apiParam {Integer} who Nhóm độc WHO
     * @apiParam {Array} scopeOfUse Phạm vi sử dụng
     * @apiParam {String} plant Cây trồng
     * @apiParam {String} pest Dịch hại
     * @apiParam {String} dosage Liều lượng
     * @apiParam {String} phi
     * @apiParam {String} usage Cách dùng
     * @apiParam {Array} registrationInfo Thông tin đăng ký
     * @apiParam {String} registrationUnit Đơn vị đăng ký
     * @apiParam {String} registrationUnitAddress Địa chỉ
     * @apiParam {String} manufacturer Nhà sản xuất
     * @apiParam {String} manufacturerAddress Địa chi sản xuất
     *
     * @apiParamExample {json} Update JSON example
     * {
     *       "name": "updated",
     *       "activeIngredient": "updated",
     *       "content": "updated",
     *       "plantProtectionProductGroup": "updated",
     *       "ghs": "20",
     *       "who": "20",
     *       "scopeOfUse": [
     *           {
     *               "_id": "5df1d870adb2472bffde2f09",
     *               "pppId": "5df1d86fadb2472bffdde52c",
     *               "plant": "updated",
     *               "pest": "updated",
     *               "dosage": "updated",
     *               "phi": "9",
     *               "usage": "updated"
     *           },
     *           {
     *               "_id": "5df1d870adb2472bffde2f0a",
     *               "pppId": "5df1d86fadb2472bffdde52c",
     *               "plant": "updated",
     *               "pest": "updated",
     *               "dosage": "updated",
     *               "phi": "9",
     *               "usage": "updated"
     *           }
     *       ],
     *       "registrationInfo": {
     *           "_id": "5df1d870adb2472bffde2f0b",
     *           "pppId": "5df1d86fadb2472bffdde52c",
     *           "registrationUnit": "updated",
     *           "registrationUnitAddress": "updated",
     *           "manufacturer": "updated",
     *           "manufacturerAddress": "updated"
     *       }
     * }
     *
     *
     * @apiSuccess {String} name Tên thuốc bảo vệ thực vật
     * @apiSuccess {String} activeIngredient Hoạt chất
     * @apiSuccess {String} content Hàm lượng
     * @apiSuccess {String} plantProtectionProductGroup Nhóm thuốc
     * @apiSuccess {Integer} ghs Nhóm độc GHS
     * @apiSuccess {Integer} who Nhóm độc WHO
     * @apiSuccess {Array} scopeOfUse Phạm vi sử dụng
     * @apiSuccess {String} plant Cây trồng
     * @apiSuccess {String} pest Dịch hại
     * @apiSuccess {String} dosage Liều lượng
     * @apiSuccess {String} phi
     * @apiSuccess {String} usage Cách dùng
     * @apiSuccess {Array} registrationInfo Thông tin đăng ký
     * @apiSuccess {String} registrationUnit Đơn vị đăng ký
     * @apiSuccess {String} registrationUnitAddress Địa chỉ
     * @apiSuccess {String} manufacturer Nhà sản xuất
     * @apiSuccess {String} manufacturerAddress Địa chi sản xuất
     * @apiSuccess {ObjectId} pppId ID của thuốc bảo vệ thực vật
     * @apiSuccess {ObjectId} _id ID của thuốc bảo vệ thực vật || Phạm vi sử dụng || Thông tin đăng ký
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *     "_id": "5df1d86fadb2472bffdde52c",
     *     "name": "updated",
     *     "activeIngredient": "updated",
     *     "content": "updated",
     *     "plantProtectionProductGroup": "updated",
     *     "ghs": "20",
     *     "who": "20",
     *     "created": "2019-12-12T06:04:31.587Z",
     *     "scopeOfUse": [
     *         {
     *             "_id": "5df1d870adb2472bffde2f09",
     *             "pppId": "5df1d86fadb2472bffdde52c",
     *             "plant": "updated",
     *             "pest": "updated",
     *             "dosage": "updated",
     *             "phi": "9",
     *             "usage": "updated",
     *             "created": "2019-12-12T06:04:32.858Z"
     *         },
     *         {
     *             "_id": "5df1d870adb2472bffde2f0a",
     *             "pppId": "5df1d86fadb2472bffdde52c",
     *             "plant": "updated",
     *             "pest": "updated",
     *             "dosage": "updated",
     *             "phi": "9",
     *             "usage": "updated",
     *             "created": "2019-12-12T06:04:32.858Z"
     *         }
     *     ],
     *     "registrationInfo": {
     *         "_id": "5df1d870adb2472bffde2f0b",
     *         "pppId": "5df1d86fadb2472bffdde52c",
     *         "registrationUnit": "updated",
     *         "registrationUnitAddress": "updated",
     *         "manufacturer": "updated",
     *         "manufacturerAddress": "updated",
     *         "created": "2019-12-12T06:04:32.858Z"
     *     }
     * }
     *
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *     {
     *       "errorMessage": "Không tìm thấy thuốc bảo vệ thực vật phù hợp!"
     *     }
     *
     * @apiPermission manager-admin
     */
    app.patch("/api/plant-protection-products", (req, res, next) => {
        const query = req.query;
        const update = req.body;

        app.models.plantProtectionProduct.update(query, update, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });

    /**
     * @api {delete} /api/plant-protection-products/ Delete plant protection product
     * @apiName DeletePlantProtectionProduct
     * @apiGroup PlantProtectionProducts
     *
     * @apiExample {curl} Xóa thuốc bảo vệ thực vật theo _id:
     *     curl -i http://localhost:3001/api/plant-protection-products?_id=5dd6527842d8944aa7cef4a1
     *    
     * @apiExample {curl} Xóa thuốc bảo vệ thực vật theo tên:
     *     curl -i http://localhost:3001/api/plant-protection-products?name=Abagold 55EC
     * 
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} _id ID của thuốc bảo vệ thực vật
     * @apiParam {String} name Ten cua thuoc bao ve thuc vat
     * 
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *     "successMessage": "Xóa thuốc bảo vệ thực vật thành công"
     *  }
     *
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     * {
     *     "errorMessage": "Không tìm thấy thuốc bảo vệ thực vật"
     * }
     *
     * @apiPermission manager-admin
     */
    app.delete("/api/plant-protection-products", (req, res, next) => {
        const query = req.query;

        app.models.plantProtectionProduct.delete(query, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });



    // *************************************************************************** //
    // ROUTES FOR PLANT PROTECTION PRODUCT WAREHOUSE

    /**
     * @api {post} /api/warehouse/plant-protection-products Create new plant protection product warehouse
     * @apiName CreatePlantProtectionProductWarehouse
     * @apiGroup PlantProtectionProductWarehouses
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/warehouse/plant-protection-products
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} plantProtectionProductId Id thuốc bảo vệ thực vật
     * @apiParam {Date} tradeDate Ngày mua (ISO8601 Format)
     * @apiParam {Number} quantity Số lượng
     * @apiParam {Date} manufacturingDate Ngày sản xuất (ISO8601 Format)
     * @apiParam {Date} expiryDate Hạn sử dụng (ISO8601 Format)
     * @apiParam {String} distributionAgent Đại lý phân phối
     * @apiParam {Number} quarantineDate Thời gian cách ly
     *
     * @apiParamExample {json} Request-Example:
     * {
     *     "plantProtectionProductId": "5df20540e2b16e4d09842e26",
     *     "tradeDate": "2019-01-14",
     *     "quantity": "2",
     *     "manufacturingDate": "2019-02-18",
     *     "expiryDate": "2019-04-28",
     *     "distributionAgent": "Cty Thuoc Diet Co",
     *     "quarantineDate": "2",
     *     "cooperativeId": "HTXUMH3"
     * }
     *
     * @apiSuccess {String} plantProtectionProductId Id thuốc bảo vệ thực vật
     * @apiSuccess {Date} tradeDate Ngày mua (ISO8601 Format)
     * @apiSuccess {Number} quantity Số lượng
     * @apiSuccess {Date} manufacturingDate Ngày sản xuất (ISO8601 Format)
     * @apiSuccess {Date} expiryDate Hạn sử dụng (ISO8601 Format)
     * @apiSuccess {String} distributionAgent Đại lý phân phối
     * @apiSuccess {Number} quarantineDate Thời gian cách ly
     * @apiSuccess {ObjectId} _id Id của dữ liệu thuốc vừa được thêm vào kho
     * @apiSuccess {Date} created Thời gian dữ liệu mới được lưu vào db
     *
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *     "plantProtectionProductId": "5df20540e2b16e4d09842e26",
     *     "tradeDate": "2019-01-14",
     *     "quantity": "2",
     *     "manufacturingDate": "2019-02-18",
     *     "expiryDate": "2019-04-28",
     *     "quarantineDate": "2",
     *     "distributionAgent": "Cty Thuoc Diet Co",
     *     "cooperativeId": "HTXUMH3",
     *     "created": "2019-12-20T15:56:40.048Z",
     *     "_id": "5dfcef3b83ec1418baf42a34"
     * }
     *
     * @apiError plantProtectionProductId-is-required Trường id thuốc bvtv là bắt buộc
     * @apiError CooperativeId-is-required Trường id hợp tác xã là bắt buộc
     * @apiError tradeDate-must-be-a-date Trường tradeDate phải là ngày với định dạng ISO8601
     * @apiError manufacturingDate-must-be-a-date Trường manufacturingDate phải là ngày với định dạng ISO8601
     * @apiError expiryDate-must-be-a-date Trường expiryDate phải là ngày với định dạng ISO8601
     * @apiError quantity-must-be-a-number Trường quantity phải là số nguyên dương
     * @apiError quarantineDate-must-be-a-number Trường quarantineDate phải là số nguyên dương
     * @apiError plant-protection-product-not-found Không tìm thấy thuốc bảo vệ thực vật trong danh mục
     * @apiError cooperative-not-found Không tìm thấy HTX 
     * 
     * @apiErrorExample Thuốc bvtv không tồn tại:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Thuốc bảo vệ thực vật không tồn tại trong danh mục"
     *     }
     * 
     * @apiErrorExample Thiếu trường id thuốc bvtv:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Vui lòng nhập id thuốc bảo vệ thực vật"
     *     }
     * 
     * @apiErrorExample HTX không tồn tại:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Hợp tác xã không tồn tại"
     *     }
     * 
     * @apiErrorExample Thiếu trường id HTX:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Vui lòng nhập id họp tác xã"
     *     }
     * 
     * @apiErrorExample Thiếu trường quantity:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Vui lòng nhập số lượng"
     *     }
     * 
     * @apiErrorExample Trường quantity phải là số nguyên dương:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Số lượng phải là số nguyên dương"
     *     }
     * 
     * @apiErrorExample Thiếu trường quarantineDate:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Vui lòng nhập thời gian cách ly"
     *     }
     * 
     * @apiErrorExample Trường quarantineDate phải là số nguyên dương:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Thời gian cách ly phải là số nguyên dương"
     *     }
     * 
     * @apiErrorExample Thiếu trường manufacturingDate:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Vui lòng nhập ngày sản xuất"
     *     }
     * 
     * @apiErrorExample Trường manufacturingDate phải là định dạng ngày:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Ngày sản xuất không hợp lệ"
     *     }
     * 
     * @apiErrorExample Thiếu trường expiryDate:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Vui lòng nhập hạn sử dụng"
     *     }
     * 
     * @apiErrorExample Trường expiryDate phải là định dạng ngày:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Hạn sử dụng không hợp lệ"
     *     }
     * 
     * @apiErrorExample Trường tradeDate phải là định dạng ngày:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Ngày mua không hợp lệ"
     *     }
     * 
     *
     * @apiPermission none
     */

    app.post('/api/warehouse/plant-protection-products', (req, res, next) => {
        const body = req.body;

        app.models.plantProtectionProductWarehouse.create(body, (err, info) => {
            return err ? errorHandle(res, err, 409) : responseHandle(res, info, 201);
        });
    })


    /**
     * @api {get} /api/warehouse/plant-protection-products Get all plant protection product warehourses with pageNumber and nPerPage
     * @apiName GetAllPlantProtectionProductWarehouses
     * @apiGroup PlantProtectionProductWarehouses
     * @apiExample {curl} Tìm kiếm tất cả thuốc bvtv và phân trang:
     *     curl -i http://localhost:3001/api/warehouse/plant-protection-products?pageNumber=1&nPerPage=20
     * 
     * @apiExample {curl} Tìm kiếm tất cả thuốc bvtv theo HTX và phân trang:
     *     curl -i http://localhost:3001/api/warehouse/plant-protection-products?cooperativeId=HTXNN&pageNumber=1&nPerPage=20
     *
     * @apiHeader {String} authorization Token.
     * 
     * 
     * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
     * @apiParam {Number} nPerPage Số lượng thuốc bvtv trên mỗi trang
     * @apiParam {String} cooperativeId Id của hợp tác xã
     *
     * @apiSucess {Number} totalPages Tổng số lượng trang
     * @apiSucess {String} plantProtectionProductId Id thuốc bảo vệ thực vật
     * @apiSucess {Date} tradeDate Ngày mua (ISO8601 Format)
     * @apiSucess {Number} quantity Số lượng
     * @apiSucess {Date} manufacturingDate Ngày sản xuất (ISO8601 Format)
     * @apiSucess {Date} expiryDate Hạn sử dụng (ISO8601 Format)
     * @apiSucess {String} distributionAgent Đại lý phân phối
     * @apiSucess {Number} quarantineDate Thời gian cách ly
     * @apiSucess {ObjectId} _id Id của dữ liệu thuốc vừa được thêm vào kho
     * @apiSucess {Date} created Thời gian dữ liệu mới được lưu vào db
     *
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "totalPages": 10,
     *      "data": [
     *          {
     *              "_id": "5dfd66fc2ea5880f577c38a4",
     *              "plantProtectionProductId": "5df20540e2b16e4d09842e24",
     *              "tradeDate": "2019-01-14",
     *              "quantity": "2",
     *              "manufacturingDate": "2019-02-18",
     *              "expiryDate": "2019-04-28",
     *              "quarantineDate": "2",
     *              "distributionAgent": "Cty Thuoc Diet Co",
     *              "cooperativeId": "HTXUMH3",
     *              "created": "2019-12-21T00:25:12.075Z",
     *              "plantProtectionProductName": "Abagold 55EC"
     *          },
     *          {
     *              "_id": "5dfd67d3cdb9e2106e3df625",
     *              "plantProtectionProductId": "5df20540e2b16e4d09842e2e",
     *              "tradeDate": "2019-01-14",
     *              "quantity": "2",
     *              "manufacturingDate": "2019-02-18",
     *              "expiryDate": "2019-04-28",
     *              "quarantineDate": "2",
     *              "distributionAgent": "Cty Thuoc Diet Co",
     *              "cooperativeId": "HTXNN",
     *              "created": "2019-12-21T00:31:12.409Z",
     *              "plantProtectionProductName": "Aba-navi 5.5EC"
     *          },
     *          {
     *              "_id": "5dfd67575953c80fe78f9645",
     *              "plantProtectionProductId": "5df20540e2b16e4d09842e33",
     *              "tradeDate": "2019-01-14",
     *              "quantity": "2",
     *              "manufacturingDate": "2019-02-18",
     *              "expiryDate": "2019-04-28",
     *              "quarantineDate": "2",
     *              "distributionAgent": "Cty Thuoc Diet Co",
     *              "cooperativeId": "HTXNN",
     *              "created": "2019-12-21T00:28:03.627Z",
     *              "plantProtectionProductName": "Abasuper 3.6EC"
     *          }   
     *          ...
     *      ]
     *      
     *  }
     * 
     * @apiError Page-not-found Trang tìm kiếm không tồn tại
     * 
     * @apiErrorExample Page not found:
     *     HTTP/1.1 404 Not found
     *     {
     *       "errorMessage": "Trang tìm kiếm không tồn tại"
     *     }
     * 
     * @apiPermission none
     */

    app.get('/api/warehouse/plant-protection-products', (req, res, next) => {
        const query = req.query;

        app.models.plantProtectionProductWarehouse.find(query, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });


    /**
     * @api {get} /api/warehouse/plant-protection-products/:id Get plant protection product warehourses by id
     * @apiName GetPlantProtectionProductWarehousesById
     * @apiGroup PlantProtectionProductWarehouses
     * @apiExample {curl} Tìm kiếm thuốc bvtv trong kho theo id:
     *     curl -i http://localhost:3001/api/warehouse/plant-protection-products/5dfd66fc2ea5880f577c38a4
     *
     * @apiHeader {String} authorization Token.
     * 
     * 
     * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
     * @apiParam {Number} nPerPage Số lượng thuốc bvtv trên mỗi trang
     * @apiParam {String} cooperativeId Id của hợp tác xã
     *
     *
     * @apiSucess {String} plantProtectionProductId Id thuốc bảo vệ thực vật
     * @apiSucess {Date} tradeDate Ngày mua (ISO8601 Format)
     * @apiSucess {Number} quantity Số lượng
     * @apiSucess {Date} manufacturingDate Ngày sản xuất (ISO8601 Format)
     * @apiSucess {Date} expiryDate Hạn sử dụng (ISO8601 Format)
     * @apiSucess {String} distributionAgent Đại lý phân phối
     * @apiSucess {Number} quarantineDate Thời gian cách ly
     * @apiSucess {ObjectId} _id Id của dữ liệu thuốc vừa được thêm vào kho
     * @apiSucess {Date} created Thời gian dữ liệu mới được lưu vào db
     *
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  [
     *      {
     *          "_id": "5dfd66fc2ea5880f577c38a4",
     *          "plantProtectionProductId": "5df20540e2b16e4d09842e24",
     *          "tradeDate": "2019-01-14",
     *          "quantity": "2",
     *          "manufacturingDate": "2019-02-18",
     *          "expiryDate": "2019-04-28",
     *          "quarantineDate": "2",
     *          "distributionAgent": "Cty Thuoc Diet Co",
     *          "cooperativeId": "HTXUMH3",
     *          "created": "2019-12-21T00:25:12.075Z",
     *          "plantProtectionProductName": "Abagold 55EC"
     *      }
     *  ]
     * 
     * @apiError Plant-protection-product-not-found Thuốc bvtv không tồn tại 
     * 
     * @apiErrorExample Plant protection product not found:
     *     HTTP/1.1 404 Not found
     *     {
     *       "errorMessage": "Thuốc bảo vệ thực vật không tồn tại trong kho"
     *     }
     * 
     * @apiPermission none
     */

    app.get('/api/warehouse/plant-protection-products/:id', (req, res, next) => {
        const id = req.params.id;

        app.models.plantProtectionProductWarehouse.findById(id, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });


    /**
     * @api {delete} /api/warehouse/plant-protection-products/:id Delete plant protection product warehouse by id
     * @apiName DeletePlantProtectionProductWarehouseById
     * @apiGroup PlantProtectionProductWarehouses
     *
     * @apiExample {curl} Xóa thuốc bvtv trong kho theo _id:
     *     curl -i http://localhost:3001//apiwarehouse/plant-protection-products/5dfd66fc2ea5880f577c38a4
     * 
     * 
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} _id Id của dữ liệu phân bón được lưu trong kho (NOT plantProtectionProductId)
     * 
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *     "successMessage": "Thuốc bảo vệ thực vật được xóa khỏi kho thành công"
     *  }
     *
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     * {
     *     "errorMessage": "Thuốc bảo vệ thực vật không tồn tại trong kho"
     * }
     *
     * @apiPermission manager-admin
     */

    app.delete('/api/warehouse/plant-protection-products/:id', (req, res, next) => {
        const id = req.params.id;

        app.models.plantProtectionProductWarehouse.deleteById(id, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });


    /**
     * @api {patch} /api/warehouse/plant-protection-products/:id Update plant protection product warehouse by id
     * @apiName UpdatePlantProtectionProductWarehouseById
     * @apiGroup PlantProtectionProductWarehouses
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/warehouse/plant-protection-products/5dfd66fc2ea5880f577c38a4
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} plantProtectionProductId Id thuốc bảo vệ thực vật
     * @apiParam {Date} tradeDate Ngày mua (ISO8601 Format)
     * @apiParam {Number} quantity Số lượng
     * @apiParam {Date} manufacturingDate Ngày sản xuất (ISO8601 Format)
     * @apiParam {Date} expiryDate Hạn sử dụng (ISO8601 Format)
     * @apiParam {String} distributionAgent Đại lý phân phối
     * @apiParam {Number} quarantineDate Thời gian cách ly
     *
     * @apiParamExample {json} Request-Example:
     * {
     *     {
     *          "plantProtectionProductId": "5df20540e2b16e4d09842e2e",
     *          "tradeDate": "2019-12-12",
     *          "quantity": "99",
     *          "manufacturingDate": "2019-12-12",
     *          "expiryDate": "2020-12-12",
     *          "distributionAgent": "updated",
     *          "quarantineDate": "99",
     *          "cooperativeId": "HTXNN"
     *      }
     * }
     *
     * @apiSuccess {String} plantProtectionProductId Id thuốc bảo vệ thực vật
     * @apiSuccess {Date} tradeDate Ngày mua (ISO8601 Format)
     * @apiSuccess {Number} quantity Số lượng
     * @apiSuccess {Date} manufacturingDate Ngày sản xuất (ISO8601 Format)
     * @apiSuccess {Date} expiryDate Hạn sử dụng (ISO8601 Format)
     * @apiSuccess {String} distributionAgent Đại lý phân phối
     * @apiSuccess {Number} quarantineDate Thời gian cách ly
     * @apiSuccess {ObjectId} _id Id của dữ liệu thuốc vừa được thêm vào kho
     * @apiSuccess {Date} created Thời gian dữ liệu mới được lưu vào db
     *
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *     "_id": "5dfd66fc2ea5880f577c38a4",
     *     "plantProtectionProductId": "5df20540e2b16e4d09842e2e",
     *     "tradeDate": "2019-12-12",
     *     "quantity": "99",
     *     "manufacturingDate": "2019-12-12",
     *     "expiryDate": "2020-12-12",
     *     "quarantineDate": "99",
     *     "distributionAgent": "updated",
     *     "cooperativeId": "HTXNN",
     *     "created": "2019-12-21T02:55:59.859Z"
     * }
     *
     * @apiError tradeDate-must-be-a-date Trường tradeDate phải là ngày với định dạng ISO8601
     * @apiError manufacturingDate-must-be-a-date Trường manufacturingDate phải là ngày với định dạng ISO8601
     * @apiError expiryDate-must-be-a-date Trường expiryDate phải là ngày với định dạng ISO8601
     * @apiError quantity-must-be-a-number Trường quantity phải là số nguyên dương
     * @apiError quarantineDate-must-be-a-number Trường quarantineDate phải là số nguyên dương
     * @apiError plant-protection-product-not-found Không tìm thấy thuốc bảo vệ thực vật trong danh mục
     * @apiError cooperative-not-found Không tìm thấy HTX 
     *  
     * @apiErrorExample Thuốc bvtv không tồn tại:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Thuốc bảo vệ thực vật không tồn tại trong danh mục"
     *     }
     * 
     * @apiErrorExample HTX không tồn tại:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Hợp tác xã không tồn tại"
     *     }
     *
     * 
     * @apiErrorExample Trường quantity phải là số nguyên dương:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Số lượng phải là số nguyên dương"
     *     }
     *
     * 
     * @apiErrorExample Trường quarantineDate phải là số nguyên dương:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Thời gian cách ly phải là số nguyên dương"
     *     }
     * 
     * 
     * @apiErrorExample Trường manufacturingDate phải là định dạng ngày:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Ngày sản xuất không hợp lệ"
     *     }
     * 
     * @apiErrorExample Trường expiryDate phải là định dạng ngày:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Hạn sử dụng không hợp lệ"
     *     }
     * 
     * @apiErrorExample Trường tradeDate phải là định dạng ngày:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Ngày mua không hợp lệ"
     *     }
     * 
     *
     * @apiPermission none
     */

    app.patch('/api/warehouse/plant-protection-products/:id', (req, res, next) => {
        const id = req.params.id;
        const update = req.body;

        app.models.plantProtectionProductWarehouse.updateById(id, update, (err, info) => {
            return err ? errorHandle(res, err, 400) : responseHandle(res, info);
        });
    });




    // *************************************************************************** //
    // ROUTES FOR SCOPE OF USE
    app.get("/api/scope-of-uses/plant-protection-products", (req, res, next) => {
        const query = req.query;

        app.models.scopeOfUse.findAllProducts(query, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });





    // *************************************************************************** //
    // ROUTES FOR FERTILIZER
    /**
     * @api {get} /api/fertilizers Get all fertilizers with pageNumber and nPerPage
     * @apiName GetAllFertilizers
     * @apiGroup Fertilizers
     * @apiExample {curl} Tìm kiếm phân bón:
     *     curl -i http://localhost:3001/api/fertilizers?pageNumber=9&nPerPage=20
     *
     * @apiHeader {String} authorization Token.
     * 
     * 
     * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
     * @apiParam {Number} nPerPage Số lượng thuốc bvtv trên mỗi trang
     *
     *
     * @apiSuccess {Number} totalPages Tổng số lượng trang
     * @apiSuccess {String} ministry Bộ
     * @apiSuccess {String} province Tỉnh
     * @apiSuccess {String} enterprise Tên doanh nghiệp
     * @apiSuccess {String} type Loại phân bón
     * @apiSuccess {String} name Tên phân bón
     * @apiSuccess {String} ingredient Thành phần, hàm lượng chất dinh dưỡng
     * @apiSuccess {String} lawDocument Căn cứ, tiêu chuẩn, quy định
     * @apiSuccess {String} isoCertOrganization Tổ chức chứng nhận hợp quy
     * @apiSuccess {String} manufactureAndImport Nhập khẩu, xuất khẩu
     *
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "totalPages": 708,
     *      "data": [
     *          {
     *              "_id": "5de75a92f4e889141cc24ee8",
     *              "ministry": "Công thương",
     *              "province": "Bà Rịa - Vũng Tàu",
     *              "enterprise": "Công ty TNHH YARA Việt Nam",
     *              "type": "Phân vô cơ",
     *              "name": "Phân bón NPK Kristalon Scarlet (7.5-12-36+TE)",
     *              "ingredient": "Nts: 7,5%; P2O5hh: 12%; K2Ohh: 36%; S: 4%; B: 0,025%; Cu: 0,01%; Fe: 0,07%; Zn: 0,025%; Mn: 0,04%; Mo: 0,004%; Độ ẩm: 0,8%",
     *              "lawDocument": "Nts: 7,5%; P2O5hh: 12%; K2Ohh: 36%; S: 4%; B: 0,025%; Cu: 0,01%; Fe: 0,07%; Zn: 0,025%; Mn: 0,04%; Mo: 0,004%; Độ ẩm: 0,8%",
     *              "isoCertOrganization": "",
     *              "manufactureAndImport": "",
     *              "created": "2019-12-04T07:04:50.952Z"
     *          },
     *          {
     *              "_id": "5de75a92f4e889141cc24efd",
     *              "ministry": "Công thương",
     *              "province": "Bà Rịa - Vũng Tàu",
     *              "enterprise": "Công ty TNHH YARA Việt Nam",
     *              "type": "Phân vô cơ",
     *              "name": "Phân bón NPK 15-9-20+TE",
     *              "ingredient": "Nts: 15%; P2O5hh: 9%; K2Ohh: 20%; MgO: 1,8%; S: 3,8%; B: 0,015%; Mn: 0,02%; Zn: 0,02%; Độ ẩm 0,8%",
     *              "lawDocument": "Nts: 15%; P2O5hh: 9%; K2Ohh: 20%; MgO: 1,8%; S: 3,8%; B: 0,015%; Mn: 0,02%; Zn: 0,02%; Độ ẩm 0,8%",
     *              "isoCertOrganization": "",
     *              "manufactureAndImport": "",
     *              "created": "2019-12-04T07:04:50.956Z"
     *          },
     *          {
     *              "_id": "5de75a92f4e889141cc24f7d",
     *              "ministry": "Công thương",
     *              "province": "Bà Rịa - Vũng Tàu",
     *              "enterprise": "Công ty TNHH Sản xuất NGÔI SAO VÀNG",
     *              "type": "Phân vô cơ",
     *              "name": "Phân vi lượng TE MAX ( SUPER CHELATE)",
     *              "ingredient": "",
     *              "lawDocument": "",
     *              "isoCertOrganization": "",
     *              "manufactureAndImport": "",
     *              "created": "2019-12-04T07:04:50.974Z"
     *          },
     *          ...
     *      ]
     *  }
     * 
     * @apiPermission none
     */


    app.get("/api/fertilizers", (req, res, next) => {
        const query = req.query;

        app.models.fertilizer.find(query, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });


    /**
     * @api {get} /api/fertilizers Get fertilizer by query
     * @apiName GetFertilizerByQuery
     * @apiGroup Fertilizers
     * 
     * @apiExample {curl} Tìm kiếm phân bón theo _id:
     *     curl -i http://localhost:3001/api/fertilizers/query?_id=5de75a92f4e889141cc24ef5
     * @apiExample {curl} Tìm kiếm phân bón theo tên:
     *     curl -i http://localhost:3001/api/fertilizers/query?name=Phân bón Calcium Nitrate( Calcinit)
     *
     * @apiHeader {String} authorization Token.
     * 
     * 
     * @apiParam {Number} pageNumber Số trang cần lấy
     * @apiParam {Number} nPerPage Số lượng thuốc bvtv trên mỗi trang
     *
     *
     * @apiSuccess {String} ministry Bộ
     * @apiSuccess {String} province Tỉnh
     * @apiSuccess {String} enterprise Tên doanh nghiệp
     * @apiSuccess {String} type Loại phân bón
     * @apiSuccess {String} name Tên phân bón
     * @apiSuccess {String} ingredient Thành phần, hàm lượng chất dinh dưỡng
     * @apiSuccess {String} lawDocument Căn cứ, tiêu chuẩn, quy định
     * @apiSuccess {String} isoCertOrganization Tổ chức chứng nhận hợp quy
     * @apiSuccess {String} manufactureAndImport Nhập khẩu, xuất khẩu
     *
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *      {
     *          "_id": "5de75a92f4e889141cc24ef5",
     *          "ministry": "Công thương",
     *          "province": "Bà Rịa - Vũng Tàu",
     *          "enterprise": "Công ty TNHH YARA Việt Nam",
     *          "type": "Phân vô cơ",
     *          "name": "Phân bón Calcium Nitrate( Calcinit)",
     *          "ingredient": "Nts: 15,4%; CaO: 26,5%; Độ ẩm: 0,8%",
     *          "lawDocument": "Nts: 15,4%; CaO: 26,5%; Độ ẩm: 0,8%",
     *          "isoCertOrganization": "",
     *          "manufactureAndImport": "",
     *          "created": "2019-12-04T07:04:50.955Z"
     *      }
     * 
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not found
     *     {
     *       "errorMessage": "Không tìm thấy phân bón"
     *     }
     * @apiPermission none
     */

    app.get("/api/fertilizers/query", (req, res, next) => {
        const query = req.query;

        app.models.fertilizer.findByQuery(query, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });



    /**
     * @api {post} /api/fertilizers Create new fertilizer
     * @apiName CreateFertilizer
     * @apiGroup Fertilizers
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/fertilizers
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} ministry Bộ
     * @apiParam {String} province Tỉnh
     * @apiParam {String} enterprise Tên doanh nghiệp
     * @apiParam {String} type Loại phân bón
     * @apiParam {String} name Tên phân bón
     * @apiParam {String} ingredient Thành phần, hàm lượng chất dinh dưỡng
     * @apiParam {String} lawDocument Căn cứ, tiêu chuẩn, quy định
     * @apiParam {String} isoCertOrganization Tổ chức chứng nhận hợp quy
     * @apiParam {String} manufactureAndImport Nhập khẩu, xuất khẩu
     *
     *
     * @apiParamExample {json} Request-Example:
     * 
     *  {
     *      "ministry": "Công thương",
     *      "province": "Bà Rịa - Vũng Tàu",
     *      "enterprise": "Công ty TNHH Sản xuất NGÔI SAO VÀNG",
     *      "type": "Phân vô cơ",
     *      "name": "Phân vi lượng TE MAX ( SUPER CHELATE)",
     *      "ingredient": "",
     *      "lawDocument": "",
     *      "isoCertOrganization": "",
     *      "manufactureAndImport": ""
     *  }
     *
     * @apiSuccess {String} ministry Bộ
     * @apiSuccess {String} province Tỉnh
     * @apiSuccess {String} enterprise Tên doanh nghiệp
     * @apiSuccess {String} type Loại phân bón
     * @apiSuccess {String} name Tên phân bón
     * @apiSuccess {String} ingredient Thành phần, hàm lượng chất dinh dưỡng
     * @apiSuccess {String} lawDocument Căn cứ, tiêu chuẩn, quy định
     * @apiSuccess {String} isoCertOrganization Tổ chức chứng nhận hợp quy
     * @apiSuccess {String} manufactureAndImport Nhập khẩu, xuất khẩu
     *
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  
     *  {
     *      "_id": "5de75a92f4e889141cc24f7d",
     *      "ministry": "Công thương",
     *      "province": "Bà Rịa - Vũng Tàu",
     *      "enterprise": "Công ty TNHH Sản xuất NGÔI SAO VÀNG",
     *      "type": "Phân vô cơ",
     *      "name": "Phân vi lượng TE MAX ( SUPER CHELATE)",
     *      "ingredient": "",
     *      "lawDocument": "",
     *      "isoCertOrganization": "",
     *      "manufactureAndImport": "",
     *      "created": "2019-12-04T07:04:50.974Z"
     *  }
     *
     * @apiError Name-is-required Thiếu trường tên phân bón
     * @apiError Fertilizer-exists Phân bón đã tồn tại
     * @apiErrorExample Phân bón tồn tại:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Phân bón với tên '" + name + "' đã tồn tại"
     *     }
     * 
     * @apiErrorExample Thiếu trường tên phân bón:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "errorMessage": "Vui lòng nhập tên phân bón"
     *     }
     * @apiPermission none
     */
    app.post("/api/fertilizers", (req, res, next) => {
        const body = req.body;

        app.models.fertilizer.create(body, (err, info) => {
            return err ? errorHandle(res, err.errorMessage, 409) : responseHandle(res, info, 201);
        });
    });


    /**
     * @api {patch} /api/fertilizers Update fertilizer
     * @apiName UpdateFertilizer
     * @apiGroup Fertilizers
     * @apiExample {curl} Update phân bón theo _id:
     *     curl -i http://localhost:3001/api/fertilizers?_id=5de75a92f4e889141cc24f7d
     * 
     * @apiExample {curl} Update phân bón theo tên:
     *     curl -i http://localhost:3001/api/fertilizers?_name=Phân vi lượng TE MAX ( SUPER CHELATE)
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} ministry Bộ
     * @apiParam {String} province Tỉnh
     * @apiParam {String} enterprise Tên doanh nghiệp
     * @apiParam {String} type Loại phân bón
     * @apiParam {String} name Tên phân bón
     * @apiParam {String} ingredient Thành phần, hàm lượng chất dinh dưỡng
     * @apiParam {String} lawDocument Căn cứ, tiêu chuẩn, quy định
     * @apiParam {String} isoCertOrganization Tổ chức chứng nhận hợp quy
     * @apiParam {String} manufactureAndImport Nhập khẩu, xuất khẩu
     *
     *
     * @apiParamExample {json} Request-Example:
     * 
     *  {
     *      "ministry": "updated",
     *      "province": "updated",
     *      "enterprise": "updated",
     *      "type": "updated",
     *      "name": "updated",
     *      "ingredient": "updated",
     *      "lawDocument": "updated",
     *      "isoCertOrganization": "updated",
     *      "manufactureAndImport": "updated"
     *  }
     *
     * @apiSuccess {String} ministry Bộ
     * @apiSuccess {String} province Tỉnh
     * @apiSuccess {String} enterprise Tên doanh nghiệp
     * @apiSuccess {String} type Loại phân bón
     * @apiSuccess {String} name Tên phân bón
     * @apiSuccess {String} ingredient Thành phần, hàm lượng chất dinh dưỡng
     * @apiSuccess {String} lawDocument Căn cứ, tiêu chuẩn, quy định
     * @apiSuccess {String} isoCertOrganization Tổ chức chứng nhận hợp quy
     * @apiSuccess {String} manufactureAndImport Nhập khẩu, xuất khẩu
     *
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  
     *  {
     *      "_id": "5de75a92f4e889141cc24f7d",
     *      "ministry": "updated",
     *      "province": "updated",
     *      "enterprise": "updated",
     *      "type": "updated",
     *      "name": "updated",
     *      "ingredient": "updated",
     *      "lawDocument": "updated",
     *      "isoCertOrganization": "updated",
     *      "manufactureAndImport": "updated",
     *      "created": "2019-12-04T07:04:50.974Z"
     *  }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not found
     *     {
     *       "errorMessage": "Không tìm thấy phân bón"
     *     }
     * @apiPermission none
     */
    app.patch("/api/fertilizers", (req, res, next) => {
        const query = req.query;
        const update = req.body;

        app.models.fertilizer.update(query, update, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });

    /**
     * @api {delete} /api/fertilizers Delete fertilizer
     * @apiName DeleteFertilizer
     * @apiGroup Fertilizers
     *
     * @apiExample {curl} Xóa phân bón theo _id:
     *     curl -i http://localhost:3001/api/fertilizers?_id=5de75a92f4e889141cc24ef5
     *    
     * @apiExample {curl} Xóa phân báo theo tên:
     *     curl -i http://localhost:3001/api/fertilizers?name=Phân bón Calcium Nitrate( Calcinit)
     * 
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} _id ID của phân bón
     * @apiParam {String} name Tên của phân bón
     * 
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *     "successMessage": "Xóa phân bón thành công"
     *  }
     *
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     * {
     *     "errorMessage": "Không tìm thấy phân bón"
     * }
     *
     * @apiPermission manager-admin
     */
    app.delete("/api/fertilizers", (req, res, next) => {
        const query = req.query;

        app.models.fertilizer.delete(query, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });
};