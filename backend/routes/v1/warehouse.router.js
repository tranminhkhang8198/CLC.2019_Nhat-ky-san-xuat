const Router = require("express").Router();

const {
  validateBeforeCreate,
  validateParamId,
  validateBeforeUpdate
} = require("../../validations/warehouse.validation");
const {
  create,
  getAll,
  getOne,
  update,
  deleteOne
} = require("../../controllers/warehouse.controller");

/**
 *
 * @api {post} /api/warehouses Create new warehouse document
 * @apiSampleRequest http://localhost:3001/api/warehouses/
 *
 * @apiName CreateNewWarehouse
 * @apiGroup Warehouses
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {ObjectId} productId Id của sản phẩm (có thể là id của Thuốc bvtv hoặc Phân bón hoặc Giống)
 * @apiParam {String} productType Loại của sản phẩm (một trong 3 loại "Thuốc bvtv", "Phân bón", "Giống")
 * @apiParam {Number} quantity Số lượng
 * @apiParam {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiParam {ObjectId} goodsReceiptId Id hóa đơn nhập
 * @apiParam {String} price Giá sản phẩm
 * @apiParam {String} patchCode Mã số lô
 *
 *
 * @apiParamExample {json} Request-Example:
 *
 *  {
 *      "productId": "5e78640e10fb091ae3b8ca7f",
 *	    "price": "900000",
 *	    "productType": "Thuốc bvtv",
 *	    "quantity": "99",
 *	    "goodsReceiptId": "5e78969830f3a00b8ed4b116",
 *	    "cooperativeId": "HTXUMH3",
 *	    "patchCode": "test12345"
 *  }
 *
 * @apiSuccess {ObjectId} productId Id của sản phẩm (có thể là id của Thuốc bvtv hoặc Phân bón hoặc Giống)
 * @apiSuccess {String} productType Loại của sản phẩm (một trong 3 loại "Thuốc bvtv", "Phân bón", "Giống")
 * @apiSuccess {Number} quantity Số lượng
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {ObjectId} goodsReceiptId Id hóa đơn nhập
 * @apiSuccess {String} price Giá sản phẩm
 * @apiSuccess {String} patchCode Mã số lô
 * @apiSuccess {ObjectId} _id Id của document vừa tạo thành công
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *
 *  {
 *      "productId": "5e78640e10fb091ae3b8ca7f",
 *	    "price": "900000",
 *	    "productType": "Thuốc bvtv",
 *	    "quantity": "99",
 *	    "goodsReceiptId": "5e78969830f3a00b8ed4b116",
 *	    "cooperativeId": "HTXUMH3",
 *	    "patchCode": "test12345"
 *      "_id": "5e106cf39a2d430f0fda2557"
 *  }
 *
 * @apiError productType-is-required Trường loại sản phẩm là bắt buộc
 * @apiError productType-does-not-exist Trường loại sản phẩm không tồn tại (Loại sp phải là "Thuốc bvtv" || "Phân bón" || "Giống")
 * @apiError productId-is-required Trường id sản phẩm là bắt buộc
 * @apiError quantity-is-required Số lượng là bắt buộc
 * @apiError quantity-is-positive-integer Số lượng phải là số nguyên dương
 * @apiError productId-does-not-exist Sản phẩm không tồn tại trong danh mục
 * @apiError productId-is-invalid Id sản phẩm không hợp lệ
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
 * @apiPermission none
 */
Router.route("/").post(validateBeforeCreate, create);

/**
 * @api {get} /api/warehouses Get All Warehouse Doc
 * @apiSampleRequest http://localhost:3001/api/warehouses/
 *
 * @apiName GetAllWarehouseDocs
 * @apiGroup Warehouses
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
 * @apiParam {Number} nPerPage Số lượng document kho thuốc trên mỗi trang
 *
 * @apiSuccess {Number} totalSubcontractors Tổng số document kho thuốc trong kho
 * @apiSuccess {Number} totalPages Tổng số lượng trang
 * @apiSuccess {ObjectId} productName Tên của sản phẩm
 * @apiSuccess {String} productType Loại của sản phẩm (một trong 3 loại "Thuốc bvtv", "Phân bón", "Giống")
 * @apiSuccess {Number} quantity Số lượng
 * @apiSuccess {ObjectId} goodsReceiptId Id hóa đơn nhập
 * @apiSuccess {String} patchCode Số lô
 * @apiSuccess {ObjectId} _id Id của document
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "totalWarehouses": 2,
 *      "totalPages": 1,
 *      "data": [
 *          {
 *              "_id": "5e106cf39a2d430f0fda2557",
 *              "productName": "Ababetter 1.8EC",
 *              "productType": "Thuốc bvtv",
 *              "quantity": "100",
 *              "goodsReceiptId": "1234567890",
 *              "patchCode": "1234567890"
 *          },
 *          {
 *              "_id": "5e1075d453adfe17f413a130",
 *              "productName": "Abagold 55EC",
 *              "productType": "Thuốc bvtv",
 *              "quantity": "9",
 *              "goodsReceiptId": "5e10733dca9ed4129c70715c",
 *              "patchCode": "1234567890"
 *          }
 *      ]
 *  }
 */
Router.route("/").get(getAll);

/**
 * @api {get} /api/warehouses/:id Get Single Warehouse Doc
 * @apiSampleRequest http://localhost:3001/api/warehouses/5e10733dca9ed4129c70715c
 *
 * @apiName GetWarehouseDoc
 * @apiGroup Warehouses
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiSuccess {ObjectId} productName Tên của sản phẩm
 * @apiSuccess {String} productType Loại của sản phẩm (một trong 3 loại "Thuốc bvtv", "Phân bón", "Giống")
 * @apiSuccess {Number} quantity Số lượng
 * @apiSuccess {ObjectId} goodsReceiptId Id hóa đơn nhập
 * @apiSuccess {String} patchCode Số lô
 * @apiSuccess {ObjectId} _id Id của document
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "totalWarehouses": 2,
 *      "totalPages": 1,
 *      "data": [
 *          {
 *              "_id": "5e106cf39a2d430f0fda2557",
 *              "productName": "Ababetter 1.8EC",
 *              "productType": "Thuốc bvtv",
 *              "quantity": "100",
 *              "goodsReceiptId": "1234567890",
 *              "patchCode": "1234567890"
 *          }
 *      ]
 *  }
 */
Router.route("/:id").get(validateParamId, getOne);

/**
 *
 * @api {patch} /api/warehouses/:id Update Warehouse Doc
 * @apiSampleRequest http://localhost:3001/api/warehouses/5e10733dca9ed4129c70715c
 *
 * @apiName UpdateWarehouseById
 * @apiGroup Warehouses
 *
 * @apiHeader {String} authorization Token.
 *
 *
 * @apiParam {ObjectId} productId Id của sản phẩm (có thể là id của Thuốc bvtv hoặc Phân bón hoặc Giống)
 * @apiParam {String} productType Loại của sản phẩm (một trong 3 loại "Thuốc bvtv", "Phân bón", "Giống")
 * @apiParam {Number} quantity Số lượng
 * @apiParam {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiParam {ObjectId} goodsReceiptId Id hóa đơn nhập
 * @apiParam {String} price Giá sản phẩm
 * @apiParam {String} patchCode Mã số lô
 *
 * @apiParamExample {json} Request-Example:
 *
 *  {
 *      "productId": "5e057818a1c1111795e29b75",
 *      "productType": "Thuốc bvtv",
 *      "quantity": "9999",
 *      "goodsReceiptId": "5e16a02767944a0c086f82a2",
 *      "patchCode": "999999999",
 *      "cooperativeId": "5e057818a1c1111795e29b75"
 *  }
 *
 * @apiSuccess {ObjectId} productId Id của sản phẩm (có thể là id của Thuốc bvtv hoặc Phân bón hoặc Giống)
 * @apiSuccess {String} productType Loại của sản phẩm (một trong 3 loại "Thuốc bvtv", "Phân bón", "Giống")
 * @apiSuccess {Number} quantity Số lượng
 * @apiSuccess {ObjectId} goodsReceiptId Id hóa đơn nhập
 * @apiSuccess {String} patchCode Số lô
 * @apiSuccess {ObjectId} _id Id của document vừa tạo thành công
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "_id": "5e106cf39a2d430f0fda2557",
 *      "productId": "5e057818a1c1111795e29b75",
 *      "productType": "Thuốc bvtv",
 *      "quantity": "9999",
 *      "goodsReceiptId": "5e16a02767944a0c086f82a2",
 *      "patchCode": "999999999",
 *      "cooperativeId": "5e057818a1c1111795e29b75"
 *  }
 *
 * @apiError productType-does-not-exist Trường loại sản phẩm không đúng (Loại sp phải là "Thuốc bvtv" || "Phân bón" || "Giống")
 * @apiError quantity-is-positive-integer Số lượng phải là số nguyên dương
 * @apiError productId-does-not-exist Sản phẩm không tồn tại trong danh mục
 * @apiError productId-is-invalid Id sản phẩm không hợp lệ
 * @apiError goodsReceiptId-does-not-exist Hóa đơn nhập không tồn tại
 * @apiError goodsReceiptId-is-invalid Id hóa đơn nhập không tồn tại
 *
 * @apiErrorExample productType does not exist:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "errorMessage": "Loại sản phẩm không tồn tại"
 *     }
 *
 * @apiPermission none
 */
Router.route("/:id").patch(validateParamId, validateBeforeUpdate, update);

/**
 *
 * @api {delete} /api/warehouses/:id Delete Warehouse Doc
 * @apiSampleRequest http://localhost:3001/api/warehouses/5e10733dca9ed4129c70715c
 *
 * @apiGroup Warehouses
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "successMessage": "Document kho thuốc đã được xóa thành công"
 *  }
 *
 * @apiError Warehouse-document-not-found Document không tồn tại
 * @apiError Invalid-id Id không hợp lệ
 * @apiErrorExample Invalid id:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "errorMessage": "Id không hợp lệ"
 *     }
 *
 * @apiErrorExample Warehouse not found
 *     HTTP/1.1 404 Not Found
 *     {
 *       "errorMessage": "Document không tồn tại"
 *     }
 *
 * @apiPermission none
 */
Router.route("/:id").delete(validateParamId, deleteOne);

module.exports = Router;
