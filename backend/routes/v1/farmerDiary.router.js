const Router = require('express').Router();

const {
    getCollection,
    getFarmerDiaryByFarmerId,
    getById,
    dropCollection,
    createFarmerDiary,
} = require('../../controllers/farmerDiary.controller');

const { validateCreateInput } = require('../../validations/createFarmerDiary.validation');

/**
 * @api {get} /v1/api/farmer-diary/all Get all farmer diary
 * @apiName GetAllData
 * @apiGroup FarmerDiary
 *
 * @apiSuccess {String} message Response message
 * @apiSuccess {Object[]} data Tất cả nhật ký nông dân có trong csdl
 * @apiSuccess {String} data._id Id của tệp document
 * @apiSuccess {String} data.farmerId Id của nông dân
 * @apiSuccess {String} data.diaryId Id của nhật ký vụ mùa
 * @apiSuccess {Object[]} data.cropTasks Nhật ký chi tiết
 * @apiSuccess {String} data.cropTasks._id Id tác vụ
 * @apiSuccess {String[]} data.cropTasks.fieldsId Id thửa
 * @apiSuccess {Date} data.cropTasks.createdAt Thời gian nhật ký được tạo
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *{
 *     "message": "Lấy dữ liệu thành công",
*       "data": [
*       {
*           "_id": "5e9f161f89b73e2606858284",
*           "farmerId": "5e9ef810e815e302af413309",
*           "diaryId": "5dedc93ebad8e32650d38789",
*           "cropTasks": [
*               {
*                   "_id": "5e9f102431afb31fc880425a",
*                   "fieldsId": [
*                       "5dedc93ebad8e32650d38791"
*                   ],
*                   "createdAt": "2020-04-21T15:49:51.187Z"
*               }
*           ],
*           "createdAt": "2020-04-21T15:49:51.187Z",
*           "updatedAt": "2020-04-21T15:49:51.187Z"
*       },
*       {
*           "_id": "5e9f162989b73e2606858285",
*           "farmerId": "5e9ef810e815e302af413309",
*           "diaryId": "5dedc93ebad8e32650d38789",
*           "cropTasks": [
*               {
*                   "_id": "5e9f102431afb31fc880425a",
*                   "fieldsId": [
*                       "5dedc93ebad8e32650d38791"
*                   ],
*                   "createdAt": "2020-04-21T15:50:01.713Z"
*               }
*           ],
*           "createdAt": "2020-04-21T15:50:01.713Z",
*           "updatedAt": "2020-04-21T15:50:01.713Z"
*       }
*   ]
 *  }
 */
Router.route('/all').get(getCollection);

/**
 * @api {get} /v1/api/farmer-diary/farmer/:farmerId Get all diary of a farmer
 * @apiName GetDataByFarmerId
 * @apiGroup FarmerDiary
 * 
 * @apiParams (Path Param) {String} farmerId Id của farmer
 *
 * @apiSuccess {String} message Response message
 * @apiSuccess {Object[]} data Tất cả nhật ký nông dân có trong csdl
 * @apiSuccess {String} data._id Id của tệp document
 * @apiSuccess {String} data.farmerId Id của nông dân
 * @apiSuccess {String} data.diaryId Id của nhật ký vụ mùa
 * @apiSuccess {Object[]} data.cropTasks Nhật ký chi tiết
 * @apiSuccess {String} data.cropTasks._id Id tác vụ
 * @apiSuccess {String[]} data.cropTasks.fieldsId Id thửa
 * @apiSuccess {Date} data.cropTasks.createdAt Thời gian nhật ký được tạo
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *{
 *     "message": "Lấy dữ liệu thành công",
*       "data": [
*       {
*           "_id": "5e9f161f89b73e2606858284",
*           "farmerId": "5e9ef810e815e302af413309",
*           "diaryId": "5dedc93ebad8e32650d38789",
*           "cropTasks": [
*               {
*                   "_id": "5e9f102431afb31fc880425a",
*                   "fieldsId": [
*                       "5dedc93ebad8e32650d38791"
*                   ],
*                   "createdAt": "2020-04-21T15:49:51.187Z"
*               }
*           ],
*           "createdAt": "2020-04-21T15:49:51.187Z",
*           "updatedAt": "2020-04-21T15:49:51.187Z"
*       },
*       {
*           "_id": "5e9f162989b73e2606858285",
*           "farmerId": "5e9ef810e815e302af413309",
*           "diaryId": "5dedc93ebad8e32650d38789",
*           "cropTasks": [
*               {
*                   "_id": "5e9f102431afb31fc880425a",
*                   "fieldsId": [
*                       "5dedc93ebad8e32650d38791"
*                   ],
*                   "createdAt": "2020-04-21T15:50:01.713Z"
*               }
*           ],
*           "createdAt": "2020-04-21T15:50:01.713Z",
*           "updatedAt": "2020-04-21T15:50:01.713Z"
*       }
*   ]
 *  }
 */
Router.route('/farmer/:farmerId').get(getFarmerDiaryByFarmerId);

/**
 * @api {get} /v1/api/farmer-diary/doc/:id Get data by id
 * @apiName GetDataById
 * @apiGroup FarmerDiary
 * 
 * @apiParams (Path Param) {String} id Id của document
 *
 * @apiSuccess {String} message Response message
 * @apiSuccess {Object} data Dữ liệu trả về
 * @apiSuccess {String} data._id Id của tệp document
 * @apiSuccess {String} data.farmerId Id của nông dân
 * @apiSuccess {String} data.diaryId Id của nhật ký vụ mùa
 * @apiSuccess {Object[]} data.cropTasks Nhật ký chi tiết
 * @apiSuccess {String} data.cropTasks._id Id tác vụ
 * @apiSuccess {String[]} data.cropTasks.fieldsId Id thửa
 * @apiSuccess {Date} data.cropTasks.createdAt Thời gian nhật ký được tạo
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *{
 *     "message": "Lấy dữ liệu thành công",
*       "data": {
*           "_id": "5e9f161f89b73e2606858284",
*           "farmerId": "5e9ef810e815e302af413309",
*           "diaryId": "5dedc93ebad8e32650d38789",
*           "cropTasks": [
*               {
*                   "_id": "5e9f102431afb31fc880425a",
*                   "fieldsId": [
*                       "5dedc93ebad8e32650d38791"
*                   ],
*                   "createdAt": "2020-04-21T15:49:51.187Z"
*               }
*           ],
*           "createdAt": "2020-04-21T15:49:51.187Z",
*           "updatedAt": "2020-04-21T15:49:51.187Z"
*       },
 *  }
 */
Router.route('/doc/:id').get(getById);

/**
 * @api {delete} /v1/api/farmer-diary/all Drop FarmerDiary collection
 * @apiName DropCollection
 * @apiGroup FarmerDiary
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 204 No Content
 */
Router.route('/all').delete(dropCollection);

/**
 * @api {post} /v1/api/farmer-diary Create new farmer diary
 * @apiName CreateData
 * @apiGroup FarmerDiary
 * 
 * @apiParams (Request Body) {String} diaryId Id nhật ký mùa vụ
 * @apiParams (Request Body) {String} farmerId Id của nông dân
 * @apiParams (Request Body) {Object[]} cropTasks Các tác vụ được ghi nhận
 * @apiParams (Request Body) {String} cropTasks._id Id của tác vụ
 * @apiParams (Request Body) {String[]} cropTasks.fieldsId Id của các thửa ruộng
 * @apiParams (Request Body) {String} cropTasks.fieldsId._id Id thửa ruộng
 *
 * @apiSuccess (201 Created) {String} message Response message
 * @apiSuccess (201 Created) {Object} data Dữ liệu trả về
 * @apiSuccess (201 Created) {String} data._id Id của tệp document
 * @apiSuccess (201 Created) {String} data.farmerId Id của nông dân
 * @apiSuccess (201 Created) {String} data.diaryId Id của nhật ký vụ mùa
 * @apiSuccess (201 Created) {Object[]} data.cropTasks Nhật ký chi tiết
 * @apiSuccess (201 Created) {String} data.cropTasks._id Id tác vụ
 * @apiSuccess (201 Created) {String[]} data.cropTasks.fieldsId Id thửa
 * @apiSuccess (201 Created) {Date} data.cropTasks.createdAt Thời gian nhật ký được tạo
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *{
 *     "message": "Ghi nhật ký thành công",
*       "data": {
*           "_id": "5e9f161f89b73e2606858284",
*           "farmerId": "5e9ef810e815e302af413309",
*           "diaryId": "5dedc93ebad8e32650d38789",
*           "cropTasks": [
*               {
*                   "_id": "5e9f102431afb31fc880425a",
*                   "fieldsId": [
*                       "5dedc93ebad8e32650d38791"
*                   ],
*                   "createdAt": "2020-04-21T15:49:51.187Z"
*               }
*           ],
*           "createdAt": "2020-04-21T15:49:51.187Z",
*           "updatedAt": "2020-04-21T15:49:51.187Z"
*       },
 *  }
 */
Router.route('/').post(validateCreateInput, createFarmerDiary);

module.exports = Router;