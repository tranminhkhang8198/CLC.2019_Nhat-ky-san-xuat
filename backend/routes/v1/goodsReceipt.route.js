const Router = require('express').Router();
const {
    insertOne,
} = require('../../controllers/goodsReceipt.controller')

/**
 * @api {post} /v1/api/goodsReceipy Thêm đơn nhập hàng mới.
 * @apiVersion 1.0.0
 * @apiSampleRequest http://localhost:3001/v1/api/goodsReceipt/
 * 
 * @apiName postGoodsReceipts
 * @apiGroup GoodsReceipts
 * @apiHeader {string} authorization
 * @apiParam {String} cooperativeId ID của hợp tác xã
 * @apiParam {String} productId ID của sản phẩm
 * @apiParam {String} productType Loại sản phẩm được nhập
 * @apiParam {Date} transDate Ngày mua
 * @apiParam {String} patchCode Max số lô
 * @apiParam {String} quantity Số lượng
 * @apiParam {String} price Đơn giá
 * @apiParam {String} expireDate Ngày hết hạn
 * @apiParam {Date} inDate Ngày nhập kho
 * @apiParamExample {json} Request-Example:
 *  {
 *      "cooperativeId": "sdfsdfsdf",
 *      "transDate": "2019-10-12T07:40:00.000Z",
 *      "productId": "sdfsd",
 *      "productType": "plant",
 *      "price": 900000,
 *      "quantity": "200",
 *      "patchCode": null,
 *      "expireDate": "2019-12-30 15:30"
 *      "inDate": "1970-01-01T00:00:00.000Z",
 *  }
 *
 * @apiSuccess {String} cooperativeId ID của hợp tác xã
 * @apiSuccess {String} productId ID của sản phẩm
 * @apiSuccess {String} productType Loại sản phẩm được nhập
 * @apiSuccess {Date} transDate Ngày mua
 * @apiSuccess {String} patchCode Max số lô
 * @apiSuccess {String} quantity Số lượng
 * @apiSuccess {String} price Đơn giá
 * @apiSuccess {String} expireDate Ngày hết hạn
 * @apiSuccess {Date} inDate Ngày nhập kho
 * @apiSuccess {String} _id ID của hóa đơn nhập hàng
 * @apiSuccess {Date} createdDate Ngày khởi tạo
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "cooperativeId": "sdfsdfsdf",
 *      "transDate": "2019-10-12T07:40:00.000Z",
 *      "productId": "sdfsd",
 *      "productType": "plant",
 *      "price": 900000,
 *      "quantity": 200,
 *      "patchCode": null,
 *      "expireDate": "2019-12-30 15:30"
 *      "inDate": "1970-01-01T00:00:00.000Z",
 *      "notes": "dsfdfsd sfdf",
 *      "createdDate": "2020-01-03T10:17:17.697Z",
 *      "_id": "5e0f14ad3d3b5928ff43fdff"
 *  }
 *
 * @apiErrorExample 404-Response:
 * HTTP/1.1 404 Not Found
 *     {
 *       "error": "Token không hợp lệ"
 *     }
 *
 * 
 * 
 */
Router.route('/').post(
    insertOne,
)

module.exports = Router;