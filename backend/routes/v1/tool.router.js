const Router = require("express").Router();

const {
  create,
  getAll,
  getOne,
  update,
  deleteOne
} = require("../../controllers/tool.controller");

const {
  validateBeforeCreate,
  validateBeforeUpdate
} = require("../../validations/tool.validation");

/**
 * @api {post} /api/tools Create new tool
 * @apiName CreateNewTool
 * @apiGroup Tools
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/tools
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {String} name Tên công cụ, dụng cụ (vật liệu y tế, bao, đồ bảo hộ lao động,... )
 * @apiParam {Number} total Tổng số lượng
 * @apiParam {Number} available Số lượng còn lượng trong kho
 * @apiParam {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiParam {String} image Image file
 * @apiParam {String} note Ghi chú
 *
 *
 * @apiParamExample {json} Request-Example:
 *
 *  {
 *      "name": "Dụng cụ y tế",
 *      "total": "50",
 *      "cooperativeId": "HTXUMH3",
 *      "image": file
 *  }
 *
 * @apiSuccess {String} name Tên công cụ, dụng cụ (vật liệu y tế, bao, đồ bảo hộ lao động,... )
 * @apiSuccess {Number} total Tổng số lượng
 * @apiSuccess {Number} available Số lượng còn lượng trong kho
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} image Image url
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *
 *  {
 *      "name": "Dụng cụ y tế",
 *      "total": "9",
 *      "available": "9",
 *      "image": "http://localhost:3001/tool/image-1584776076120.jpeg",
 *      "note": "Something",
 *      "cooperativeId": "HTXUMH3",
 *      "_id": "5e75c38c40019a40362038ff"
 *  }
 *
 *
 * @apiError name-is-required Trường tên dụng cụ là bắt buộc
 * @apiError total-is-required Tổng số lượng là bắt buộc
 * @apiError total-is-positive-integer Tổng số lượng phải là số nguyên dương
 * @apiError cooperativeId-is-required Tổng cooperativeId là bắt buộc
 * @apiError cooperative-doesnt-exist Hợp tác xã không tồn tại
 * @apiErrorExample total-must-be-positive-number:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Tổng số lượng phải là số nguyên dương"
 *     }
 * @apiErrorExample total is required:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Vui lòng nhập tổng số lượng"
 *     }
 *
 * @apiErrorExample cooperative does not exist:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Hợp tác xã không tồn tại"
 *     }
 *
 * @apiPermission none
 */
Router.route("/").post(validateBeforeCreate, create);

/**
 * @api {get} /api/tools Get all tools
 * @apiName GetAllTools
 * @apiGroup Tools
 * @apiExample {curl} Get All Tools Management with paginating:
 *     curl -i http://localhost:3001/api/tools?pageNumber=1&nPerPage=20
 *
 * @apiExample {curl} Get All Tools Management with paginating and specific cooperativeId:
 *     curl -i http://localhost:3001/api/tools?pageNumber=1&nPerPage=20&cooperativeId=HTXUMH3
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
 * @apiParam {Number} nPerPage Số lượng sản phẩm trên mỗi trang
 *
 * @apiSuccess {Number} totalTools Tổng số document quản lý công cụ, dụng cụ
 * @apiSuccess {Number} totalPages Tổng số lượng trang
 * @apiSuccess {String} name Tên công cụ, dụng cụ (vật liệu y tế, bao, đồ bảo hộ lao động,... )
 * @apiSuccess {Number} total Tổng số lượng
 * @apiSuccess {Number} available Số lượng còn lượng trong kho
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} image Image url
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 Ok
 *
 *  {
 *       "totalTools": 2,
 *       "totalPages": 1,
 *       "data": [
 *           {
 *           "_id": "5e75bc7fe5350edcf2e3276d",
 *           "name": "Dụng cụ y tế",
 *           "total": "50",
 *           "available": "50",
 *           "image": "http://localhost:3001/tool/image-1584774271059.jpeg",
 *           "note": null,
 *           "cooperativeId": "HTXUMH3"
 *           },
 *           {
 *               "_id": "5e75bc94f732ebde34895eb0",
 *               "name": "Bao lúa",
 *               "total": "500",
 *               "available": "99",
 *               "image": "http://localhost:3001/tool/image-1584774292496.jpeg",
 *               "note": null,
 *               "cooperativeId": "HTXUMH3"
 *           }
 *       ]
 *   }
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
 * @api {get} /api/tools/:id Get tool by id
 * @apiName GetToolsById
 * @apiGroup Tools
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/tools/5e0aac96e69e031c5fca8c8b
 *
 * @apiHeader {String} authorization Token.
 *
 *
 * @apiSuccess {String} name Tên công cụ, dụng cụ (vật liệu y tế, bao, đồ bảo hộ lao động,... )
 * @apiSuccess {Number} total Tổng số lượng
 * @apiSuccess {Number} available Số lượng còn lượng trong kho
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} image Image url
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 Ok
 *
 *  {
 *      "name": "Dụng cụ y tế",
 *      "total": "9",
 *      "available": "9",
 *      "image": "http://localhost:3001/tool/image-1584776076120.jpeg",
 *      "note": "Something",
 *      "cooperativeId": "HTXUMH3",
 *      "_id": "5e75c38c40019a40362038ff"
 *  }
 *
 * @apiError Tool-is-not-found Dụng cụ không tồn tại
 * @apiError Invalid-id Id không hợp lệ
 * @apiErrorExample Invalid id:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "errorMessage": "Id không hợp lệ"
 *     }
 *
 * @apiErrorExample Tool not found
 *     HTTP/1.1 404 Not Found
 *     {
 *       "errorMessage": "Dụng cụ không tồn tại"
 *     }
 *
 * @apiPermission none
 */
Router.route("/:id").get(getOne);

/**
 * @api {patch} /api/tools/:id Update tool
 * @apiName UpdateTool
 * @apiGroup Tools
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/tools/5e0ab067f1ec331e994c6891
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {String} name Tên công cụ, dụng cụ (vật liệu y tế, bao, đồ bảo hộ lao động,... )
 * @apiParam {Number} total Tổng số lượng
 * @apiParam {Number} available Số lượng còn lượng trong kho
 * @apiParam {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiParam {String} image Image file
 * @apiParam {String} note Ghi chú
 *
 *
 * @apiParamExample {json} Request-Example:
 *
 *  {
 *      "name": "updated",
 *      "total": "999",
 *      "available": "999",
 *      "cooperativeId": "HTXNN",
 *      "image": file
 *      "note": "updated"
 *  }
 *
 * @apiSuccess {String} name Tên công cụ, dụng cụ (vật liệu y tế, bao, đồ bảo hộ lao động,... )
 * @apiSuccess {Number} total Tổng số lượng
 * @apiSuccess {Number} available Số lượng còn lượng trong kho
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} image Image url
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "_id": "5e0ab067f1ec331e994c6891",
 *      "name": "updated",
 *      "total": "999",
 *      "available": "999",
 *      "cooperativeId": "HTXNN",
 *      "image: "http://localhost:3001/tool/image-1584774271059.jpeg"
 *      "note": "updated"
 *  }
 *
 *
 * @apiError total-is-positive-integer Số lượng phải là số nguyên dương
 * @apiError name-exists Tên dụng cụ đã tồn tại
 * @apiError wrong-image-extension Định dạng hình ảnh không phù hợp
 * @apiError cooperative-doesnt-exist Hợp tác xã không tồn tại
 *
 * @apiErrorExample total is positive number:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Tổng số lượng phải là số nguyên dương"
 *     }
 *
 * @apiErrorExample name exists:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Dụng cụ với tên " + name + " đã tồn tại"
 *     }
 *
 * @apiErrorExample issuedDate is ISO 8601:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Ngày xuất kho không hợp lệ"
 *     }
 * @apiPermission none
 */
Router.route("/:id").patch(validateBeforeUpdate, update);

/**
 * @api {delete} /tools/:id Delete document tool by id
 * @apiName DeleteToolById
 * @apiGroup Tools
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/tools/5e09757502716412c0b026d7
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "successMessage": "Dụng cụ được xóa thành công"
 *  }
 *
 * @apiError Tool-not-found Dụng cụ không tồn tại
 * @apiError Invalid-id Id không hợp lệ
 * @apiErrorExample Invalid id:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "errorMessage": "Id không hợp lệ"
 *     }
 *
 * @apiErrorExample Tool not found
 *     HTTP/1.1 404 Not Found
 *     {
 *       "errorMessage": "Dụng cụ với id = ${id} không tồn tại"
 *     }
 *
 * @apiPermission none
 */
Router.route("/:id").delete(deleteOne);

module.exports = Router;
