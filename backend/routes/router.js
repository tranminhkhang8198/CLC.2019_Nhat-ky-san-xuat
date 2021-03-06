const _ = require("lodash");
const upload = require("../models/multer");
const { verifyUserV2 } = require("../middlewares/verifyUser");
const { errorHandle, responseHandle } = require("../middlewares/lastHandler");
const httpStatus = require('http-status');
const { ObjectID } = require('mongodb');
exports.routers = app => {
  /**
   * @apiDefine set $set
   */

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
                  errorMessage: "Lỗi trong quá trình kiểm tra quyền truy cập",
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
   * @apiVersion 1.0.0
   * @apiName CreateUser
   * @apiGroup User
   * @apiSampleRequest http://localhost:3001/api/users
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
  app.post("/api/users/", upload.single("avatar"), (req, res, next) => {
    let avatar = "http://localhost:3001/avatar/default.png";
    if (req.file) {
      avatar = "http://localhost:3001/avatar/" + req.file.filename;
    }
    const body = req.body;
    _.set(body, "avatar", avatar);
    const resource = "user";
    verifyUser(req, resource, (err, result) => {
      if (err) {
        _.unset(body, "user");
        app.models.user.create(body, (err, info) => {
          return err ? errorHandle(res, err, 503) : responseHandle(res, info);
        });
      } else {
        app.models.user.create(body, (err, info) => {
          return err ? errorHandle(res, err, 503) : responseHandle(res, info);
        });
      }
    });
  });

  /**
   * @api {post} /api/login Login user
   * @apiVersion 1.0.0
   * @apiName LoginUser
   * @apiGroup User
   * @apiSampleRequest http://localhost:3001/api/login
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
      console.log(err);
      return err ? errorHandle(res, err, 404) : responseHandle(res, result);
    });
  });

  /**
   * @api {post} /api/auth/register User request creating new account
   * @apiVersion 1.0.0
   * @apiName authRegister
   * @apiGroup Auth
   * @apiSampleRequest http://localhost:3001/api/auth/register
   *
   *
   * @apiParam {String} name Ten nguoi su dung
   * @apiParam {String} personalId So CMND cua nguoi su dung
   * @apiParam {String} address Địa chỉ cua nguoi su dung
   * @apiParam {String} phone So dien thoai cua nguoi su dung
   * @apiParam {String} email Địa chỉ email cua nguoi su dung
   * @apiParam {String} password Mat khau cua nguoi su dung
   *
   * @apiParamExample {json} Request-Example:
   *     {
   *       "name": "Nguyen Van Loi",
   *       "personalId":"384736273",
   *       "address": "Ninh Kieu, Can Tho",
   *       "phone": "093827463",
   *       "email": "admin@gmail.com",
   *       "password": "123456"
   *     }
   *
   * @apiSuccess {String} name Ten nguoi su dung
   * @apiSuccess {String} personalId So CMND cua nguoi su dung
   * @apiSuccess {String} phone So dien thoai cua nguoi su dung
   * @apiSuccess {String} email Địa chỉ email cua nguoi su dung
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
  app.post("/api/auth/register", upload.single("avatar"), (req, res, next) => {
    let avatar = "http://localhost:3003/default.png";
    if (req.file) {
      avatar = "http://localhost:3003/" + req.file.filename;
    }
    const body = req.body;
    _.set(body, "avatar", avatar);
    const resource = "user";
    verifyUser(req, resource, (err, result) => {
      if (err) {
        _.unset(body, "user");
        app.models.user.create(body, (err, info) => {
          return err ? errorHandle(res, err, 503) : responseHandle(res, info);
        });
      } else {
        app.models.user.create(body, (err, info) => {
          return err ? errorHandle(res, err, 503) : responseHandle(res, info);
        });
      }
    });
  });

  app.delete("/api/token", (req, res, next) => {
    const { refreshToken } = req.query;

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
   * @apiVersion 1.0.0
   * @apiName PostToken
   * @apiGroup Token
   * @apiSampleRequest http://localhost:3001/api/refresh_token
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
  /**
 * @api {post} /refresh_token Xac thuc lay access token moi
 * @apiVersion 1.0.1
 * @apiName PostToken
 * @apiGroup Token
 * @apiSampleRequest http://localhost:3001/api/refresh_token
 *
 *
 * @apiParam {String} refreshToken refresh token cua nguoi dung
 * @apiParamExample {json} Request-Example:
 *     {
 *       "refreshToken": "fsfsdhfwrtwjf34yrwi4rjfweoifhefjwpuwfseo.oiehskdlwhwsfoiwdfsj3ljdnvkjdbfwoh"
 *     }
 *
 * @apiSuccess {String} refreshToken refresh token moi
 * @apiSuccess {String} token access token moi
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "refreshToken": "fsjdoiwukmvwafojf9wa4rrjirhfelkfsarwjijgerhggjh8reighoighergelrgsfhg",
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
   * @apiVersion 1.0.0
   * @apiName CheckToken
   * @apiGroup User
   *
   * @apiSampleRequest http://localhost:3001/api/users/me
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
  app.get("/api/users/me", async (req, res, next) => {
    try {
      let accessToken = req.get("authorization");
      if (!accessToken) {
        accessToken = req.query.token;
      }

      if (!accessToken) {
        return res.status(httpStatus.UNAUTHORIZED)
          .json({
            code: httpStatus.UNAUTHORIZED,
            message: 'responseMessage'
          })
          .end();
      }
      const {
        token,
        user,
      } = app.models;

      const result = await token.verify(accessToken);
      return res.status(httpStatus.OK)
        .json({
          code: httpStatus.OK,
          message: 'Getting user information successfully',
          result: result,
        })
        .end();



    }
    catch (error) {
      next(error);
    }
  });

  /**
   * @api {get} /api/users/search Search user by name
   * @apiVersion 1.0.0
   * @apiName SearchUser
   * @apiGroup User
   *
   * @apiSampleRequest http://localhost:3001/api/users/search?keywords=nguyen van loi&pageNumber=1&resultNumber=1
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {String} keywords Searching keywords
   * @apiParam {Number} pageNumber Page Number
   * @apiParam {Number} resultNumber Result Number
   *
   * @apiSuccess {String} _id ID token
   * @apiSuccess {String} created Ngay tao token
   * @apiSuccess {String} _id ID cua user
   * @apiSuccess {String} name Ten cua user
   * @apiSuccess {String} avatar User avatar
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
   *      [
   *          {
   *              "_id": "5e1c79058413720653b09112",
   *              "name": "Nguyen Van Loi",
   *              "avatar": "http://localhost:3001/avatar/default.png",
   *              "personalId": "381823993",
   *              "address": "Can Tho",
   *              "phone": "0836810994",
   *              "email": "vanloi1010@gmail.com",
   *              "user": "user",
   *              "HTXId": "UM1",
   *              "created": "2020-01-13T14:04:53.771Z"
   *          }
   *      ]
   *
   * @apiError Access-dinied Token khong hop le
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "Access dinied"
   *     }
   * @apiPermission none
   */
  app.get("/api/users/search", (req, res, next) => {
    const query = req.query;
    app.models.user.search(query, (err, result) => {
      return err
        ? errorHandle(res, err.errorMessage, err.errorCode)
        : responseHandle(res, result);
    });
  });

  /**
   * @api {get} /users/:userId Get user info from id
   * @apiVersion 1.0.0
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiSampleRequest http://localhost:3001/api/users/all
   * @apiSampleRequest http://localhost:3001/api/users/fsdlkfjsdoeijfsdlsdfj
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
        errorHandle(res, err.errorMessage);
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
   * @apiVersion 1.0.0
   * @apiName PatchUsers
   * @apiGroup User
   *
   * @apiSampleRequest http://localhost:3001/api/users
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
   * @apiVersion 1.0.0
   * @apiName PostRole
   * @apiGroup Role
   *
   * @apiSampleRequest http://localhost:3001/api/roles
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {char(1)} _id Ki hieu cua method
   * @apiParam {String} permission Ten method
   *
   * @apiParamExample {json} Request-Example:
   *      {
   *          "_id":"D",
   *          "method":"DELETE"
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
   *          "method": "DELETE",
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

  app.get("/api/roles", (req, res, next) => {
    app.models.role.get((err, roles) => {
      return err
        ? errorHandle(res, err.errorMessage, err.errorCode)
        : responseHandle(res, roles);
    });
  });

  app.delete("/api/roles", (req, res, next) => {
    const query = req.query;
    app.models.role.delete(query, (err, result) => {
      return err
        ? errorHandle(res, err.errorMessage, err.errorCode)
        : responseHandle(res, result);
    });
  });

  /**
   * @api {post} /resources Them resource can quan ly quyen
   * @apiVersion 1.0.0
   * @apiName PostResource
   * @apiGroup Resource
   *
   * @apiSampleRequest http://localhost:3001/api/resources
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
      return err
        ? errorHandle(res, err.errorMessage, 401)
        : responseHandle(res, resources);
    });
  });

  app.delete("/api/resources", (req, res, next) => {
    const query = req.query;
    app.models.resource.delete(query, (err, responseMessage) => {
      return err
        ? errorHandle(res, err.errorMessage, 401)
        : responseHandle(res, responseMessage);
    });
  });

  app.patch("/api/resources", (req, res, next) => {
    const query = req.query;
    const body = req.body;
    app.models.resource.update(query, body, (err, responseMessage) => {
      return err
        ? errorHandle(res, err.errorMessage, 401)
        : responseHandle(res, responseMessage);
    });
  });

  /**
   * @api {get} /api/cooperatives Tìm kiếm thông tin HTX.
   * @apiVersion 1.0.0
   * @apiName SearchCooperatives
   * @apiGroup Cooperatives
   *
   *
   * @apiHeader {String} authorization Token.
   * @apiParam {String} keyworks Dieu kien tim kiem.
   * @apiParam {Number} [resultNumber] so luong ket qua tra ve theo phan trang (tuy chon).
   * @apiParam {Number} [pageNumber] trang du lieu can tra ve theo phan trang (tuy chon).
   * @apiSampleRequest http://localhost:3001/api/cooperatives/search?pageNumber=0&resultNumber=1&keyworks=Hop tac xa long thanh
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
   *
   *      [
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
   *
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
  app.get("/api/cooperatives/search", (req, res, next) => {
    const body = req.query;
    app.models.cooperative.search(body, (err, result) => {
      if (err) {
        return errorHandle(res, err.errorMessage, err.errorCode);
      } else {
        return responseHandle(res, result);
      }
    });
  });

  /**
   * @api {get} /api/cooperatives Get du lieu HTX theo phan trang.
   * @apiVersion 1.0.0
   * @apiName GetCooperatives
   * @apiGroup Cooperatives
   *
   * @apiSampleRequest http://localhost:3001/api/cooperatives?pageNumber=1&resultNumber=1
   *
   * @apiHeader {String} authorization Token.
   * @apiParam {Number} resultNumber so luong ket qua tra ve theo phan trang (tuy chon).
   * @apiParam {Number} pageNumber trang du lieu can tra ve theo phan trang (tuy chon).
   *
   *
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
   *
   *      [
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
   *
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
  app.get("/api/cooperatives", (req, res, next) => {
    const query = req.query;
    app.models.cooperative.get(query, (err, result) => {
      return err
        ? errorHandle(res, err.errorMessage, err.errorCode)
        : responseHandle(res, result);
    });
  });

  /**
   * @api {get} /api/cooperatives/all Get thông tin HTX.
   * @apiVersion 1.0.0
   * @apiName GetAllCooperatives
   * @apiGroup Cooperatives
   *
   * @apiSampleRequest http://localhost:3001/api/cooperatives/all
   *
   * @apiHeader {String} authorization Token.
   *
   *
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
   *
   *      [
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
   *
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
  app.get("/api/cooperatives/all", (req, res, next) => {
    app.models.cooperative.getAll((err, result) => {
      return err
        ? errorHandle(res, err.errorMessage, err.errorCode)
        : responseHandle(res, result);
    });
  });

  /**
   * @api {post} /api/cooperatives Thêm HTX mới
   * @apiVersion 1.0.0
   * @apiName PostCooperatives
   * @apiGroup Cooperatives
   *
   * @apiSampleRequest http://localhost:3001/api/cooperatives
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
  app.post("/api/cooperatives", upload.single("logo"), (req, res, next) => {
    let logo = "http://localhost:3001/logo/default.png";
    if (req.file) {
      logo = "http://localhost:3001/logo/" + req.file.filename;
    }
    const body = req.body;
    _.set(body, "logo", logo);
    app.models.cooperative.create(body, (err, result) => {
      if (err) {
        return errorHandle(res, err.errorMessage, 404);
      } else {
        return responseHandle(res, result);
      }
    });
  });

  /**
   * @api {patch} /api/cooperatives Cập nhật thông tin của HTX.
   * @apiVersion 1.0.0
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
   * @apiSampleRequest http://localhost:3001/api/cooperatives?_id=5df306ee040d111f9b9e56bf
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
  app.patch("/api/cooperatives", (req, res, next) => {
    const body = req.body;
    const query = req.query;
    app.models.cooperative.update(query, body, (err, result) => {
      if (err) {
        return errorHandle(res, err.errorMessage, 404);
      } else {
        return responseHandle(res, result);
      }
    });
  });

  /**
     * @api {delete} /api/cooperatives Xóa thông tin của HTX.
     * @apiVersion 1.0.0
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
     * @apiSampleRequest http://localhost:3001/api/cooperatives?_id=5df306ee040d111f9b9e56bf
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
  app.delete("/api/cooperatives", (req, res, next) => {
    const query = req.query;
    app.models.cooperative.delete(query, (err, result) => {
      if (err) {
        return errorHandle(res, err.errorMessage, 404);
      } else {
        return responseHandle(res, result);
      }
    });
  });

  /**
   * @api {get} /api/cooperatives/count Get tổng số HTX đang quản lí
   * @apiVersion 1.0.0
   * @apiName GetCooperatives
   * @apiGroup Cooperatives
   *
   *
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiSampleRequest http://localhost:3001/api/cooperatives/count
   * @apiSuccess {Number} total Tổng số HTX đang quản lí.
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *      "total": "4"
   *  }
   * @apiError Permission-denied Token khong hop le
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   *     {
   *       "errorMessage": "Lỗi trong quá trình truy xuất dữ liệu"
   *     }
   *
   * @apiPermission manager-admin
   */
  app.get("/api/cooperatives/count", verifyUserV2, (req, res, next) => {
    app.models.cooperative.count((err, result) => {
      return err
        ? errorHandle(res, err.errorMessage, err.errorCode)
        : responseHandle(res, result);
    });
  });

  app.patch("/api/diaries", (req, res, next) => {
    const body = req.body;
    app.models.diary.update(body, (err, result) => {
      if (err) {
        return errorHandle(res, err.errorMessage, 404);
      } else {
        return responseHandle(res, result);
      }
    });
  });

  app.delete("/api/diaries", (req, res, next) => {
    const body = req.body;
    app.models.diary.remove(body, (err, result) => {
      if (err) {
        return errorHandle(res, err.errorMessage, 404);
      } else {
        return responseHandle(res, result);
      }
    });
  });

  app.post("/api/fields", (req, res, next) => {
    const body = req.body;
    app.models.field.create(body, (err, result) => {
      if (err) {
        return errorHandle(res, err.errorMessage, 404);
      } else {
        return responseHandle(res, result);
      }
    });
  });

  /**
   * @api {delete} /aip/goodsReceipts?queryParam Xóa thông tin của HTX
   * @apiVersion 1.0.0
   * @apiName DeleteGoodsReceipts
   * @apiGroup GoodsReceipts
   *
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {String} [_id] ID của hóa đơn
   * @apiSampleRequest http://localhost:3001/api/goodsReceipts?_id=sdfklsdjfsdfje23kj
   *
   * @apiSuccess {String} responseMessage Thông báo số lượng thông tin đã xóa
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *   "responseMessage": "Đã xóa dữ 1 liệu"
   *  }
   * @apiError Permission-denied Token khong hop le
   * @apiError Khong-tim-thay-du-lieu-can-xoa Không tìm thấy dữ liệu cần xóa
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   *     {
   *  "errorMessage": "Không tìm thấy dữ liệu cần xóa "
   *     }
   *
   * @apiPermission manager-admin
   */
  app.delete("/api/goodsReceipts", (req, res, next) => {
    const query = req.query;
    app.models.goodsReceipt.delete(query, (err, result) => {
      return err
        ? errorHandle(res, err.errorMessage, err.errorCode)
        : responseHandle(res, result);
    });
  });

  /**
   * @api {get} /aip/goodsReceipts?queryParam Tìm kiếm thông tin HTX
   * @apiVersion 1.0.0
   * @apiName GetGoodsReceipts
   * @apiGroup GoodsReceipts
   *
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {Number} [pageNumber] Số thứ tự trang cần tìm lấy bắt đầu từ 0
   * @apiParam {Number} [resulNumber] Số lượng dữ liệu mỗi trang
   * @apiSampleRequest http://localhost:3001/api/goodsReceipts?pageNumber=1&resultNumber=1
   *
   * @apiSuccess {String} responseMessage Thông báo số lượng thông tin đã xóa
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  [
   *      {
   *          "_id": "5e0f14ad3d3b5928ff43fdff",
   *          "cooperative_id": "sdfsdfsdf",
   *          "transDate": "2019-10-12T07:40:00.000Z",
   *          "product_id": "sdfsd",
   *          "product_type": "plant",
   *          "detail": [
   *              {
   *                  "quantity": "200",
   *                  "price": 260000,
   *                  "patchCode": null,
   *                  "expireDate": "2019-12-30 15:30"
   *              },
   *              {
   *                  "quantity": "200",
   *                  "price": 260000,
   *                  "patchCode": null,
   *                  "expireDate": "2019-12-30 15:30"
   *              }
   *          ],
   *          "inDate": "1970-01-01T00:00:00.000Z",
   *          "notes": "dsfdfsd sfdf",
   *          "createdDate": "2020-01-03T10:17:17.697Z"
   *      }
   *  ]
   * @apiError Permission-denied Token khong hop le
   * @apiError Khong-tim-thay-du-lieu-can-xoa Không tìm thấy dữ liệu
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   *     {
   *  "errorMessage": "Không tìm thấy dữ liệu "
   *     }
   *
   * @apiPermission manager-admin
   */
  app.get("/api/goodsReceipts", (req, res, next) => {
    const query = req.query;
    app.models.goodsReceipt.get(query, (err, result) => {
      return err
        ? errorHandle(res, err.errorMessage, err.errorCode)
        : responseHandle(res, result);
    });
  });

  /**
   * @api {get} /aip/goodsReceipts/search?queryParam Xóa thông tin của HTX
   * @apiVersion 1.0.0
   * @apiName GetGoodsReceipts
   * @apiGroup GoodsReceipts
   *
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {Number} [pageNumber] Số thứ tự trang cần tìm lấy bắt đầu từ 0
   * @apiParam {Number} [resulNumber] Số lượng dữ liệu mỗi trang
   * @apiParam {String} _id Mã số hóa đơn nhập kho
   * @apiSampleRequest http://localhost:3001/api/goodsReceipts/search?_id=sdfsdjfsfowie2eqdjjf
   *
   * @apiSuccess {String} responseMessage Thông báo số lượng thông tin đã xóa
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *  [
   *      {
   *          "_id": "5e0f14ad3d3b5928ff43fdff",
   *          "cooperative_id": "sdfsdfsdf",
   *          "transDate": "2019-10-12T07:40:00.000Z",
   *          "product_id": "sdfsd",
   *          "product_type": "plant",
   *          "detail": [
   *              {
   *                  "quantity": "200",
   *                  "price": 260000,
   *                  "patchCode": null,
   *                  "expireDate": "2019-12-30 15:30"
   *              },
   *              {
   *                  "quantity": "200",
   *                  "price": 260000,
   *                  "patchCode": null,
   *                  "expireDate": "2019-12-30 15:30"
   *              }
   *          ],
   *          "inDate": "1970-01-01T00:00:00.000Z",
   *          "notes": "dsfdfsd sfdf",
   *          "createdDate": "2020-01-03T10:17:17.697Z"
   *      }
   *  ]
   * @apiError Permission-denied Token khong hop le
   * @apiError Khong-tim-thay-du-lieu-can-xoa Không tìm thấy dữ liệu
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   *     {
   *  "errorMessage": "Không tìm thấy dữ liệu "
   *     }
   *
   * @apiPermission manager-admin
   */
  app.get("/api/goodsReceipts/search", (req, res, next) => {
    const query = req.query;
    app.models.goodsReceipt.search(query, (err, result) => {
      return err
        ? errorHandle(res, err.errorMessage, err.errorCode)
        : responseHandle(res, result);
    });
  });

  /**
   * @api {post} /api/employee Thêm nhân sự mới
   * @apiVersion 1.0.0
   * @apiName PostEmployee
   * @apiGroup Employee
   *
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {String} Name Tên nhân sự
   * @apiParam {File} avatar Ảnh đại diện
   * @apiParam {String} personalId Số CMND của nhân sự
   * @apiParam {String} address Địa chỉ.
   * @apiParam {String} phone Số điện thoại.
   * @apiParam {String} email Địa chỉ email.
   * @apiParam {String} jobTitle chức vụ.
   * @apiParam {String} HTXId ID của HTX.
   * @apiParam {String} password Mật khẩu account của nhân sự.
   *
   * @apiParamExample {json} Request-Example:
   *     {
   *         "name": "Nguyễn Văn Lợi",
   *         "avatar": "C:/avatar/image-1578136142752.png",
   *         "personalId": "8182213312",
   *         "address": "Cần Thơ",
   *         "phone": "0836810267",
   *         "email": "vanloi@gmail.com",
   *         "jobTitle": "Manager",
   *         "HTXId": "dfsdf",
   *         "password": "123456",
   *     }
   *
   * @apiSuccess {String} Name Tên nhân sự
   * @apiSuccess {File} avatar Ảnh đại diện
   * @apiSuccess {String} personalId Số CMND của nhân sự
   * @apiSuccess {String} address Địa chỉ.
   * @apiSuccess {String} phone Số điện thoại.
   * @apiSuccess {String} email Địa chỉ email.
   * @apiSuccess {String} jobTitle chức vụ.
   * @apiSuccess {String} HTXId ID của HTX.
   * @apiSuccess {String} password Mật khẩu account của nhân sự.
   * @apiSuccess {Date} created Ngày tạo.
   * @apiSuccess {String} _id ID của nhân sự.
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *
   *          {
   *              "name": "Nguyễn Văn Lợi",
   *              "avatar": "http://localhost:3001/avatar/image-1578136142752.png",
   *              "personalId": "8182213312",
   *              "address": "Cần Thơ",
   *              "phone": "0836810267",
   *              "email": "vanloi@gmail.com",
   *              "jobTitle": "Manager",
   *              "salary":"600",
   *              "jobDesc":"",
   *              "HTXId": "dfsdf",
   *              "password": "123456",
   *              "created": "2020-01-04T11:09:02.758Z",
   *              "_id": "5e10724efde38921cd444999"
   *          }
   *
   * @apiError Permission-denied Token khong hop le
   * @apiError Ten-nhan-su-khong-hop-le Tên nhân sự không hợp lệ
   * @apiError So-dien-thoai-khong-hop-le Số điện thoaij không hợp lệ
   * @apiError Dia-chi-khong-hop-le Địa chỉ không hợp lệ
   * @apiError Ten-chuc-vu-khong-hop-le Tên chức vụ không hợp lệ
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   *     {
   *       "error": "Số điện thoại không hợp lệ"
   *     }
   *
   * @apiPermission manager-admin
   */
  /**
   * @api {post} /api/employee Thêm nhân sự mới
   * @apiSampleRequest http://localhost:3001/api/employee
   * @apiVersion 1.0.1
   * @apiName PostEmployee
   * @apiGroup Employee
   *
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {String} name Tên nhân sự
   * @apiParam {File} avatar Ảnh đại diện
   * @apiParam {String} personalId Số CMND của nhân sự
   * @apiParam {String} address Địa chỉ.
   * @apiParam {String} phone Số điện thoại.
   * @apiParam {String} email Địa chỉ email.
   * @apiParam {String} jobTitle chức vụ.
   * @apiParam {String} HTXId ID của HTX.
   * @apiParam {String} password Mật khẩu account của nhân sự.
   *
   * @apiParamExample {json} Request-Example:
   *     {
   *         "name": "Nguyễn Văn Lợi",
   *         "avatar": "C:/avatar/image-1578136142752.png",
   *         "personalId": "8182213312",
   *         "address": "Cần Thơ",
   *         "phone": "0836810267",
   *         "email": "vanloi@gmail.com",
   *         "jobTitle": "Manager",
   *         "HTXId": "dfsdf",
   *         "password": "123456",
   *     }
   *
   * @apiSuccess {String} name Tên nhân sự
   * @apiSuccess {File} avatar Ảnh đại diện
   * @apiSuccess {String} personalId Số CMND của nhân sự
   * @apiSuccess {String} address Địa chỉ.
   * @apiSuccess {String} phone Số điện thoại.
   * @apiSuccess {String} email Địa chỉ email.
   * @apiSuccess {String} jobTitle chức vụ.
   * @apiSuccess {String} HTXId ID của HTX.
   * @apiSuccess {String} password Mật khẩu account của nhân sự.
   * @apiSuccess {Date} created Ngày tạo.
   * @apiSuccess {String} _id ID của nhân sự.
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *
   *          {
   *              "name": "Nguyễn Văn Lợi",
   *              "avatar": "http://localhost:3001/avatar/image-1578136142752.png",
   *              "personalId": "8182213312",
   *              "address": "Cần Thơ",
   *              "phone": "0836810267",
   *              "email": "vanloi@gmail.com",
   *              "jobTitle": "Manager",
   *              "salary":"600",
   *              "jobDesc":"",
   *              "HTXId": "dfsdf",
   *              "password": "123456",
   *              "created": "2020-01-04T11:09:02.758Z",
   *              "_id": "5e10724efde38921cd444999"
   *          }
   *
   * @apiError Permission-denied Token khong hop le
   * @apiError Ten-nhan-su-khong-hop-le Tên nhân sự không hợp lệ
   * @apiError So-dien-thoai-khong-hop-le Số điện thoaij không hợp lệ
   * @apiError Dia-chi-khong-hop-le Địa chỉ không hợp lệ
   * @apiError Ten-chuc-vu-khong-hop-le Tên chức vụ không hợp lệ
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   *     {
   *       "error": "Số điện thoại không hợp lệ"
   *     }
   *
   * @apiPermission manager-admin
   */
  app.post("/api/employee", upload.single("avatar"), (req, res, next) => {
    try {
      let avatar = "http://localhost:3001/avatar/default.png";
      if (req.file) {
        avatar = "http://localhost:3001/avatar/" + req.file.filename;
      }
      const body = req.body;
      _.set(body, "avatar", avatar);
      console.log(req);
      app.models.employee.create(body, (err, result) => {
        return err
          ? errorHandle(res, err.errorMessage, err.errorCode)
          : responseHandle(res, result);
      });
    }
    catch (error) {
      next(error);
    }
  });

  /**
   * @api {get} /api/employee Get danh sách nhân sự
   * @apiVersion 1.0.0
   * @apiName GetEmployee
   * @apiGroup Employee
   *
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {String} HTXId HTX ID
   * @apiParam {Number} [pageNumber] Số trang
   * @apiParam {Number} [resultNumber] Số lượng dữ liệu mỗi trang
   *
   * @apiSampleRequest http://localhost:3001/api/employee?HTXId=fjdiejdnfjdjfjdiendjfkdmei&pageNumber=1&resultNumber=1
   *
   * @apiSuccess {String} Name Tên nhân sự
   * @apiSuccess {File} avatar Ảnh đại diện
   * @apiSuccess {String} personalId Số CMND của nhân sự
   * @apiSuccess {String} address Users unique ID.
   * @apiSuccess {String} phone Users unique ID.
   * @apiSuccess {String} email Users unique ID.
   * @apiSuccess {String} jobTitle Users unique ID.
   * @apiSuccess {String} HTXId Users unique ID.
   * @apiSuccess {String} password Users unique ID.
   * @apiSuccess {Date} created Ngày tạo.
   * @apiSuccess {String} _id ID của nhân sự.
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *     [
   *          {
   *              "name": "Nguyễn Văn Lợi",
   *              "avatar": "http://localhost:3001/avatar/image-1578136142752.png",
   *              "personalId": "8182213312",
   *              "address": "Cần Thơ",
   *              "phone": "0836810267",
   *              "email": "vanloi@gmail.com",
   *              "jobTitle": "Manager",
   *              "salary":"600",
   *              "jobDesc":"",
   *              "HTXId": "dfsdf",
   *              "password": "123456",
   *              "created": "2020-01-04T11:09:02.758Z",
   *              "_id": "5e10724efde38921cd444999"
   *          }
   *      ]
   *
   * @apiError Permission-denied Token khong hop le
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 404 Not Found
   *     {
   *       "error": "Số điện thoại không hợp lệ"
   *     }
   *
   * @apiPermission manager-admin
   */
  app.get("/api/employee", (req, res, next) => {
    const query = req.query;
    app.models.employee.get(query, (err, result) => {
      return err
        ? errorHandle(res, err.errorMessage, err.errorCode)
        : responseHandle(res, result);
    });
  });

  app.get("/api/employee/total", (req, res, next) => {
    const query = req.query;
    app.models.employee.getTotal(query, (err, result) => {
      return err
        ? errorHandle(res, err.errorMessage, err.errorCode)
        : responseHandle(res, result);
    });
  });

  // *************************************************************************** //
  // ROUTES FOR PLANT PROTECTION PRODUCT

  /**
   * @api {get} /api/plant-protection-products Get all plant protection products
   * @apiName GetAllPlantProtectionProducts
   * @apiGroup PlantProtectionProducts
   * @apiVersion 1.0.0
   * @apiSampleRequest http://localhost:3001/api/plant-protection-products?pageNumber=9&nPerPage=20
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
   * @apiParam {Number} nPerPage Số lượng thuốc bvtv trên mỗi trang
   *
   * @apiSuccess {Number} totalProducts Tổng số thuốc bvtv trong danh mục
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
   *      "totalProducts": 6331,
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
   * @apiVersion 1.0.0
   * @apiGroup PlantProtectionProducts
   *
   * @apiSampleRequest http://localhost:3001/api/plant-protection-products/query?_id=5dd6527842d8944aa7cef84e
   *
   * @apiSampleRequest http://localhost:3001/api/plant-protection-products/query?name=B52-usa 500EC
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
      return err
        ? errorHandle(res, err.errorMessage, err.code)
        : responseHandle(res, info);
    });
  });

  /**
   * @api {post} /api/plant-protection-products Create new plant protection product
   * @apiName CreatePlantProtectionProduct
   * @apiVersion 1.0.0
   * @apiGroup PlantProtectionProducts
   * @apiSampleRequest http://localhost:3001/api/plant-protection-products
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
   * @apiVersion 1.0.0
   * @apiGroup PlantProtectionProducts
   *
   * @apiSampleRequest http://localhost:3001/api/plant-protection-products?_id=5df1d86fadb2472bffdde52c
   *
   * @apiSampleRequest http://localhost:3001/api/plant-protection-products?name=Alfatin 1.8EC
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
   * @apiVersion 1.0.0
   * @apiGroup PlantProtectionProducts
   *
   * @apiSampleRequest http://localhost:3001/api/plant-protection-products?_id=5dd6527842d8944aa7cef4a1
   *
   * @apiSampleRequest http://localhost:3001/api/plant-protection-products?name=Abagold 55EC
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
   * @apiSampleRequest http://localhost:3001/api/fertilizers?pageNumber=9&nPerPage=20
   *
   * @apiHeader {String} authorization Token.
   *
   *
   * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
   * @apiParam {Number} nPerPage Số lượng thuốc bvtv trên mỗi trang
   *
   *
   * @apiSuccess {Number} totalProducts Tổng số phân bón trong danh mục
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
   *      "totalProducts": 14152,
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
   * @apiVersion 1.0.0
   * @apiGroup Fertilizers
   *
   * @apiSampleRequest http://localhost:3001/api/fertilizers/query?_id=5de75a92f4e889141cc24ef5
   * @apiSampleRequest http://localhost:3001/api/fertilizers/query?name=Phân bón Calcium Nitrate( Calcinit)
   *
   * @apiHeader {String} authorization Token.
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
      return err
        ? errorHandle(res, err.errorMessage, err.code)
        : responseHandle(res, info);
    });
  });

  /**
   * @api {post} /api/fertilizers Create new fertilizer
   * @apiName CreateFertilizer
   * @apiGroup Fertilizers
   * @apiSampleRequest http://localhost:3001/api/fertilizers
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
      return err
        ? errorHandle(res, err.errorMessage, 409)
        : responseHandle(res, info, 201);
    });
  });

  /**
   * @api {patch} /api/fertilizers Update fertilizer
   * @apiName UpdateFertilizer
   * @apiVersion 1.0.0
   * @apiGroup Fertilizers
   * @apiSampleRequest http://localhost:3001/api/fertilizers?_id=5de75a92f4e889141cc24f7d
   *
   * @apiSampleRequest http://localhost:3001/api/fertilizers?_name=Phân vi lượng TE MAX ( SUPER CHELATE)
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
   * @apiVersion 1.0.0
   * @apiGroup Fertilizers
   *
   * @apiSampleRequest http://localhost:3001/api/fertilizers?_id=5de75a92f4e889141cc24ef5
   *
   * @apiSampleRequest http://localhost:3001/api/fertilizers?name=Phân bón Calcium Nitrate( Calcinit)
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

  // *************************************************************************** //
  // ROUTES FOR SUBCONTRACTOR

  /**
   * @api {post} /subcontractors Create new subcontractor
   * @apiName CreateNewSubcontractor
   * @apiVersion 1.0.0
   * @apiGroup Subcontractors
   * @apiSampleRequest http://localhost:3001/api/subcontractors
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {String} name Tên nhà thầu phụ
   * @apiParam {String} serviceProvided Dịch vụ cung cấp
   * @apiParam {Date} hireDate Ngày thuê (ISO 8601 format)
   * @apiParam {Number} cost Chi phí thuê
   * @apiParam {Number} quantityEmployee Số lượng lao động tham gia
   * @apiParam {String} note Ghi chú
   *
   *
   * @apiParamExample {json} Request-Example:
   *
   *  {
   *      "name": "tmk",
   *      "serviceProvided": "May cat lua",
   *      "hiredDate": "2019-12-12",
   *      "cost": "9000000",
   *      "quantityEmployee": "20",
   *      "note": "Something for note"
   *  }
   *
   * @apiSuccess {String} name Tên nhà thầu phụ
   * @apiSuccess {String} serviceProvided Dịch vụ cung cấp
   * @apiSuccess {Date} hireDate Ngày thuê (ISO 8601 format)
   * @apiSuccess {Number} cost Chi phí thuê
   * @apiSuccess {Number} quantityEmployee Số lượng lao động tham gia
   * @apiSuccess {String} note Ghi chú
   * @apiSuccess {String} _id Id của document vừa tạo thành công
   *
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 201 Created
   *
   *  {
   *      "name": "tmk",
   *      "serviceProvided": "May cat lua",
   *      "hiredDate": "2019-12-12",
   *      "cost": "9000000",
   *      "quantityEmployee": "20",
   *      "note": "Something for note",
   *      "_id": "5e0accdaf7cd082ea2431756"
   *  }
   *
   *
   * @apiError name-is-required Trường tên nhà thầu phụ là bắt buộc
   * @apiError serviceProvided-is-required Trường dịch vụ cung cấp là bắt buộc
   * @apiError hiredDate-is-ISO8061-format Ngày thuê phải là định dạng ISO 8601
   * @apiError cost-is-positive-number Tiền thuê phải là số dương
   * @apiError quantityEmployee-is-positive-integer Số lượng lao động tham gia phải là số nguyên dương
   *
   * @apiErrorExample name is required:
   *     HTTP/1.1 409 Conflict
   *     {
   *       "errorMessage": "Vui lòng nhập tên nhà thầu phụ"
   *     }
   *
   * @apiErrorExample cost is positive number:
   *     HTTP/1.1 409 Conflict
   *     {
   *       "errorMessage": "Tiền thuê phải là số dương"
   *     }
   *
   * @apiErrorExample hiredDate is ISO 8601:
   *     HTTP/1.1 409 Conflict
   *     {
   *       "errorMessage": "Ngày thuê không hợp lệ"
   *     }
   * @apiPermission none
   */
  app.post("/api/subcontractors", (req, res, next) => {
    const body = req.body;

    app.models.subcontractor.create(body, (err, info) => {
      return err ? errorHandle(res, err, 409) : responseHandle(res, info, 201);
    });
  });

  /**
   * @api {get} /subcontractors Get all subcontractors
   * @apiName GetAllSubcontractors
   * @apiVersion 1.0.0
   * @apiGroup Subcontractors
   * @apiSampleRequest http://localhost:3001/api/subcontractors?pageNumber=1&nPerPage=20
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
   * @apiParam {Number} nPerPage Số lượng sản phẩm trên mỗi trang
   *
   * @apiSuccess {Number} totalSubcontractors Tổng số document quản lý công cụ, dụng cụ
   * @apiSuccess {Number} totalPages Tổng số lượng trang
   * @apiSuccess {String} name Tên nhà thầu phụ
   * @apiSuccess {String} serviceProvided Dịch vụ cung cấp
   * @apiSuccess {Date} hireDate Ngày thuê (ISO 8601 format)
   * @apiSuccess {Number} cost Chi phí thuê
   * @apiSuccess {Number} quantityEmployee Số lượng lao động tham gia
   * @apiSuccess {String} note Ghi chú
   * @apiSuccess {String} _id Id của document vừa tạo thành công
   *
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 Ok
   *
   *  {
   *      "totalGoodsIssues": 2,
   *      "totalPages": 1,
   *      "data": [
   *          {
   *              "_id": "5e0acc45b1c82b2dbb7a0fcc",
   *              "name": "tmk",
   *              "serviceProvided": "May cat lua",
   *              "hiredDate": "2019-12-12",
   *              "cost": "9000000",
   *              "quantityEmployee": "200",
   *              "note": null
   *          },
   *          {
   *              "_id": "5e0acc7406c7a42e3a31d3a6",
   *              "name": "tmk",
   *              "serviceProvided": "May cat lua",
   *              "hiredDate": "2019-12-12",
   *              "cost": "5000.500",
   *              "quantityEmployee": "200",
   *              "note": null
   *          }
   *  }
   *
   * @apiError Page-not-found Trang không tồn tại
   * @apiErrorExample Page not found:
   *     HTTP/1.1 404 Not found
   *     {
   *       "errorMessage": "Trang tìm kiếm không tồn tại"
   *     }
   *
   * @apiPermission none
   */
  app.get("/api/subcontractors", (req, res, next) => {
    const query = req.query;

    app.models.subcontractor.find(query, (err, info) => {
      return err ? errorHandle(res, err, 404) : responseHandle(res, info);
    });
  });

  /**
   * @api {get} /subcontractors/:id Get subcontractor by id
   * @apiName GetSubcontractorById
   * @apiVersion 1.0.0
   * @apiGroup Subcontractors
   * @apiSampleRequest http://localhost:3001/api/subcontractors/5e0aac96e69e031c5fca8c8b
   *
   *
   * @apiHeader {String} authorization Token.
   *
   *
   * @apiSuccess {String} name Tên nhà thầu phụ
   * @apiSuccess {String} serviceProvided Dịch vụ cung cấp
   * @apiSuccess {Date} hireDate Ngày thuê (ISO 8601 format)
   * @apiSuccess {Number} cost Chi phí thuê
   * @apiSuccess {Number} quantityEmployee Số lượng lao động tham gia
   * @apiSuccess {String} note Ghi chú
   * @apiSuccess {String} _id Id của document vừa tạo thành công
   *
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 Ok
   *
   *  {
   *      "_id": "5e0acc45b1c82b2dbb7a0fcc",
   *      "name": "tmk",
   *      "serviceProvided": "May cat lua",
   *      "hiredDate": "2019-12-12",
   *      "cost": "9000000",
   *      "quantityEmployee": "200",
   *      "note": null
   *  }
   *
   * @apiError Subcontractor-not-found Document không tồn tại
   * @apiError Invalid-id Id không hợp lệ
   * @apiErrorExample Invalid id:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *       "errorMessage": "Id không hợp lệ"
   *     }
   *
   * @apiErrorExample Subcontractor not found
   *     HTTP/1.1 404 Not Found
   *     {
   *       "errorMessage": "Document không tồn tại"
   *     }
   *
   * @apiPermission none
   */
  app.get("/api/subcontractors/:id", (req, res, next) => {
    const id = req.params.id;

    app.models.subcontractor.findById(id, (err, info) => {
      return err
        ? errorHandle(res, err.errorMessage, err.code)
        : responseHandle(res, info);
    });
  });

  /**
   * @api {delete} /subcontractors/:id Update subcontractor by id
   * @apiName UpdateSubcontractorById
   * @apiVersion 1.0.0
   * @apiGroup Subcontractors
   * @apiSampleRequest http://localhost:3001/api/subcontractors/5e09757502716412c0b026d7
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *
   *  {
   *      "successMessage": "Document nhà thầu phụ đã được xóa thành công"
   *  }
   *
   * @apiError Subcontractor-not-found Document không tồn tại
   * @apiError Invalid-id Id không hợp lệ
   * @apiErrorExample Invalid id:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *       "errorMessage": "Id không hợp lệ"
   *     }
   *
   * @apiErrorExample Subcontractor not found
   *     HTTP/1.1 404 Not Found
   *     {
   *       "errorMessage": "Document không tồn tại"
   *     }
   *
   * @apiPermission none
   */
  app.delete("/api/subcontractors/:id", (req, res, next) => {
    const id = req.params.id;

    app.models.subcontractor.deleteById(id, (err, info) => {
      return err
        ? errorHandle(res, err.errorMessage, err.code)
        : responseHandle(res, info);
    });
  });

  /**
   * @api {patch} /subcontractors Update subcontractor by id
   * @apiName updateSubcontractorById
   * @apiVersion 1.0.0
   * @apiGroup Subcontractors
   * @apiSampleRequest http://localhost:3001/api/subcontractors/5e0accdaf7cd082ea2431756
   *
   * @apiHeader {String} authorization Token.
   *
   * @apiParam {String} name Tên nhà thầu phụ
   * @apiParam {String} serviceProvided Dịch vụ cung cấp
   * @apiParam {Date} hireDate Ngày thuê (ISO 8601 format)
   * @apiParam {Number} cost Chi phí thuê
   * @apiParam {Number} quantityEmployee Số lượng lao động tham gia
   * @apiParam {String} note Ghi chú
   *
   *
   * @apiParamExample {json} Request-Example:
   *
   *  {
   *      "name": "updated",
   *      "serviceProvided": "updated",
   *      "hiredDate": "2019-01-01",
   *      "cost": "99999",
   *      "quantityEmployee": "999999",
   *      "note": "updated"
   *  }
   *
   * @apiSuccess {String} name Tên nhà thầu phụ
   * @apiSuccess {String} serviceProvided Dịch vụ cung cấp
   * @apiSuccess {Date} hireDate Ngày thuê (ISO 8601 format)
   * @apiSuccess {Number} cost Chi phí thuê
   * @apiSuccess {Number} quantityEmployee Số lượng lao động tham gia
   * @apiSuccess {String} note Ghi chú
   * @apiSuccess {String} _id Id của document vừa tạo thành công
   *
   *
   * @apiSuccessExample Success-Response:
   *  HTTP/1.1 200 OK
   *
   *  {
   *      "_id": "5e0acc7406c7a42e3a31d3a6",
   *      "name": "updated",
   *      "serviceProvided": "updated",
   *      "hiredDate": "2019-01-01",
   *      "cost": "99999",
   *      "quantityEmployee": "999999",
   *      "note": "updated"
   *  }
   *
   *
   * @apiError hiredDate-is-ISO8061-format Ngày thuê phải là định dạng ISO 8601
   * @apiError cost-is-positive-number Tiền thuê phải là số dương
   * @apiError quantityEmployee-is-positive-integer Số lượng lao động tham gia phải là số nguyên dương
   *
   * @apiErrorExample cost is positive number:
   *     HTTP/1.1 409 Conflict
   *     {
   *       "errorMessage": "Tiền thuê phải là số dương"
   *     }
   *
   * @apiErrorExample hiredDate is ISO 8601:
   *     HTTP/1.1 409 Conflict
   *     {
   *       "errorMessage": "Ngày thuê không hợp lệ"
   *     }
   * @apiPermission none
   */
  app.patch("/api/subcontractors/:id", (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    app.models.subcontractor.updateById(id, body, (err, info) => {
      return err
        ? errorHandle(res, err.errMessage, err.code)
        : responseHandle(res, info);
    });
  });
};
