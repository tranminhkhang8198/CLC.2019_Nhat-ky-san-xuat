const Router = require("express").Router();

const {
  validateBeforeCreate,
  validateBeforeUpdate,
  validateParamId,
  validateExist,
  validateBeforeReturn
} = require("../../validations/borrowedTool.validation");

const {
  create,
  getAll,
  getOne,
  update,
  deleteOne,
  returnTool
} = require("../../controllers/borrowedTool.controller");

/**
 * @api {post} /api/borrowedTools Create new document for logging when tool was borrowed by someone
 * @apiName CreateNewBorrowedTool
 * @apiGroup BorrowedTools
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/borrowedTools
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {ObjectId} toolId Id công cụ, dụng cụ cần mượn
 * @apiParam {Number} borrowedQuantity Số lượng mượn
 * @apiParam {Date} borrowedDate Ngày mượn (chuẩn ISO 8601)
 * @apiParam {ObjectId} userBorrowedId Id người mượn
 * @apiParam {String} image Image file
 * @apiParam {String} note Ghi chú
 *
 *
 * @apiParamExample {json} Request-Example:
 *
 *  {
 *      "toolId": "5e76f16b1dcd9d3dcb2dca0a",
 *      "borrowedQuantity": "99",
 *      "borrowedDate": "2020-09-09",
 *      "userBorrowedId": "5dc7da01b47cf4369b24d8f6",
 *      "image": file,
 *      "note": "something"
 *  }
 *
 * @apiSuccess {ObjectId} toolId Id công cụ, dụng cụ cần mượn
 * @apiSuccess {Number} borrowedQuantity Số lượng mượn
 * @apiSuccess {Date} borrowedDate Ngày mượn (chuẩn ISO 8601)
 * @apiSuccess {Date} returnedDate Ngày trả (chuẩn ISO 8601)
 * @apiSuccess {ObjectId} userBorrowedId Id người mượn
 * @apiSuccess {String} cooperativeId cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} image Image file
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *
 *  {
 *      "toolId": "5e76f16b1dcd9d3dcb2dca0a",
 *      "borrowedQuantity": "99",
 *      "borrowedDate": "2020-09-09",
 *      "returnedDate": null
 *      "userBorrowedId": "5dc7da01b47cf4369b24d8f6",
 *      "note": "something"
 *      "image": "http://localhost:3001/tool/image-1584776076120.jpeg",
 *      "cooperativeId": "HTXUMH3",
 *      "_id": "5e75c38c40019a40362038ff"
 *  }
 *
 *
 * @apiError toolId-is-required Trường id dụng cụ là bắt buộc
 * @apiError userBorrowedId-is-required Trường id người mượn là bắt buộc
 * @apiError borrowedQuantity-is-required Số lượng mượn là bắt buộc
 * @apiError borrowedDate-is-required Ngày mượn là bắt buộc
 * @apiError borrowedQuantity-is-greater-than-available Số lượng mượn lớn hơn số lượng hiện tạic
 * @apiError user-doesnt-exist Người mượn không tồn tại
 * @apiErrorExample borrowedQuantity-must-be-positive-number:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Số lượng phải là số nguyên dương lớn hơn 0"
 *     }
 * @apiErrorExample userBorrowedId is required:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Vui lòng nhập id người mượn"
 *     }
 *
 * @apiErrorExample user does not exist:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Người mượn không tồn tại"
 *     }
 *
 * @apiErrorExample borrowed quantity is greater than avaiable:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Số lượng mượn lớn hơn số lượng hiện tại"
 *     }
 *
 * @apiPermission none
 */
Router.route("/").post(validateBeforeCreate, create);

/**
 * @api {get} /api/borrowedTools Get all borrowed tools document
 * @apiName GetAllBorrowedTools
 * @apiGroup BorrowedTools
 * @apiExample {curl} Get all borrowed tools with paginating:
 *     curl -i http://localhost:3001/api/borrowedTools?pageNumber=1&nPerPage=20
 *
 * @apiExample {curl} Get All Tools Management with paginating and specific fields:
 *     curl -i http://localhost:3001/api/borrowedTools?pageNumber=1&nPerPage=20&cooperativeId=HTXUMH3
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
 * @apiParam {Number} nPerPage Số lượng sản phẩm trên mỗi trang
 *
 * @apiSuccess {ObjectId} toolName Tên công cụ, dụng cụ đã mượn
 * @apiSuccess {Number} borrowedQuantity Số lượng mượn
 * @apiSuccess {Date} borrowedDate Ngày mượn (chuẩn ISO 8601)
 * @apiSuccess {Date} returnedDate Ngày trả (chuẩn ISO 8601)
 * @apiSuccess {ObjectId} userBorrowedName Tên người mượn
 * @apiSuccess {String} cooperativeId cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} image Image file
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document
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
 *                "_id": "5e7713bc31d4d0077efd283d",
 *                "borrowedQuantity": "2",
 *                "borrowedDate": "2020-09-09",
 *                "returnedDate": null,
 *                "image": null,
 *                "note": null,
 *                "cooperativeId": "fsdjfe",
 *                "toolName": "Dụng cụ y tế",
 *                "userBorrowedName": "Nguyen Van Loi"
 *            },
 *            {
 *                "_id": "5e7715917d317a09e95f2cbd",
 *                "borrowedQuantity": "19",
 *                "borrowedDate": "2020-09-09",
 *                "returnedDate": null,
 *                "image": null,
 *                "note": null,
 *                "cooperativeId": "fsdjfe",
 *                "toolName": "Bao lúa",
 *                "userBorrowedName": "Nguyen Van Loi"
 *            }
 *            ...
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
 * @api {get} /api/borrowedTools/:id Get borrowed tool document
 * @apiName GetBorrowedTool
 * @apiGroup BorrowedTools
 * @apiExample {curl} Get borrowed tool:
 *     curl -i http://localhost:3001/api/borrowedTools/5e7713bc31d4d0077efd283d
 * @apiHeader {String} authorization Token.
 *
 *
 * @apiSuccess {ObjectId} toolName Tên công cụ, dụng cụ đã mượn
 * @apiSuccess {Number} borrowedQuantity Số lượng mượn
 * @apiSuccess {Date} borrowedDate Ngày mượn (chuẩn ISO 8601)
 * @apiSuccess {Date} returnedDate Ngày trả (chuẩn ISO 8601)
 * @apiSuccess {ObjectId} userBorrowedName Tên người mượn
 * @apiSuccess {String} cooperativeId cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} image Image file
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 Ok
 *
 *  {
 *       {
 *            "_id": "5e7713bc31d4d0077efd283d",
 *            "borrowedQuantity": "2",
 *            "borrowedDate": "2020-09-09",
 *            "returnedDate": null,
 *            "image": null,
 *            "note": null,
 *            "cooperativeId": "fsdjfe",
 *            "toolName": "Dụng cụ y tế",
 *            "userBorrowedName": "Nguyen Van Loi"
 *       }
 *   }
 *
 * @apiError Page-not-found Trang không tồn tại
 * @apiError Invalid-id Id không hợp lệ
 * @apiErrorExample Invalid id:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "errorMessage": "Id không hợp lệ"
 *     }
 * @apiErrorExample Document not found:
 *     HTTP/1.1 404 Not found
 *     {
 *       "errorMessage": "Document không tồn tại"
 *     }
 *
 * @apiPermission none
 */
Router.route("/:id").get(validateParamId, getOne);

/**
 * @api {patch} /api/borrowedTools/:id Update borrowed tool document
 * @apiName UpdateBorrowedTool
 * @apiGroup BorrowedTools
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/borrowedTools/5e7713bc31d4d0077efd283d
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {ObjectId} toolId Id công cụ, dụng cụ cần mượn
 * @apiParam {Number} borrowedQuantity Số lượng mượn
 * @apiParam {Date} borrowedDate Ngày mượn (chuẩn ISO 8601)
 * @apiParam {Date} returnedDate Ngày trả (chuẩn ISO 8601)
 * @apiParam {ObjectId} userBorrowedId Id người mượn
 * @apiParam {String} image Image file
 * @apiParam {String} note Ghi chú
 *
 *
 * @apiParamExample {json} Request-Example:
 *
 *  {
 *      "toolId": "5e76f16b1dcd9d3dcb2dca0a",
 *      "borrowedQuantity": "999",
 *      "borrowedDate": "2020-09-09",
 *      "returnedDate": "2022-01-01",
 *      "userBorrowedId": "5dc7da01b47cf4369b24d8f6",
 *      "cooperativeId": "HTXNN",
 *      "image": file,
 *      "note": "update"
 *  }
 *
 * @apiSuccess {ObjectId} toolId Id công cụ, dụng cụ cần mượn
 * @apiSuccess {Number} borrowedQuantity Số lượng mượn
 * @apiSuccess {Date} borrowedDate Ngày mượn (chuẩn ISO 8601)
 * @apiSuccess {Date} returnedDate Ngày trả (chuẩn ISO 8601)
 * @apiSuccess {ObjectId} userBorrowedId Id người mượn
 * @apiSuccess {String} cooperativeId cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} image Image file
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "toolId": "5e76f16b1dcd9d3dcb2dca0a",
 *      "borrowedQuantity": "99",
 *      "borrowedDate": "2020-09-09",
 *      "returnedDate": "2022-01-01",
 *      "userBorrowedId": "5dc7da01b47cf4369b24d8f6",
 *      "note": "update"
 *      "image": "http://localhost:3001/tool/image-1584776076120.jpeg",
 *      "cooperativeId": "HTXNN",
 *      "_id": "5e75c38c40019a40362038ff"
 *  }
 *
 *
 * @apiError toolId-doesnt-exist Dụng cụ không tồn tại
 * @apiError borrowedDate-is-invalid Định dạng ngày mượn không hợp lệ
 * @apiError returnedDate-is-invalid Định dạng ngày trả không hợp lệ
 * @apiError returnedDate-is-less-than-borrowedDate Ngày trả không thể nhỏ hơn ngày đã mượn
 * @apiError borrowedQuantity-is-greater-than-available Số lượng mượn không thể lớn hơn số lượng hiện có
 * @apiError borrowedQuantity-must-be-positive-integer Số lượng mượn phải là số nguyên dương khác 0
 * @apiError user-doesnt-exist Người mượn không tồn tại
 * @apiErrorExample borrowedQuantity-must-be-positive-number:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Số lượng phải là số nguyên dương lớn hơn 0"
 *     }
 * @apiErrorExample returnedDate less than borrowedDate:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Ngày trả không thể nhỏ hơn ngày mượn."
 *     }
 *
 * @apiErrorExample user does not exist:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Người mượn không tồn tại"
 *     }
 *
 * @apiErrorExample borrowed quantity is greater than avaiable:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Số lượng mượn lớn hơn số lượng hiện tại"
 *     }
 *
 * @apiPermission none
 */
Router.route("/:id").patch(
  validateParamId,
  validateExist,
  validateBeforeUpdate,
  update
);

/**
 * @api {delete} /borrowedTools/:id Delete document borrowed tool
 * @apiName DeleteBorrowedTool
 * @apiGroup BorrowedTools
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/borrowedTools/5e09757502716412c0b026d7
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "successMessage": "Document được xóa thành công"
 *  }
 *
 * @apiError Tool-not-found Document không tồn tại
 * @apiError Invalid-id Id không hợp lệ
 * @apiErrorExample Invalid id:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "errorMessage": "Id không hợp lệ"
 *     }
 *
 * @apiErrorExample Document not found
 *     HTTP/1.1 404 Not Found
 *     {
 *       "errorMessage": "Document không tồn tại"
 *     }
 *
 * @apiPermission none
 */
Router.route("/:id").delete(validateParamId, validateExist, deleteOne);

/**
 * @api {post} /api/borrowedTools/:id/return Return borrowed tool
 * @apiName ReturnBorrowedTool
 * @apiGroup BorrowedTools
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/borrowedTools/5e7713bc31d4d0077efd283d/return
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {Date} returnedDate Ngày trả (chuẩn ISO 8601)
 *
 * @apiParamExample {json} Request-Example:
 *
 *  {
 *      "returnedDate": "2022-01-01"
 *  }
 *
 * @apiSuccess {ObjectId} toolId Id công cụ, dụng cụ cần mượn
 * @apiSuccess {Number} borrowedQuantity Số lượng mượn
 * @apiSuccess {Date} borrowedDate Ngày mượn (chuẩn ISO 8601)
 * @apiSuccess {Date} returnedDate Ngày trả (chuẩn ISO 8601)
 * @apiSuccess {ObjectId} userBorrowedId Id người mượn
 * @apiSuccess {String} cooperativeId cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {String} image Image file
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *
 *  {
 *      "toolId": "5e76f16b1dcd9d3dcb2dca0a",
 *      "borrowedQuantity": "99",
 *      "borrowedDate": "2020-09-09",
 *      "returnedDate": "2022-01-01",
 *      "userBorrowedId": "5dc7da01b47cf4369b24d8f6",
 *      "note": "something"
 *      "image": "http://localhost:3001/tool/image-1584776076120.jpeg",
 *      "cooperativeId": "HTXNN",
 *      "_id": "5e75c38c40019a40362038ff"
 *  }
 *
 * @apiError returnedDate-is-invalid Định dạng ngày trả không hợp lệ
 * @apiError returnedDate-is-less-than-borrowedDate Ngày trả không thể nhỏ hơn ngày đã mượn
 * @apiError tool-already-return Dụng cụ đã được trả
 *
 * @apiErrorExample returnedDate less than borrowedDate:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Ngày trả không thể nhỏ hơn ngày mượn."
 *     }
 *
 * @apiErrorExample tool already return:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Dụng cụ đã được trả. Sử dụng update nếu muốn cập nhật ngày trả"
 *     }
 *
 *
 * @apiPermission none
 */
Router.route("/:id/return").post(
  validateParamId,
  validateExist,
  validateBeforeReturn,
  returnTool
);

module.exports = Router;
