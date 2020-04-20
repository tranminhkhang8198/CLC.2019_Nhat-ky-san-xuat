const Router = require("express").Router();

const {
  validateBeforeCreate,
  validateParamId,
  validateBeforeUpdate,
} = require("../../validations/goodsIssue.validation");

const { postValidator } = require("../../validations/goodsIssueV2.validation");
const {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
} = require("../../controllers/goodsIssue.controller");

/**
 * @api {post} /goods-issues Create new goods issue
 * @apiName CreateGoodsIssue
 * @apiVersion 1.0.0
 * @apiGroup GoodIssues
 * @apiSampleRequest http://localhost:3001/api/goods-issues
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {String} receiverId Id của người nhận (dựa trên _id lúc tạo user)
 * @apiParam {String} productId Id của sản phẩm (có thể là id của Thuốc bvtv hoặc Phân bón hoặc Giống)
 * @apiParam {String} productType Loại của sản phẩm (một trong 3 loại "Thuốc bvtv", "Phân bón", "Giống")
 * @apiParam {Number} quantity Số lượng
 * @apiParam {Date} issuedDate Ngày xuất kho (ISO 8601 format)
 * @apiParam {Date} receivedDate Ngày nhận sản phẩm (ISO 8601 format)
 * @apiParam {String} goodsReceiptId Id hóa đơn nhập
 * @apiParam {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiParam {String} note Ghi chú
 *
 *
 * @apiParamExample {json} Request-Example:
 *
 *  {
 *      "receiverId": "5e058f0f089c052958b35c59",
 *      "productId": "5e057818a1c1111795e29b76",
 *      "quantity": "2",
 *      "issuedDate": "2019-12-12",
 *      "receivedDate": "2019-12-12",
 *      "productType": "Thuốc bvtv",
 *      "goodsReceiptId": "21893453567654",
 *      "cooperativeId": "HTXNN",
 *      "note": "Just note something you want"
 *  }
 *
 * @apiSuccess {String} receiverId Id của người nhận (dựa trên _id lúc tạo user)
 * @apiSuccess {String} productId Id của sản phẩm (có thể là id của Thuốc bvtv hoặc Phân bón hoặc Giống)
 * @apiSuccess {String} productType Loại của sản phẩm (một trong 3 loại "Thuốc bvtv", "Phân bón", "Giống")
 * @apiSuccess {Number} quantity Số lượng
 * @apiSuccess {Date} issuedDate Ngày xuất kho (ISO 8601 format)
 * @apiSuccess {Date} receivedDate Ngày nhận thuốc (ISO 8601 format)
 * @apiSuccess {String} goodsReceiptId Id hóa đơn nhập
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *
 *  {
 *      "receiverId": "5e058f0f089c052958b35c59",
 *      "productId": "5e057818a1c1111795e29b76",
 *      "productType": "Thuốc bvtv",
 *      "quantity": "2",
 *      "issuedDate": "2019-12-12",
 *      "receivedDate": "2019-12-12",
 *      "goodsReceiptId": "21893453567654",
 *      "cooperativeId": "HTXNN",
 *      "note": "Just note something you want",
 *      "created_at": "2019-12-30T02:35:32.306Z",
 *      "_id": "5e0962f326b7b011c825789c"
 *  }
 *
 * @apiError productType-is-required Trường loại sản phẩm là bắt buộc
 * @apiError productType-does-not-exist Trường loại sản phẩm không tồn tại (Loại sp phải là "Thuốc bvtv" || "Phân bón" || "Giống")
 * @apiError receiverId-is-required Trường id người nhận là bắt buộc
 * @apiError productId-is-required Trường id sản phẩm là bắt buộc
 * @apiError quantity-is-required Số lượng là bắt buộc
 * @apiError quantity-is-positive-integer Số lượng phải là số nguyên dương
 * @apiError issuedDate-is-ISO8061-format Ngày xuất kho phải là định dạng ISO 8601
 * @apiError receivedDate-is-ISO8061-format Ngày nhận phải là định dạng ISO 8601
 * @apiError cooperativeId-is-required Trường id hợp tác xã là bắt buộc
 * @apiError receiptId-is-required Trường id hóa đơn nhập là bắt buộc
 * @apiError productId-does-not-exist Sản phẩm không tồn tại trong danh mục
 * @apiError productId-is-invalid Id sản phẩm không hợp lệ
 * @apiError cooperativeId-does-not-exist Hợp tác xã không tồn tại
 * @apiError receiverId-does-not-exist Người nhận không tồn tại
 * @apiError receiverId-is-invalid Id người nhận không hợp lệ
 * @apiError goodsReceiptId-does-not-exist Hóa đơn nhập không tồn tại
 * @apiError goodsReceiptId-is-invalid Id hóa đơn nhập không tồn tại
 * @apiErrorExample productType is required:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "errorMessage": "Vui lòng nhập loại sản phẩm"
 *     }
 *
 * @apiErrorExample productType does not exist:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "errorMessage": "Loại sản phẩm không tồn tại"
 *     }
 *
 * @apiErrorExample issuedDate is ISO 8601:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "errorMessage": "Ngày xuất kho không hợp lệ"
 *     }
 * @apiPermission none
 */
Router.route("/").post(postValidator, create);

/**
 * @api {get} /goods-issues Get all goods issue
 * @apiName GetAllGoodsIssue
 * @apiVersion 1.0.0
 * @apiGroup GoodIssues
 * @apiSampleRequest http://localhost:3001/api/goods-issues
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
 * @apiParam {Number} nPerPage Số lượng sản phẩm trên mỗi trang
 *
 * @apiSuccess {Number} totalProducts Tổng số phân bón trong danh mục
 * @apiSuccess {Number} totalPages Tổng số lượng trang
 * @apiSuccess {String} receiverId Id của người nhận (dựa trên _id lúc tạo user)
 * @apiSuccess {String} productId Id của sản phẩm (có thể là id của Thuốc bvtv hoặc Phân bón hoặc Giống)
 * @apiSuccess {String} productType Loại của sản phẩm (một trong 3 loại "Thuốc bvtv", "Phân bón", "Giống")
 * @apiSuccess {Number} quantity Số lượng
 * @apiSuccess {Date} issuedDate Ngày xuất kho (ISO 8601 format)
 * @apiSuccess {Date} receivedDate Ngày nhận thuốc (ISO 8601 format)
 * @apiSuccess {String} goodsReceiptId Id hóa đơn nhập
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "totalGoodsIssues": 2,
 *      "totalPages": 1,
 *      "data": [
 *          {
 *              "_id": "5e09757502716412c0b026d7",
 *              "receiverId": "5e058f0f089c052958b35c59",
 *              "productId": "5e057818a1c1111795e29b76",
 *              "productType": "Thuốc bvtv",
 *              "quantity": "2",
 *              "issuedDate": "2019-12-30",
 *              "receivedDate": "2019-12-31",
 *              "goodsReceiptId": "21893453567654",
 *              "cooperativeId": "HTXNN",
 *              "note": "Just note something you want",
 *              "created_at": "2019-12-30T03:56:35.656Z",
 *              "productName": "Abatimec 1.8EC",
 *              "receiverName": "khang"
 *          },
 *          {
 *              "_id": "5e097554b50bae12772bdd09",
 *              "receiverId": "5e058f0f089c052958b35c59",
 *              "productId": "5e057818a1c1111795e29b76",
 *              "productType": "Thuốc bvtv",
 *              "quantity": "2",
 *              "issuedDate": "2019-12-12",
 *              "receivedDate": "2019-12-12",
 *              "goodsReceiptId": "21893453567654",
 *              "cooperativeId": "HTXNN",
 *              "note": "Just note something you want",
 *              "created_at": "2019-12-30T03:55:39.570Z",
 *              "productName": "Abatimec 1.8EC",
 *              "receiverName": "khang"
 *          }
 *      ]
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
Router.route("/").get(getAll);

/**
 * @api {get} /goods-issues/:id Get goods issue by id
 * @apiName GetGoodsIssueById
 * @apiVersion 1.0.0
 * @apiGroup GoodIssues
 * @apiSampleRequest http://localhost:3001/api/goods-issues/5e09757502716412c0b026d7
 *
 * @apiHeader {String} authorization Token.
 *
 *
 * @apiSuccess {String} receiverId Id của người nhận (dựa trên _id lúc tạo user)
 * @apiSuccess {String} productId Id của sản phẩm (có thể là id của Thuốc bvtv hoặc Phân bón hoặc Giống)
 * @apiSuccess {String} productType Loại của sản phẩm (một trong 3 loại "Thuốc bvtv", "Phân bón", "Giống")
 * @apiSuccess {Number} quantity Số lượng
 * @apiSuccess {Date} issuedDate Ngày xuất kho (ISO 8601 format)
 * @apiSuccess {Date} receivedDate Ngày nhận thuốc (ISO 8601 format)
 * @apiSuccess {String} goodsReceiptId Id hóa đơn nhập
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "_id": "5e09757502716412c0b026d7",
 *      "receiverId": "5e058f0f089c052958b35c59",
 *      "productId": "5e057818a1c1111795e29b76",
 *      "productType": "Thuốc bvtv",
 *      "quantity": "2",
 *      "issuedDate": "2019-12-30",
 *      "receivedDate": "2019-12-31",
 *      "goodsReceiptId": "21893453567654",
 *      "cooperativeId": "HTXNN",
 *      "note": "Just note something you want",
 *      "created_at": "2019-12-30T03:56:35.656Z"
 *  }
 *
 * @apiError Goods-issue-not-found Hóa đơn xuất không tồn tại
 * @apiError Invalid-id Id không hợp lệ
 * @apiErrorExample Invalid id:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "errorMessage": "Id không hợp lệ"
 *     }
 *
 * @apiErrorExample Goods issue not found
 *     HTTP/1.1 404 Not Found
 *     {
 *       "errorMessage": "Id Hóa đơn xuất kho không tồn tại"
 *     }
 * @apiPermission none
 */
Router.route("/:id").get(validateParamId, getOne);

/**
 * @api {delete} /goods-issues/:id Delete goods issue by id
 * @apiName DeleteGoodsIssueById
 * @apiVersion 1.0.0
 * @apiGroup GoodIssues
 * @apiSampleRequest http://localhost:3001/api/goods-issues/5e09757502716412c0b026d7
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "successMessage": "Hóa đơn được xóa thành công"
 *  }
 *
 * @apiError Goods-issue-not-found Hóa đơn xuất không tồn tại
 * @apiError Invalid-id Id không hợp lệ
 * @apiErrorExample Invalid id:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "errorMessage": "Id không hợp lệ"
 *     }
 *
 * @apiErrorExample Goods issue not found
 *     HTTP/1.1 404 Not Found
 *     {
 *       "errorMessage": "Id Hóa đơn xuất kho không tồn tại"
 *     }
 *
 * @apiPermission none
 */
Router.route("/:id").delete(validateParamId, deleteOne);

/**
 * @api {patch} /goods-issues Update goods issue by id
 * @apiName UpdateGoodsIssueById
 * @apiVersion 1.0.0
 * @apiGroup GoodIssues
 * @apiSampleRequest http://localhost:3001/api/goods-issues/5e09757502716412c0b026d7
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {String} receiverId Id của người nhận (dựa trên _id lúc tạo user)
 * @apiParam {String} productId Id của sản phẩm (có thể là id của Thuốc bvtv hoặc Phân bón hoặc Giống)
 * @apiParam {String} productType Loại của sản phẩm (một trong 3 loại "Thuốc bvtv", "Phân bón", "Giống")
 * @apiParam {Number} quantity Số lượng
 * @apiParam {Date} issuedDate Ngày xuất kho (ISO 8601 format)
 * @apiParam {Date} receivedDate Ngày nhận sản phẩm (ISO 8601 format)
 * @apiParam {String} goodsReceiptId Id hóa đơn nhập
 * @apiParam {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiParam {String} note Ghi chú
 *
 *
 * @apiParamExample {json} Request-Example:
 *
 *  {
 *      "receiverId": "5e058f0f089c052958b35c59",
 *      "productId": "5e057818a1c1111795e29b76",
 *      "quantity": "900",
 *      "issuedDate": "2019-01-01",
 *      "receivedDate": "2019-01-01",
 *      "productType": "Thuốc bvtv",
 *      "goodsReceiptId": "21893453567654",
 *      "cooperativeId": "HTXNN",
 *      "note": "updated"
 *  }
 *
 * @apiSuccess {String} receiverId Id của người nhận (dựa trên _id lúc tạo user)
 * @apiSuccess {String} productId Id của sản phẩm (có thể là id của Thuốc bvtv hoặc Phân bón hoặc Giống)
 * @apiSuccess {String} productType Loại của sản phẩm (một trong 3 loại "Thuốc bvtv", "Phân bón", "Giống")
 * @apiSuccess {Number} quantity Số lượng
 * @apiSuccess {Date} issuedDate Ngày xuất kho (ISO 8601 format)
 * @apiSuccess {Date} receivedDate Ngày nhận thuốc (ISO 8601 format)
 * @apiSuccess {String} goodsReceiptId Id hóa đơn nhập
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "_id": "5e09757502716412c0b026d7",
 *      "receiverId": "5e058f0f089c052958b35c59",
 *      "productId": "5e057818a1c1111795e29b76",
 *      "productType": "Thuốc bvtv",
 *      "quantity": "900",
 *      "issuedDate": "2019-01-01",
 *      "receivedDate": "2019-01-01",
 *      "goodsReceiptId": "21893453567654",
 *      "cooperativeId": "HTXNN",
 *      "note": "updated",
 *      "created_at": "2019-12-30T03:59:20.896Z"
 *  }
 *
 * @apiError productType-does-not-exist Trường loại sản phẩm không tồn tại (Loại sp phải là "Thuốc bvtv" || "Phân bón" || "Giống")
 * @apiError quantity-is-positive-integer Số lượng phải là số nguyên dương
 * @apiError issuedDate-is-ISO8061-format Ngày xuất kho phải là định dạng ISO 8601
 * @apiError receivedDate-is-ISO8061-format Ngày nhận phải là định dạng ISO 8601
 * @apiError productId-does-not-exist Sản phẩm không tồn tại trong danh mục
 * @apiError productId-is-invalid Id sản phẩm không hợp lệ
 * @apiError cooperativeId-does-not-exist Hợp tác xã không tồn tại
 * @apiError receiverId-does-not-exist Người nhận không tồn tại
 * @apiError receiverId-is-invalid Id người nhận không hợp lệ
 * @apiError Goods-issue-not-found Hóa đơn xuất không tồn tại
 * @apiError goodsReceiptId-does-not-exist Hóa đơn nhập không tồn tại
 * @apiError goodsReceiptId-is-invalid Id hóa đơn nhập không tồn tại
 * @apiError Invalid-id Id không hợp lệ
 * @apiErrorExample Invalid id:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "errorMessage": "Id không hợp lệ"
 *     }
 *
 * @apiErrorExample Goods issue not found
 *     HTTP/1.1 404 Not Found
 *     {
 *       "errorMessage": "Id Hóa đơn xuất kho không tồn tại"
 *     }
 *
 * @apiErrorExample productType is required:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "errorMessage": "Vui lòng nhập loại sản phẩm"
 *     }
 *
 * @apiErrorExample productType does not exist:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "errorMessage": "Loại sản phẩm không tồn tại"
 *     }
 *
 * @apiErrorExample issuedDate is ISO 8601:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "errorMessage": "Ngày xuất kho không hợp lệ"
 *     }
 * @apiPermission none
 */
Router.route("/:id").patch(validateParamId, validateBeforeUpdate, update);

module.exports = Router;
