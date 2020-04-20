const Router = require("express").Router();

const {
  create,
  getAll,
  getOne,
  update,
  deleteOne,
} = require("../../controllers/event.controller");
const {
  validateParamId,
  postValidator,
  patchValidator,
} = require("../../validations/event.validation");

/**
 * @api {post} /api/events Create new event
 * @apiName CreateNewEvent
 * @apiGroup Events
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/events
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {String} name Tên sự kiện
 * @apiParam {Array} participants Danh sách tham gia (mảng object id của user trong htx ["5e75c38c40019a40362038ff", "5e75c38c40019a40362038ff"])
 * @apiParam {Object} instructionInfo Thông tin người tập huấn
 * @apiParam {String} instructionInfo.name Tên người tập huấn
 * @apiParam {String} instructionInfo.position Chức danh
 * @apiParam {String} instructionInfo.workUnit Đơn vị công tác
 * @apiParam {Date} trainedDate Ngày tập huấn (ISO 8601 format)
 * @apiParam {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiParam {File} coverImage Image file
 * @apiParam {File} trainedContent Nội dung tập huấn (pdf, work, excel)
 * @apiParam {String} note Ghi chú
 *
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *     "name": "Sự kiện AAA",
 *     "participants": [
 *         "5dc7c9fbeae2ba2a92117f4c",
 *         "5dc7c9fbeae2ba2a92117f4c"
 *     ],
 *     "instructorInfo": {
 *          "name": "Nguyễn Văn A",
 *          "position": "Giám đốc",
 *          "workUnit": "CTU"
 *     },
 *     "trainedDate": 2020-01-01,
 *     "note": null,
 *     "coverImage": image file,
 *     "cooperativeId": "HTXUMH3",
 *     "trainedContent": content file,
 *  }
 *
 * @apiSuccess {String} name Tên sự kiện
 * @apiSuccess {Array} participants Danh sách tham gia (mảng object id của user trong htx ["5e75c38c40019a40362038ff", "5e75c38c40019a40362038ff"])
 * @apiSuccess {Object} instructionInfo Thông tin người tập huấn
 * @apiSuccess {String} instructionInfo.name Tên người tập huấn
 * @apiSuccess {String} instructionInfo.position Chức danh
 * @apiSuccess {String} instructionInfo.workUnit Đơn vị công tác
 * @apiSuccess {Date} trainedDate Ngày tập huấn (ISO 8601 format)
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {File} coverImage Image file
 * @apiSuccess {File} trainedContent Nội dung tập huấn (pdf, work, excel)
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *{
 *     "name": "Sự kiện AAA",
 *     "participants": [
 *         "5dc7c9fbeae2ba2a92117f4c",
 *         "5dc7c9fbeae2ba2a92117f4c"
 *     ],
 *     "instructorInfo": {
 *          "name": "Nguyễn Văn A",
 *          "position": "Giám đốc",
 *          "workUnit": "CTU"
 *     },
 *     "trainedDate": 2020-01-01,
 *     "note": null,
 *     "coverImage": "http://localhost:3001/event/image-1587130134649.png",
 *     "cooperativeId": "HTXUMH3",
 *     "trainedContent": "http://localhost:3001/event/content-1587130134650.docx",
 *     "_id": "5e99af16f035c60e97293e6f"
 *  }
 *
 * @apiError name-is-required Trường tên sự kiện là bắt buộc
 * @apiError cooperativeId-is-required Tổng Id hợp tác xã là bắt buộc
 * @apiError cooperative-doesnt-exist Hợp tác xã không tồn tại
 * @apiError invalid-coverImage-type Định dạng ảnh không hợp lệ
 * @apiError participant-does-not-exist Người tham gia không tồn tại
 *
 * @apiErrorExample cooperative does not exist:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Hợp tác xã không tồn tại"
 *     }
 *
 * @apiPermission none
 */
Router.route("/").post(postValidator, create);

/**
 * @api {get} /api/events Get all events
 * @apiName GetAllEvents
 * @apiGroup Events
 * @apiExample {curl} Get all events with paginating:
 *     curl -i http://localhost:3001/api/events?pageNumber=1&nPerPage=20
 *
 * @apiExample {curl} Get All events with paginating and specific fields:
 *     curl -i http://localhost:3001/api/events?pageNumber=1&nPerPage=20&cooperativeId=HTXUMH3
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
 * @apiParam {Number} nPerPage Số lượng sản phẩm trên mỗi trang
 *
 * @apiSuccess {String} name Tên sự kiện
 * @apiSuccess {Array} participants Danh sách tham gia (mảng object id của user trong htx ["5e75c38c40019a40362038ff", "5e75c38c40019a40362038ff"])
 * @apiSuccess {Object} instructionInfo Thông tin người tập huấn
 * @apiSuccess {String} instructionInfo.name Tên người tập huấn
 * @apiSuccess {String} instructionInfo.position Chức danh
 * @apiSuccess {String} instructionInfo.workUnit Đơn vị công tác
 * @apiSuccess {Date} trainedDate Ngày tập huấn (ISO 8601 format)
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {File} coverImage Image file
 * @apiSuccess {File} trainedContent Nội dung tập huấn (pdf, work, excel)
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công*
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 Ok
 *
 *  {
 *       "totalEvents": 2,
 *       "totalPages": 1,
 *       "data": [
 *            {
 *               "name": "Sự kiện AAA",
 *               "participants": [
 *                   "Nguyen Van Loi",
 *                   "Huynh Quoc Tuan"
 *               ],
 *               "instructorInfo": {
 *                    "name": "Nguyễn Văn A",
 *                    "position": "Giám đốc",
 *                    "workUnit": "CTU"
 *               },
 *               "trainedDate": 2020-01-01,
 *               "note": null,
 *               "coverImage": "http://localhost:3001/event/image-1587130134649.png",
 *               "cooperativeId": "HTXUMH3",
 *               "trainedContent": "http://localhost:3001/event/content-1587130134650.docx",
 *               "_id": "5e99af16f035c60e97293e6f"
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
 * @api {get} /api/events/:id Get event
 * @apiName GetEvent
 * @apiGroup Events
 * @apiExample {curl} Get borrowed tool:
 *     curl -i http://localhost:3001/api/events/5e7713bc31d4d0077efd283d
 * @apiHeader {String} authorization Token.
 *
 * @apiSuccess {String} name Tên sự kiện
 * @apiSuccess {Array} participants Danh sách tham gia (mảng object id của user trong htx ["5e75c38c40019a40362038ff", "5e75c38c40019a40362038ff"])
 * @apiSuccess {Object} instructionInfo Thông tin người tập huấn
 * @apiSuccess {String} instructionInfo.name Tên người tập huấn
 * @apiSuccess {String} instructionInfo.position Chức danh
 * @apiSuccess {String} instructionInfo.workUnit Đơn vị công tác
 * @apiSuccess {Date} trainedDate Ngày tập huấn (ISO 8601 format)
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {File} coverImage Image file
 * @apiSuccess {File} trainedContent Nội dung tập huấn (pdf, work, excel)
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công*
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 Ok
 *
 *  {
 *            {
 *               "name": "Sự kiện AAA",
 *               "participants": [
 *                   "Nguyen Van Loi",
 *                   "Huynh Quoc Tuan"
 *               ],
 *               "instructorInfo": {
 *                    "name": "Nguyễn Văn A",
 *                    "position": "Giám đốc",
 *                    "workUnit": "CTU"
 *               },
 *               "trainedDate": 2020-01-01,
 *               "note": null,
 *               "coverImage": "http://localhost:3001/event/image-1587130134649.png",
 *               "cooperativeId": "HTXUMH3",
 *               "trainedContent": "http://localhost:3001/event/content-1587130134650.docx",
 *               "_id": "5e99af16f035c60e97293e6f"
 *            }
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
 * @api {patch} /api/events Update Event
 * @apiName UpdateEvent
 * @apiGroup Events
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/events/5dc7c9fbeae2ba2a92117f4c
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {String} name Tên sự kiện
 * @apiParam {Array} participants Danh sách tham gia (mảng object id của user trong htx ["5e75c38c40019a40362038ff", "5e75c38c40019a40362038ff"])
 * @apiParam {Object} instructionInfo Thông tin người tập huấn
 * @apiParam {String} instructionInfo.name Tên người tập huấn
 * @apiParam {String} instructionInfo.position Chức danh
 * @apiParam {String} instructionInfo.workUnit Đơn vị công tác
 * @apiParam {Date} trainedDate Ngày tập huấn (ISO 8601 format)
 * @apiParam {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiParam {File} coverImage Image file
 * @apiParam {File} trainedContent Nội dung tập huấn (pdf, work, excel)
 * @apiParam {String} note Ghi chú
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *     "name": "Updated",
 *     "participants": [
 *         "5dc7c9fbeae2ba2a92117f4c"
 *     ],
 *     "instructorInfo": {
 *          "name": "Update",
 *          "position": "Update",
 *          "workUnit": "Update"
 *     },
 *     "trainedDate": 2020-01-01,
 *     "note": null,
 *     "coverImage": image file,
 *     "cooperativeId": "HTXUMH3",
 *     "trainedContent": content file,
 *  }
 *
 * @apiSuccess {String} name Tên sự kiện
 * @apiSuccess {Array} participants Danh sách tham gia (mảng object id của user trong htx ["5e75c38c40019a40362038ff", "5e75c38c40019a40362038ff"])
 * @apiSuccess {Object} instructionInfo Thông tin người tập huấn
 * @apiSuccess {String} instructionInfo.name Tên người tập huấn
 * @apiSuccess {String} instructionInfo.position Chức danh
 * @apiSuccess {String} instructionInfo.workUnit Đơn vị công tác
 * @apiSuccess {Date} trainedDate Ngày tập huấn (ISO 8601 format)
 * @apiSuccess {String} cooperativeId Id hợp tác xã (trường cooperativeID trong document chứ kp _id)
 * @apiSuccess {File} coverImage Image file
 * @apiSuccess {File} trainedContent Nội dung tập huấn (pdf, work, excel)
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *{
 *     "name": "Update",
 *     "participants": [
 *         "5dc7c9fbeae2ba2a92117f4c"
 *     ],
 *     "instructorInfo": {
 *          "name": "Update",
 *          "position": "Update",
 *          "workUnit": "Update"
 *     },
 *     "trainedDate": 2020-01-01,
 *     "note": null,
 *     "coverImage": "http://localhost:3001/event/image-1587130134649.png",
 *     "cooperativeId": "HTXUMH3",
 *     "trainedContent": "http://localhost:3001/event/content-1587130134650.docx",
 *     "_id": "5e99af16f035c60e97293e6f"
 *  }
 *
 * @apiError name-is-required Trường tên sự kiện là bắt buộc
 * @apiError cooperativeId-is-required Tổng Id hợp tác xã là bắt buộc
 * @apiError cooperative-doesnt-exist Hợp tác xã không tồn tại
 * @apiError invalid-coverImage-type Định dạng ảnh không hợp lệ
 * @apiError participant-does-not-exist Người tham gia không tồn tại
 *
 * @apiErrorExample cooperative does not exist:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Hợp tác xã không tồn tại"
 *     }
 *
 * @apiPermission none
 */
Router.route("/:id").patch(validateParamId, patchValidator, update);

/**
 * @api {delete} /api/events/:id Delete document event
 * @apiName DeleteEvent
 * @apiGroup Events
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/events/5e09757502716412c0b026d7
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
 * @apiError event-not-found Document không tồn tại
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
Router.route("/:id").delete(validateParamId, deleteOne);

module.exports = Router;
