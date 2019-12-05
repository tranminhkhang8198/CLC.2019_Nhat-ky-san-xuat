const _ = require("lodash");

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
            error: errorMessage
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
     * @apiName CreateUser
     * @apiGroup User
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/users
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} name Ten nguoi su dung
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
    app.post("/api/users/", (req, res, next) => {
        const body = req.body;
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

    /**
     * @api {post} /login Login user
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
                    return errorHandle(res, err.errorMessage, 403);
                } else {
                    return responseHandle(res, result);
                }
            });
        }
    });

    /**
     * @api {post} /refresh_token Xac thuc lay access token moi
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
     *              "administrator":"GUDP",
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

    /**
     * @api {get} /api/cooperatives Tim kiem thong tin HTX
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
     * @apiSuccess {String} firstname Firstname of the User.
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "nModified": "4"
     *  }
     * @apiError Permission-denied Token khong hop le
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     *     {
     *       "error": "Nothing to update"
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

    app.patch('/api/cooperatives', (req, res, next) => {
        const body = req.body;
        app.models.cooperative.update(body, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage, 404);
            }
            else {
                return responseHandle(res, result);
            }
        })
    })

    app.delete('/api/cooperatives', (req, res, next) => {
        const body = req.body;
        app.models.cooperative.remove(body, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage, 404);
            }
            else {
                return responseHandle(res, result);
            }
        })
    })

    app.post('/api/diary', (req, res, next) => {
        const body = req.body;
        app.models.diary.create(body, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage, 404);
            }
            else {
                return responseHandle(res, result);
            }
        })
    })

    app.get('/api/diary', (req, res, next) => {
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

    app.patch('/api/diary', (req, res, next) => {
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

    app.delete('/api/diary', (req, res, next) => {
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









    // *************************************************************************** //
    // ROUTES FOR PLANT PROTECTION PRODUCT

    /**
     * @api {get} /plant-protection-product Get all plant protection product
     * @apiName GetAllPlantProtectionProduct
     * @apiGroup PlantProtectionProduct
     * @apiExample {curl} Tìm kiếm thuốc bảo vệ thực vật:
     *     curl -i http://localhost:3001/api/plant-protection-products?pageNumber=9&nPerPage=20
     *
     * @apiHeader {String} authorization Token.
     * 
     * 
     * @apiParam {Number} pageNumber Số trang cần lấy
     * @apiParam {Number} nPerPage Số lượng thuốc bvtv trên mỗi trang
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
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  [
     *      {
     *          "_id": "5dce66cb5c25ee6da0a29ac8",
     *          "name": " Ababetter  3.6EC",
     *          "activeIngredient": "Abamectin",
     *          "content": "36g/l",
     *          "plantProtectionProductGroup": "",
     *          "ghs": "",
     *          "who": "2",
     *          "created": "2019-11-15T08:50:19.842Z",
     *          "scopeOfUse": [
     *              {
     *                  "_id": "5dce66cc5c25ee6da0a29ac9",
     *                  "pppId": "5dce66cb5c25ee6da0a29ac8",
     *                  "plant": "dưa hấu",
     *                  "pest": "bọ trĩ",
     *                  "dosage": "0.2 - 0.3 lít/ha",
     *                  "phi": "7",
     *                  "usage": "Lượng nước phun 400 lít/ha. Phun tkhi mật độ \r\nbọ trĩ  2-3 con/ ngọn",
     *                  "created": "2019-11-15T08:50:20.100Z"
     *              }
     *          ],
     *          "registrationInfo": {
     *              "_id": "5dce66cc5c25ee6da0a29acd",
     *              "pppId": "5dce66cb5c25ee6da0a29ac8",
     *              "registrationUnit": "Công ty TNHH MTV Lucky",
     *              "registrationUnitAddress": "",
     *              "manufacturer": "Hebei Yetian Agrochemicals Co., Ltd.",
     *              "manufacturerAddress": "Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.",
     *              "created": "2019-11-15T08:50:20.107Z"
     *          }
     *      },
     *      {
     *          "_id": "5dce66e25c25ee6da0a29ace",
     *          "name": " Ababetter  5EC",
     *          "activeIngredient": "Abamectin",
     *          "content": "50g/l",
     *          "plantProtectionProductGroup": "",
     *          "ghs": "",
     *          "who": "2",
     *          "created": "2019-11-15T08:50:42.728Z",
     *          "scopeOfUse": [
     *              {
     *                  "_id": "5dce66e25c25ee6da0a29acf",
     *                  "pppId": "5dce66e25c25ee6da0a29ace",
     *                  "plant": "lúa",
     *                  "pest": "sâu cuốn lá",
     *                  "dosage": "150 - 250 ml/ha",
     *                  "phi": "",
     *                  "usage": "Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2",
     *                  "created": "2019-11-15T08:50:42.728Z"
     *              },
     *              {
     *                  "_id": "5dce66e25c25ee6da0a29ad0",
     *                  "pppId": "5dce66e25c25ee6da0a29ace",
     *                  "plant": "quýt",
     *                  "pest": "nhện đỏ",
     *                  "dosage": "0.0375 - 0.0625%",
     *                  "phi": "",
     *                  "usage": "Phun ướt đều plant khi mật độ khoảng \r\n5 - 6 con/ lá",
     *                  "created": "2019-11-15T08:50:42.728Z"
     *              }
     *          ],
     *          "registrationInfo": {
     *              "_id": "5dce66e25c25ee6da0a29ad1",
     *              "pppId": "5dce66e25c25ee6da0a29ace",
     *              "registrationUnit": "Công ty TNHH MTV Lucky",
     *              "registrationUnitAddress": "",
     *              "manufacturer": "Hebei Yetian Agrochemicals Co., Ltd.",
     *              "manufacturerAddress": "Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.",
     *              "created": "2019-11-15T08:50:42.728Z"
     *          }
     *      }
     *  ]
     * 
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Conflict
     *     {
     *       "error": ""
     *     }
     * @apiPermission none
     */



    app.get("/api/plant-protection-products", (req, res, next) => {
        const query = req.query;

        app.models.plantProtectionProduct.find(query, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });

    /**
     * @api {get} /plant-protection-products/:id Get plant protection product by query
     * @apiName GetPlantProtectionProductByQuery
     * @apiGroup PlantProtectionProduct
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
     * @apiParam {String} plantProtectionProductGroup Nhóm thuốc 
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
     *       "error": "Không tìm thấy thuốc bảo vệ thực vật"
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
     * @api {post} /plant-protection-product Create new plant protection product
     * @apiName CreatePlantProtectionProduct
     * @apiGroup PlantProtectionProduct
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
     * @apiError Name-is-required Thieu truong thuoc bao ve thuc vat
     * @apiError GHS-must-be-a-number Truong GHS phai la so
     * @apiError WHO-must-be-a-number Truong WHO phai la so
     * @apiError PHI-must-be-a-number Truong PHI phai la so
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 409 Conflict
     *     {
     *       "error": "Thuốc bảo vệ thực vật với tên '" + name + "' đã tồn tại."
     *     }
     * @apiPermission none
     */
    app.post("/api/plant-protection-products", (req, res, next) => {
        const body = req.body;

        app.models.plantProtectionProduct.create(body, (err, info) => {
            return err ? errorHandle(res, err, 201) : responseHandle(res, info);
        });
    });


    /**
     * @api {patch} /plant-protection-products/:id Update plant protection product by query
     * @apiName UpdatePlantProtectionProductByQuery
     * @apiGroup PlantProtectionProduct
     *
     * @apiExample {curl} Example usage:
     *     curl -i http://localhost:3001/api/plant-protection-products/
     *
     * @apiHeader {String} authorization Token.
     *
     * @apiParam {String} _id ID của thuốc bảo vệ thực vật
     * @apiParam {String} name Ten cua thuoc bao ve thuc vat
     * @apiParam {String} plant Cây trồng
     * @apiParam {String} pest Dịch hại
     * @apiParam {String} registrationUnit Don vi dang ki
     * @apiParam {String} manufacturer Nhà sản xuất
     *
     * @apiParamExample {json} Update sử dụng _id thuốc bvtv
     * {
     *     "query": {
     *         "_id": "5dce66cb5c25ee6da0a29ac8"
     *     },
     *     "update": {
     *         "name": "updated",
     *         "activeIngredient": "updated",
     *         "content": "updated",
     *         "plantProtectionProductGroup": "updated",
     *         "ghs": "20",
     *         "who": "20",
     *         "scopeOfUse": {
     *             "plant": "updated",
     *             "pest": "updated",
     *             "dosage": "updated",
     *             "phi": "updated",
     *             "usage": "updated"
     *         },
     *         "registrationInfo": {
     *             "registrationUnit": "updated",
     *             "registrationUnitAddress": "updated",
     *             "manufacturer": "updated",
     *             "manufacturerAddress": "updated"
     *         }
     *     }
     * }
     *
     * @apiParamExample {json} Update sử dụng tên thuốc bvtv
     * {
     *     "query": {
     *         "name": " Ababetter  3.6EC"
     *     },
     *     "update": {
     *         "name": "updated",
     *         "activeIngredient": "updated",
     *         "content": "updated",
     *         "plantProtectionProductGroup": "updated",
     *         "ghs": "20",
     *         "who": "20",
     *         "scopeOfUse": {
     *             "plant": "updated",
     *             "pest": "updated",
     *             "dosage": "updated",
     *             "phi": "updated",
     *             "usage": "updated"
     *         },
     *         "registrationInfo": {
     *             "registrationUnit": "updated",
     *             "registrationUnitAddress": "updated",
     *             "manufacturer": "updated",
     *             "manufacturerAddress": "updated"
     *         }
     *     }
     * }
     *
     * @apiParamExample {json} Update thông tin theo đơn vị đăng kí
     * {
     *     "query": {
     *         "registrationInfo": {
     *             "registrationUnit": "Công ty TNHH MTV Lucky"
     *         }
     *     },
     *     "update": {
     *         "registrationUnitAddress": "updated"
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
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *     "name": "Ababetter  3.6EC",
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
     *       "error": "Không tìm thấy thuốc bảo vệ thực vật phù hợp!"
     *     }
     *
     * @apiPermission manager-admin
     */
    app.patch("/api/plant-protection-products", (req, res, next) => {
        const query = req.query;
        const update = req.body.update;

        app.models.plantProtectionProduct.update(query, update, (err, info) => {
            return err ? errorHandle(res, err, 204) : responseHandle(res, info);
        });
    });

    /**
     * @api {delete} /plant-protection-products/ Delete plant protection product by query
     * @apiName DeletePlantProtectionProductByQuery
     * @apiGroup PlantProtectionProduct
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
     *     "success": "Xóa thuốc bảo vệ thực vật thành công"
     *  }
     *
     *
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     * {
     *     "error": "Không tìm thấy thuốc bảo vệ thực vật"
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


    app.get("/api/scope-of-uses", (req, res, next) => {
        const query = req.query;

        app.models.scopeOfUse.findPestByPlant(query, (err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });

    // app.get("/api/scope-of-uses/plant-protection-product", (req, res, next) => {
    //     const query = req.query;

    //     app.models.scopeOfUse.findAllProductForPest(query, (err, info) => {
    //         return err ? errorHandle(res, err, 404) : responseHandle(res, info);
    //     });
    // });

    // app.get("/api/scope-of-uses", (req, res, next) => {
    //     const query = req.query;

    //     app.models.scopeOfUse.findByQuery(query, (err, info) => {
    //         return err ? errorHandle(res, err, 404) : responseHandle(res, info);
    //     });
    // });
};