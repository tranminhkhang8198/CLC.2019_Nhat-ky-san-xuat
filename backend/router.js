const _ = require('lodash');

exports.routers = (app) => {

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
    const verifyUser = (req, resource, cb = () => {}) => {
        //Verify token
        let tokenId = req.get('authorization');
        if (!tokenId) {
            tokenId = req.query.token;
        }
        if (!tokenId) {
            return cb({
                errorMessage: "Access denied"
            }, null);
        }

        app.models.token.verify(tokenId, (err, token) => {

            if (err) {
                return cb({
                    errorMessage: "Access denied"
                }, null);
            } else {
                _.unset(token.user, 'password')
                // Check permission
                app.models.permission.checkPermission(token.user._id, resource, req.method, (err, permission) => {

                    if (err) {
                        return cb({
                            errorMessage: "Access denied"
                        }, null);
                    } else {
                        if (permission) {

                            return cb(null, permission);
                        } else {
                            return cb({
                                errorMessage: "Access denied"
                            }, null);
                        }
                    }
                })
            }
        })


    }





    /**
     * @method GET
     * @endpoint /
     * @description Root api
     * 
     */
    app.get('/', (req, res) => {
        return res.json({
            version: '1.0'
        });
    });


    /**
     * @api {post} /users/ Create new user
     * @apiName CreateUser
     * @apiGroup User
     *
     * @apiParam {String} name Ten nguoi su dung
     * @apiParam {String} personalId So CMND cua nguoi su dung
     * @apiParam {String} address Dia chi cua nguoi su dung
     * @apiParam {String} phone So dien thoai cua nguoi su dung
     * @apiParam {String} email Dia chi email cua nguoi su dung
     * @apiParam {String} user Chuc vu cua nguoi su dung
     * @apiParam {String} HTXId ID cua hop tac xa
     * @apiParam {String} password Mat khau cua nguoi su dung
     * 
     * @apiSuccess {String} name Ten nguoi su dung
     * @apiSuccess {String} personalId So CMND cua nguoi su dung
     * @apiSuccess {String} phone So dien thoai cua nguoi su dung
     * @apiSuccess {String} email Dia chi email cua nguoi su dung
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
    app.post('/api/users/', (req, res, next) => {

        const body = req.body;
        const resource = 'user';
        verifyUser(req, resource, (err, result) => {
            if (err) {
                _.unset(body, 'user');
                app.models.user.create(body, (err, info) => {

                    console.log(info)
                    return err ? errorHandle(res, err, 503) : responseHandle(res, info);

                });
            } else {
                app.models.user.create(body, (err, info) => {

                    console.log(info)
                    return err ? errorHandle(res, err, 503) : responseHandle(res, info);

                });
            }
        })


    });


    /**
     * @api {post} /login/ Login user
     * @apiName LoginUser
     * @apiGroup User
     *
     * @apiParam {String} phone So dien thoai cua nguoi su dung
     * @apiParam {String} password Mat khau cua nguoi su dung
     * 
     * @apiSuccess {String} _id ID token
     * @apiSuccess {String} created Ngay login
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "created": "2019-11-12T13:43:57.518Z",
     *      "_id": "5dcab71db87686272aeb80f4"
     *  }
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
    app.post('/api/login', (req, res, next) => {
        const body = req.body;

        app.models.user.login(body, (err, result) => {

            return err ? errorHandle(res, err, 504) : responseHandle(res, result);
        });
    });

    /**
     * @api {get} /users/me Get user info from token
     * @apiName CheckToken
     * @apiGroup User
     *
     * @apiParam {String} token Token ID
     * 
     * @apiSuccess {String} _id ID token
     * @apiSuccess {String} created Ngay tao token
     * @apiSuccess {Object} user Thong tin cua user
     * @apiSuccess {String} user._id ID cua user
     * @apiSuccess {String} user.name Ten cua user
     * @apiSuccess {String} user.personalId So CMND cua user
     * @apiSuccess {String} user.address Dia chi cua user
     * @apiSuccess {String} user.phone So dien thoai cua user
     * @apiSuccess {String} user.email Dia chi email cua user
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
     *          "HTXId": "115",
     *      }
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
    app.get('/api/users/me', (req, res, next) => {

        let tokenId = req.get('authorization');
        if (!tokenId) {
            tokenId = req.query.token;
        }

        if (!tokenId) {
            return errorHandle(res, "Access denied", 505);
        }

        app.models.token.verify(tokenId, (err, result) => {
            if (err) {
                return errorHandle(res, "Access denied");
            } else {
                _.unset(result.user, 'password')
                return responseHandle(res, result, 200)
            }
        })
    })

    /**
     * @api {get} /users/:userId Get user info from id
     * @apiName GetToken
     * @apiGroup User
     *
     * @apiParam {String} userId User ID hoac gia tri "all" voi yeu cau tat ca user
     * 
     * @apiSuccess {String} _id ID cua user
     * @apiSuccess {String} name Ten cua user
     * @apiSuccess {String} personalId So CMND cua user
     * @apiSuccess {String} address Dia chi cua user
     * @apiSuccess {String} phone So dien thoai cua user
     * @apiSuccess {String} email Dia chi email cua user
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
    app.get('/api/users/:userId', (req, res, next) => {

        const userId = req.params.userId;
        if (!userId || userId.length == 0) {
            return errorHandle(res, "User ID is invalid", 501);
        }
        const resource = "user"
        verifyUser(req, resource, (err, permission) => {
            if (err) {
                errorHandle(res, "Permission denied");
            } else {
                app.models.user.get(userId, (err, data) => {
                    return err ? errorHandle(res, "Users are not found", 503) : responseHandle(res, data);
                })
            }
        })

    })

    app.patch('/api/users', (req, res, next) => {
        const resource = 'user';
        verifyUser(req, resource, (err, allow) => {
            if (err) {
                return errorHandle(res, "Access denied", 503);
            } else {
                // process task
                const body = req.body
                app.models.user.update(body, (err, user) => {
                    return err ? errorHandle(res, err.errorMessage) : responseHandle(res, user);
                })
            }
        })
    })

    /**
     * @method POST
     * @endpoint /api/roles/create
     * @description Create new role
     * 
     */
    app.post('/api/roles/create', (req, res, next) => {
        const body = req.body;
        app.models.role.create(body, (err, role) => {
            return err ? errorHandle(res, "error creating new role", 501) : responseHandle(res, role)
        })
    })

    /**
     * @method POST
     * @endpoint /api/resources/create
     * @description Create new resources
     * 
     */
    app.post('/api/resources/create', (req, res, next) => {
        body = req.body;
        app.models.resource.create(body, (err, role) => {
            return err ? errorHandle(res, "error creating new resource", 501) : responseHandle(res, role)
        })
    })


    // *************************************************************************** //
    // ROUTES FOR PLANT PROTECTION PRODUCT

    /**
     * @method GET
     * @endpoint /api/plant-protection-products
     * @description Get All Plant Protection Product in Database
     * 
     */
    app.get('/api/plant-protection-products', (req, res, next) => {
        app.models.plantProtectionProduct.find((err, info) => {
            return err ? errorHandle(res, err, 404) : responseHandle(res, info);
        });
    });

    /**
     * @method POST
     * @endpoint /api/plant-protection-products
     * @description Create New Plant Protection Product
     * 
     */
    app.post('/api/plant-protection-products', (req, res, next) => {
        const body = req.body;

        app.models.plantProtectionProduct.create(body, (err, info) => {
            return err ? errorHandle(res, err, 201) : responseHandle(res, info);
        });
    });
};