const Router = require("express").Router();

const {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
  createSampleTemplate,
} = require("../../controllers/cropTask.conttroller");
const {
  postValidator,
  patchValidator,
  createSampleTemplateValidator,
  validateParamId,
} = require("../../validations/cropTask.validation");

/**
 * @api {post} /api/crop-tasks Create new task for crop
 * @apiName CreateNewCropTask
 * @apiGroup CropTasks
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/crop-tasks
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {String} name Tên công việc, tác vụ
 * @apiParam {Date} startDate Ngày bắt đầu công việc (ISO 8601 format)
 * @apiParam {Date} endDate Ngày kết thúc công việc (ISO 8601 format)
 * @apiParam {ObjectId} diaryId Id nhật ký chung của mùa vụ
 * @apiParam {String} type Loại công việc (một trong bốn loại "Bón Phân", "Phun Thuốc", "Nước", "CV khác")
 * @apiParam {String} stage Giai đoạn phát triển
 * @apiParam {String} note Ghi chú
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "startDate": "2/6/2020",
 *       "endDate": "5/6/2020",
 *       "name": "Bón phân thúc đợt 2",
 *       "type": "Bón phân",
 *       "stage": "Giai đoạn tăng trưởng",
 *       "diaryId": "5dedd6f7a4b891348bc0a83d"
 *       "note": ""
 *     }
 *
 *
 * @apiSuccess {String} name Tên công việc, tác vụ
 * @apiSuccess {Date} startDate Ngày bắt đầu công việc (ISO 8601 format)
 * @apiSuccess {Date} endDate Ngày kết thúc công việc (ISO 8601 format)
 * @apiSuccess {ObjectId} diaryId Id nhật ký chung của mùa vụ
 * @apiSuccess {String} type Loại công việc (một trong bốn loại "Bón Phân", "Phun Thuốc", "Nước", "CV khác")
 * @apiSuccess {String} stage Giai đoạn phát triển
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *     {
 *       "startDate": "2/6/2020",
 *       "endDate": "5/6/2020",
 *       "name": "Bón phân thúc đợt 2",
 *       "type": "Bón phân",
 *       "stage": "Giai đoạn tăng trưởng",
 *       "diaryId": "5dedd6f7a4b891348bc0a83d"
 *       "note": "",
 *       "cooperativeId": "HTXUMH3",
 *       "_id": "5dedd6f7a4b891348bc0a83d"
 *     }
 *
 * @apiError name-is-required Trường tên công việc, tác vụ là bắt buộc
 * @apiError diaryId-is-required Id nhật ký chung của mùa vụ là bắt buộc
 * @apiError diaryId-doesnt-exist Id nhật ký chung của mùa vụ không tồn tại
 * @apiError type-is-invalid Loại công việc phải là một trong 4 loại "Bón Phân", "Phun Thuốc", "Nước", "CV khác"
 * @apiError startDate-must-be-ISO-8601-format Ngày bắt đầu công việc phải thuộc định dạng ISO 8601
 * @apiError endDate-must-be-ISO-8601-format Ngày kết thúc công việc phải thuộc định dạng ISO 8601
 *
 * @apiErrorExample cooperative does not exist:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Loại công việc phải là một trong bốn loại "Bón Phân", "Phun Thuốc", "Nước", "CV khác".; Ngày kết thúc công việc không hợp lệ."
 *     }
 *
 * @apiPermission none
 */
Router.route("/").post(postValidator, create);

/**
 * @api {get} /api/crop-tasks Get all task of crop
 * @apiName GetAllCropTasks
 * @apiGroup CropTasks
 * @apiExample {curl} Get all task of crop with paginating:
 *     curl -i http://localhost:3001/api/crop-tasks?cooperativeId=HTXNN&pageNumber=1&nPerPage=20
 *
 * @apiExample {curl} Get all task of crop with paginating and specific diary:
 *     curl -i http://localhost:3001/api/crop-tasks?cooperativeId=HTXNN&diaryId=5e75c38c40019a40362038ff&pageNumber=1&nPerPage=20
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {Number} pageNumber Số thứ tự trang cần lấy
 * @apiParam {Number} nPerPage Số lượng sản phẩm trên mỗi trang
 *
 *
 * @apiSuccess {String} name Tên công việc, tác vụ
 * @apiSuccess {Date} startDate Ngày bắt đầu công việc (ISO 8601 format)
 * @apiSuccess {Date} endDate Ngày kết thúc công việc (ISO 8601 format)
 * @apiSuccess {ObjectId} diaryId Id nhật ký chung của mùa vụ
 * @apiSuccess {String} type Loại công việc (một trong bốn loại "Bón Phân", "Phun Thuốc", "Nước", "CV khác")
 * @apiSuccess {String} stage Giai đoạn phát triển
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 Ok
 *
 *  {
 *       "totalCropTasks": 24,
 *       "totalPages": 1,
 *       "data": [
 *            {
 *               "startDate": "2/6/2020",
 *               "endDate": "5/6/2020",
 *               "name": "Bón phân thúc đợt 2",
 *               "type": "Bón phân",
 *               "stage": "Giai đoạn tăng trưởng",
 *               "diaryId": "5dedd6f7a4b891348bc0a83d"
 *               "note": "",
 *               "cooperativeId": "HTXUMH3",
 *               "_id": "5dedd6f7a4b891348bc0a83d"
 *            },
 *            {
 *               "startDate": "25/6/2020",
 *               "endDate": "25/6/2020",
 *               "name": "Khi lúa đứng cái",
 *               "type": "CV khác",
 *               "stage": "Giai đoạn tăng trưởng",
 *               "note": ""
 *               "cooperativeId": "HTXUMH3",
 *               "_id": "5dedd6f7a4b891348bc0a83d"
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
 * @api {get} /api/crop-tasks/:id Get task of crop
 * @apiName GetCropTask
 * @apiGroup CropTasks
 * @apiExample {curl} Get crop task:
 *     curl -i http://localhost:3001/api/crop-tasks/5e7713bc31d4d0077efd283d
 * @apiHeader {String} authorization Token.
 *
 * @apiSuccess {String} name Tên công việc, tác vụ
 * @apiSuccess {Date} startDate Ngày bắt đầu công việc (ISO 8601 format)
 * @apiSuccess {Date} endDate Ngày kết thúc công việc (ISO 8601 format)
 * @apiSuccess {ObjectId} diaryId Id nhật ký chung của mùa vụ
 * @apiSuccess {String} type Loại công việc (một trong bốn loại "Bón Phân", "Phun Thuốc", "Nước", "CV khác")
 * @apiSuccess {String} stage Giai đoạn phát triển
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *     {
 *       "startDate": "2/6/2020",
 *       "endDate": "5/6/2020",
 *       "name": "Bón phân thúc đợt 2",
 *       "type": "Bón phân",
 *       "stage": "Giai đoạn tăng trưởng",
 *       "diaryId": "5dedd6f7a4b891348bc0a83d"
 *       "note": "",
 *       "cooperativeId": "HTXUMH3",
 *       "_id": "5dedd6f7a4b891348bc0a83d"
 *     }
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
 * @api {delete} /api/crop-tasks/:id Delete task of crop
 * @apiName DeleteCropTask
 * @apiGroup CropTasks
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/crop-tasks/5e09757502716412c0b026d7
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

/**
 * @api {patch} /api/crop-tasks Update task of crop
 * @apiName UpdateCropTask
 * @apiGroup CropTasks
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/crop-tasks/5dedd6f7a4b891348bc0a83d
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {String} name Tên công việc, tác vụ
 * @apiParam {Date} startDate Ngày bắt đầu công việc (ISO 8601 format)
 * @apiParam {Date} endDate Ngày kết thúc công việc (ISO 8601 format)
 * @apiParam {ObjectId} diaryId Id nhật ký chung của mùa vụ
 * @apiParam {String} type Loại công việc (một trong bốn loại "Bón Phân", "Phun Thuốc", "Nước", "CV khác")
 * @apiParam {String} stage Giai đoạn phát triển
 * @apiParam {String} note Ghi chú
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "startDate": "01/01/2020",
 *       "endDate": "12/12/2020",
 *       "name": "Updated",
 *       "type": "Bón phân",
 *       "stage": "Updated",
 *       "diaryId": "5dedd6f7a4b891348bc0a83d"
 *       "note": ""
 *     }
 *
 *
 * @apiSuccess {String} name Tên công việc, tác vụ
 * @apiSuccess {Date} startDate Ngày bắt đầu công việc (ISO 8601 format)
 * @apiSuccess {Date} endDate Ngày kết thúc công việc (ISO 8601 format)
 * @apiSuccess {ObjectId} diaryId Id nhật ký chung của mùa vụ
 * @apiSuccess {String} type Loại công việc (một trong bốn loại "Bón Phân", "Phun Thuốc", "Nước", "CV khác")
 * @apiSuccess {String} stage Giai đoạn phát triển
 * @apiSuccess {String} note Ghi chú
 * @apiSuccess {String} _id Id của document vừa tạo thành công
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *     {
 *       "startDate": "01/01/2020",
 *       "endDate": "12/12/2020",
 *       "name": "Updated",
 *       "type": "Bón phân",
 *       "stage": "Updated",
 *       "diaryId": "5dedd6f7a4b891348bc0a83d"
 *       "note": "",
 *       "cooperativeId": "HTXUMH3",
 *       "_id": "5dedd6f7a4b891348bc0a83d"
 *     }
 *
 * @apiError name-is-required Trường tên công việc, tác vụ là bắt buộc
 * @apiError diaryId-is-required Id nhật ký chung của mùa vụ là bắt buộc
 * @apiError diaryId-doesnt-exist Id nhật ký chung của mùa vụ không tồn tại
 * @apiError type-is-invalid Loại công việc phải là một trong 4 loại "Bón Phân", "Phun Thuốc", "Nước", "CV khác"
 * @apiError startDate-must-be-ISO-8601-format Ngày bắt đầu công việc phải thuộc định dạng ISO 8601
 * @apiError endDate-must-be-ISO-8601-format Ngày kết thúc công việc phải thuộc định dạng ISO 8601
 *
 * @apiErrorExample cooperative does not exist:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Loại công việc phải là một trong bốn loại "Bón Phân", "Phun Thuốc", "Nước", "CV khác".; Ngày kết thúc công việc không hợp lệ."
 *     }
 *
 * @apiPermission none
 */
Router.route("/:id").patch(patchValidator, update);

/**
 * @api {post} /api/create-sample-template Create sample task template for crop
 * @apiName CreateSampleTemplate
 * @apiGroup CropTasks
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3001/api/create-sample-template
 *
 * @apiHeader {String} authorization Token.
 *
 * @apiParam {ObjectId} diaryId Id nhật ký chung của vụ mùa
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "diaryId": "5dedd6f7a4b891348bc0a83d"
 *     }
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Create
 *     {
 *       "successMessage": "Qui trình cho vụ mùa được tạo thành công."
 *     }
 *
 * @apiError diaryId-is-required Id nhật ký chung của mùa vụ là bắt buộc
 * @apiError diaryId-doesnt-exist Id nhật ký chung của mùa vụ không tồn tại
 *
 * @apiErrorExample cooperative does not exist:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "errorMessage": "Id nhật ký chung của mùa vụ không tồn tại."
 *     }
 *
 * @apiPermission none
 */
Router.route("/create-sample-template").post(
  createSampleTemplateValidator,
  createSampleTemplate
);

module.exports = Router;
