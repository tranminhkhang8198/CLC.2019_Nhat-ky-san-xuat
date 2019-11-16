const _ = require('lodash');

exports.routers = (app) => {
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
    const verifyUser = (req, resource, cb = () => {}) => {
        //Verify token
        let token = req.get('authorization');
        if (!token) {
            token = req.query.token;
        }
        if (!token) {
            return cb({
                errorMessage: "Access denied"
            }, null);
        }

        app.models.token.verify(token, (err, result) => {

            if (err) {
                return cb({
                    err
                }, null);
            } else {
                // Check permission
                app.models.permission.checkPermission(result._id, resource, req.method, (err, permission) => {

                    if (err) {
                        return cb({
                            errorMessage: "Loi trong qua trinh kiem tra quyen truy cap"
                        }, null);
                    } else {
                        if (permission) {

                            return cb(null, permission);
                        } else {
                            return cb({
                                errorMessage: "Ban khong co quyen truy cap vao tai nguyen nay"
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
     * @apiParam {String} address Dia chi cua nguoi su dung
     * @apiParam {String} phone So dien thoai cua nguoi su dung
     * @apiParam {String} email Dia chi email cua nguoi su dung
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
     * TODO: refresh token
     */
    app.post('/api/refresh_token', (req, res, next)=>{
        const {refreshToken} = req.body;
        if(refreshToken){
            // Check refresh token
            app.models.token.verifyJwtToken(refreshToken, (err, result)=>{
                if (err){
                    return errorHandle(res, "Verify JWT token falied",403);
                }else{
                    return responseHandle(res, result);
                }
            });
        }else {
            return errorHandle(res, "Request without refresh token",402);
        }
    })



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
    app.get('/api/users/me', (req, res, next) => {

        let tokenId = req.get('authorization');
        if (!tokenId) {
            tokenId = req.query.token;
        }

        if (!tokenId) {
            return errorHandle(res, "Request without token", 505);
        }

        app.models.token.verify(tokenId, (err, result) => {
            if (err) {
                return errorHandle(res, err.errorMessage);
            } else {
                _.unset(result.user, 'password')
                return responseHandle(res, result, 200)
            }
        })
    })

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
    app.post('/api/roles', (req, res, next) => {
        const body = req.body;
        app.models.role.create(body, (err, role) => {
            return err ? errorHandle(res, err.errorMessage, 501) : responseHandle(res, role)
        })
    })


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
    app.post('/api/resources', (req, res, next) => {
        body = req.body;
        app.models.resource.create(body, (err, role) => {
            return err ? errorHandle(res, err.errorMessage, 501) : responseHandle(res, role)
        })
    })

  // *************************************************************************** //
  // ROUTES FOR PLANT PROTECTION PRODUCT

  /**
   * @api {get} /plant-protection-product Get all plant protection product
   * @apiName GetAllPlantProtectionProduct
   * @apiGroup PlantProtectionProduct
   * @apiExample {curl} Example usage:
   *     curl -i http://localhost:3001/api/plant-protection-products
   *
   * @apiHeader {String} authorization Token.
   *
   *
   * @apiSuccess {String} name Ten thuoc bao ve thuc vat
   * @apiSuccess {String} activeIngredient Hoat chat
   * @apiSuccess {String} content Ham luong
   * @apiSuccess {String} plantProtectionProductGroup Nhom thuoc
   * @apiSuccess {Integer} ghs Nhom doc GHS
   * @apiSuccess {Integer} who Nhom doc WHO
   * @apiSuccess {Array} scopeOfUse Pham vi su dung
   * @apiSuccess {String} plant Cay trong
   * @apiSuccess {String} pest Dich hai
   * @apiSuccess {String} dosage Lieu luong
   * @apiSuccess {String} phi
   * @apiSuccess {String} usage Cach dung
   * @apiSuccess {Array} registrationInfo Thong tin dang ky
   * @apiSuccess {String} registrationUnit Don vi dang ky
   * @apiSuccess {String} registrationUnitAddress Dia chi
   * @apiSuccess {String} manufacturer Nha san xuat
   * @apiSuccess {String} manufacturerAddress Dia chi san xuat
   * @apiSuccess {ObjectId} pppId ID cua thuoc bao ve thuc vat
   * @apiSuccess {ObjectId} _id ID cua thuoc bao ve thuc vat || pham vi su dung || thong tin dang ky
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
   *          "plantProtectionProductsGroup": "",
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
   *          "plantProtectionProductsGroup": "",
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
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Conflict
   *     {
   *       "error": ""
   *     }
   * @apiPermission none
   */
  app.get("/api/plant-protection-products", (req, res, next) => {
    app.models.plantProtectionProduct.find((err, info) => {
      return err ? errorHandle(res, err, 404) : responseHandle(res, info);
    });
  });

  /**
   * @api {get} /plant-protection-products/:id Get plant protection product by query
   * @apiName GetPlantProtectionProductByQuery
   * @apiGroup PlantProtectionProduct
   *
   * @apiExample {curl} Example usage:
   *     curl -i http://localhost:3001/api/plant-protection-products/query
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {String} _id ID cua thuoc bao ve thuc vat
   * @apiParam {String} name Ten cua thuoc bao ve thuc vat
   * @apiParam {String} plant Cay trong
   * @apiParam {String} pest Dich hai
   *
   * @apiParamExample {json} Tìm kiếm bằng ID thuốc bvtv
   * {
   *     "query": {
   *         "_id": "5dce66cb5c25ee6da0a29ac8"
   *     }
   * }
   *
   * @apiParamExample {json} Tìm kiếm bằng tên
   * {
   *     "query": {
   *         "name": " Ababetter  3.6EC"
   *     }
   * }
   *
   * @apiParamExample {json} Tìm kiếm theo cây
   * {
   *     "query": {
   *         "scopeOfUse": {
   *             "plant": "lúa"
   *         }
   *     }
   * }
   *
   * @apiParamExample {json} Tìm kiếm theo dịch hại
   * {
   *     "query": {
   *         "scopeOfUse": {
   *             "pest": "sâu tơ"
   *         }
   *     }
   * }
   *
   * @apiParamExample {json} Tìm kiếm theo cây và dịch hại
   * {
   *     "query": {
   *         "scopeOfUse": {
   *             "plant": "lúa",
   *             "pest": "bọ trĩ"
   *         }
   *     }
   * }
   *
   * @apiParamExample {json} Tìm kiếm theo cây và đơn vị đăng ký
   * {
   *     "query": {
   *         "scopeOfUse": {
   *             "plant": "lúa"
   *         },
   *         "registrationInfo": {
   *             "registrationUnit": "Công ty TNHH SX TM Tô Ba"
   *         }
   *     }
   * }
   *
   * @apiSuccess {String} name Ten thuoc bao ve thuc vat
   * @apiSuccess {String} activeIngredient Hoat chat
   * @apiSuccess {String} content Ham luong
   * @apiSuccess {String} plantProtectionProductGroup Nhom thuoc
   * @apiSuccess {Integer} ghs Nhom doc GHS
   * @apiSuccess {Integer} who Nhom doc WHO
   * @apiSuccess {Array} scopeOfUse Pham vi su dung
   * @apiSuccess {String} plant Cay trong
   * @apiSuccess {String} pest Dich hai
   * @apiSuccess {String} dosage Lieu luong
   * @apiSuccess {String} phi
   * @apiSuccess {String} usage Cach dung
   * @apiSuccess {Array} registrationInfo Thong tin dang ky
   * @apiSuccess {String} registrationUnit Don vi dang ky
   * @apiSuccess {String} registrationUnitAddress Dia chi
   * @apiSuccess {String} manufacturer Nha san xuat
   * @apiSuccess {String} manufacturerAddress Dia chi san xuat
   * @apiSuccess {ObjectId} pppId ID cua thuoc bao ve thuc vat
   * @apiSuccess {ObjectId} _id ID cua thuoc bao ve thuc vat || pham vi su dung || thong tin dang ky
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *     "name": " Ababetter  3.6EC",
   *     "activeIngredient": "Abamectin",
   *     "content": "36g/l",
   *     "plantProtectionProductsGroup": "Thuốc trừ sâu",
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
  app.get("/api/plant-protection-products/query", (req, res, next) => {
    const query = req.body.query;
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
   * @apiParam {String} name Ten thuoc bao ve thuc vat
   * @apiParam {String} activeIngredient Hoat chat
   * @apiParam {String} content Ham luong
   * @apiParam {String} plantProtectionProductGroup Nhom thuoc
   * @apiParam {Integer} ghs Nhom doc GHS
   * @apiParam {Integer} who Nhom doc WHO
   * @apiParam {Array} scopeOfUse Pham vi su dung
   * @apiParam {String} plant Cay trong
   * @apiParam {String} pest Dich hai
   * @apiParam {String} dosage Lieu luong
   * @apiParam {String} phi
   * @apiParam {String} usage Cach dung
   * @apiParam {Array} registrationInfo Thong tin dang ky
   * @apiParam {String} registrationUnit Don vi dang ky
   * @apiParam {String} registrationUnitAddress Dia chi
   * @apiParam {String} manufacturer Nha san xuat
   * @apiParam {String} manufacturerAddress Dia chi san xuat
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
   * @apiSuccess {String} name Ten thuoc bao ve thuc vat
   * @apiSuccess {String} activeIngredient Hoat chat
   * @apiSuccess {String} content Ham luong
   * @apiSuccess {String} plantProtectionProductGroup Nhom thuoc
   * @apiSuccess {Integer} ghs Nhom doc GHS
   * @apiSuccess {Integer} who Nhom doc WHO
   * @apiSuccess {Array} scopeOfUse Pham vi su dung
   * @apiSuccess {String} plant Cay trong
   * @apiSuccess {String} pest Dich hai
   * @apiSuccess {String} dosage Lieu luong
   * @apiSuccess {String} phi
   * @apiSuccess {String} usage Cach dung
   * @apiSuccess {Array} registrationInfo Thong tin dang ky
   * @apiSuccess {String} registrationUnit Don vi dang ky
   * @apiSuccess {String} registrationUnitAddress Dia chi
   * @apiSuccess {String} manufacturer Nha san xuat
   * @apiSuccess {String} manufacturerAddress Dia chi san xuat
   * @apiSuccess {ObjectId} pppId ID cua thuoc bao ve thuc vat
   * @apiSuccess {ObjectId} _id ID cua thuoc bao ve thuc vat || pham vi su dung || thong tin dang ky
   *
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *     "name": " Ababetter  3.6EC",
   *     "activeIngredient": "Abamectin",
   *     "content": "36g/l",
   *     "plantProtectionProductsGroup": "Thuốc trừ sâu",
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
};
