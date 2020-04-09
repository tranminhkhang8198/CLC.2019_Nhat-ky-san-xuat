const Router = require('express').Router();

const {
    createNewRiceSeed,
    findAll,
    findById,
    updateByCode,
    deleteById,
    dropCollection,
} = require('../../controllers/riceSeed.controller');

const {
    validateRiceInput,
} = require('../../validations/rice.validation');


/**
* @api {post} /v1/api/rice Create data
* @apiVersion 1.0.0
* 
* @apiName Create
* @apiGroup Rice
* 
* @apiParam (Request Body) {String} code Mã giống lúa
* @apiParam (Request Body) {String} name Tên giống lúa
* 
* @apiSuccessExample {json} Success-Response
*      HTTP/1.1 200 OK
*   {
*       "message": "Thành công tạo mới giống lúa",
*       "code": 200,
*       "riceseed": {
*           "_id": "5e8ea84a0cda071a10ba949f",
*           "name": "lua 2",
*           "code": "6"
*      }
*   }
* @apiError (409 Conflict) DuplicatedNameOrCode Giá trị <code>name</code> hoặc <code>code</code> đã tồn tại
* @apiErrorExample 409-DuplicatedNameOrCode:
* HTTP/1.1 409 Conflict
*     {
*       message: 'Tên giống lúa đã tồn tại',
*       code: 409,
*     }
*/
Router.route('').post(validateRiceInput, createNewRiceSeed);


/**
* @api {get} /v1/api/rice/:id Get data by id
* @apiVersion 1.0.0
* 
* @apiName GetById
* @apiGroup Rice
* 
* @apiParam (Request Path) {String} code Mã giống lúa
* 
* @apiSuccessExample {json} Success-Response
*      HTTP/1.1 200 OK
*   {
*       "message": "OK",
*       "code": 200,
*       "pageNumber": 1,
*       "pageSize": 3,
*       "totalRiceseed": 3,
*       "totalPage": 1,
*       "riceseed": [
*           {
*               "_id": "5e8ea84a0cda071a10ba949f",
*               "name": "lua 2",
*               "code": "6"
*           },
*           {
*               "_id": "5e8ea8440cda071a10ba949e",
*               "name": "lua 3",
*               "code": "5"
*           },
*       ]
*   }
*/
Router.route('/all').get(findAll);

/**
* @api {get} /v1/api/rice/:id Get data by id
* @apiVersion 1.0.0
* 
* @apiName GetById
* @apiGroup Rice
* 
* @apiParam (Request Path) {String} code Mã giống lúa
* 
* @apiSuccessExample {json} Success-Response
*      HTTP/1.1 200 OK
*   {
*       "message": "OK",
*       "code": 200,
*       "riceseed": {
*           "_id": "5e8ea84a0cda071a10ba949f",
*           "name": "lua 2",
*           "code": "6"
*      }
*   }
* @apiError (404 Not Found) NoDataFound Không tìm thấy dữ liêu jtương ứng với <code>id</code>
* @apiErrorExample 404-Response:
* HTTP/1.1 404 Not Found
*     {
*       message: 'Không tìm thấy giống lúa trong cơ sở dữ liệu',
*       code: 404,
*     }
*/
Router.route('/:id').get(findById);

/**
 * @api {put} /v1/api/rice/:code Replace or create rice seed
 * @apiVersion 1.0.0
 * 
 * @apiName ReplaceDataByCode
 * @apiGroup Rice
 * 
 * @apiParam (Request Path) {String} code Mã giống lúa
 * @apiParam (Request Body) {String} name Tên mới của giống lúa ứng với mã code
 * 
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 200 OK
 *   {
*       "message": "Cập nhật thông tin giống lúa thành công",
*       "code": 200,
*       "riceseed": {
*           "_id": "5e8ea84a0cda071a10ba949f",
*           "name": "lua 2",
*           "code": "6"
*      }
*   }
* @apiError (404 Not Found) NoCodeMatch Không tìm thấy dữ liêu jtương ứng với <code>code</code>
* @apiErrorExample 404-Response:
* HTTP/1.1 404 Not Found
*     {
*       message: 'Không tìm thấy giống lúa trong cơ sở dữ liệu',
*       code: 404,
*     }
*
* @apiError (409 Conflict) DuplicatedName Giá trị <code>name</code> đã tồn tại
* @apiErrorExample 409-Response:
* HTTP/1.1 409 Conflict
*     {
*       message: 'Tên giống lúa đã tồn tại',
*       code: 409,
*     }
*/
Router.route('/:code').put(updateByCode);


Router.route('/all').delete(dropCollection);

/**
* @api {delete} /v1/api/rice/:id Delete by Id
* @apiVersion 1.0.0
* 
* @apiName DeleteById
* @apiGroup Rice
* 
* @apiParam (Request Path) {String} id Id dữ liệu trong cơ sở dữ liệu.
* 
* @apiSuccessExample {json} Success-Response
*      HTTP/1.1 204 No content
*/
Router.route('/:id').delete(deleteById);

module.exports = Router;