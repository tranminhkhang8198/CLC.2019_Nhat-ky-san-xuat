const Router = require('express').Router();

const {
    updateEmployeeByID,
    removeEmpFromCoop,
    searchEmployee,
} = require('../../controllers/employee.controller');
const {
    validateBeforeUpdate,
} = require('../../validations/employee.validation')
const {
    ensureManager,

} = require('../../controllers/auth.controller');



/**
 * @api {get} /v1/api/cooperatives/:coopID/employee/search Search employee by name
 * @apiVersion 1.0.0
 * @apiSampleRequest http://localhost:3001/v1/api/cooperatives/5df316d55818ad286c993446/employee/search
 * 
 * @apiName searchEmployee
 * @apiGroup Employee
 * 
 * @apiParam {String} name Keyword
 * @apiParam {Number} pageSize Pagination page size
 * @apiParam {Number} pageNumber Pagination page number
 * 
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 200 OK
 *      {
 *          "code": 200,
 *          "message": "Search employe by name successfully",
 *          "pagination": {
 *              "pageSize": 1,
 *              "pageNumber": 1
 *          },
 *          "result": {
 *              "total": 2,
 *              "records": [
 *                  {
 *                      "_id": "5e84b5fbfb664211daab0a61",
 *                      "name": "Huynh Quoc Tuan",
 *                      "avatar": "http://localhost:3003/default.png",
 *                      "personalId": "384736273",
 *                      "address": "Ninh Kieu, Can Tho",
 *                      "phone": "093827463",
 *                      "email": "admin@gmail.com",
 *                      "user": "user",
 *                      "HTXId": null,
 *                      "created": "2020-04-01T15:40:43.584Z"
 *                  }
 *              ]
 *          }
 *      }
 */
Router.route('/:coopID/employee/search').get(
    // ensureManager,
    searchEmployee,
)

/**
 * @api {patch} /v1/api/cooperatives/:coopID/employee/:empID Update employee information
 * @apiVersion 1.0.0
 * @apiSampleRequest http://localhost:3001/v1/api/cooperatives/5df316d55818ad286c993446/employee/5e89c41d36b4634f8171ad5a
 * 
 * @apiName PatchEmployee
 * @apiGroup Employee
 * @apiHeader {String} authorization Token
 * @apiParam {String} [name] Employee name
 * @apiParam {File} [avatar] Employee avatar
 * @apiParam {String} [personalID] Employee personal ID
 * @apiParam {String} [address] Employee address
 * @apiParam {String} [phone] Employee phone
 * @apiParam {String} [email] Employee email
 * @apiParam {String="user","manager"} [jobTitle] Employee jobs
 * @apiParam {String} HTXId Employee's cooperactions ID
 * 
 * @apiSuccess {Code} code Response code
 * @apiSuccess {String} message response massage
 * @apiSuccess {Object} result Response object
 * @apiSuccess {String} result.name Employee name
 * @apiSuccess {File} result.avatar Employee avatar
 * @apiSuccess {String} result.personalID Employee personal ID
 * @apiSuccess {String} result.address Employee address
 * @apiSuccess {String} result.phone Employee phone
 * @apiSuccess {String} result.email Employee email
 * @apiSuccess {String="user","manager"} result.jobTitle Employee jobs
 * @apiSuccess {String} result.HTXId Employee's cooperactions ID
 * 
 * @apiSuccessExample {json} Success-Response 
 *      HTTP/1.1 200 OK
 *      {
 *          "code": 200,
 *          "message": "Updating employee information successfully",
 *          "result": {
 *              "_id": "5e89c41d36b4634f8171ad5a",
 *              "name": "Trinh Quoc Tuan",
 *              "avatar": "http://localhost:3001/avatar/default.png",
 *              "personalId": "381823821",
 *              "address": "Can THO",
 *              "phone": "0836810225",
 *              "email": "vanloiidk@gmail.com",
 *              "user": "user",
 *              "HTXId": "df12ew",
 *              "created": "2020-04-05T11:42:21.868Z"
 *          }
 *      }
 * @apiError (404 Not Found) EmployeeIsNotFound Employee is not found
 * 
 */
Router.route('/:coopID/employee/:empID').patch(
    validateBeforeUpdate,
    updateEmployeeByID,
);

/**
 * @api {delete} /v1/api/cooperatives/:coopID/employee/:empID remove employee from cooperatives
 * @apiVersion 1.0.0
 * @apiSampleRequest http://localhost:3001/v1/api/cooperatives/5df316d55818ad286c993446/employee/5e89c41d36b4634f8171ad5a
 * 
 * @apiName removeEmpFromCoop
 * @apiGroup Employee
 * @apiHeader authorization Access token
 * 
 * @apiSuccess {Code} code Response code
 * @apiSuccess {String} message Response message
 * @apiSuccess {Object} result Response object
 * @apiSuccess {String} result._id Employee id
 * @apiSuccess {String} result.name Employee name
 * @apiSuccess {String} result.avatar Employee avatar
 * @apiSuccess {String} result.personalId Employee personal ID
 * @apiSuccess {String} result.address Employee address
 * @apiSuccess {String} result.phone Employee phone number
 * @apiSuccess {String} result.email Employee email
 * @apiSuccess {String} result.user Employee role
 * @apisuccess {String} result.HTXId Cooperatives ID
 * @apiSuccess {Date} result.createdDate Created Date
 * 
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 200 OK
 *      {
 *          "code": 200,
 *          "message": "Remove employee from cooperative successfully",
 *          "result": {
 *              "_id": "5e84b5fbfb664211daab0a61",
 *              "name": "Huynh Quoc Tuan",
 *              "avatar": "http://localhost:3003/default.png",
 *              "personalId": "384736273",
 *              "address": "Ninh Kieu, Can Tho",
 *              "phone": "093827463",
 *              "email": "admin@gmail.com",
 *              "user": "user",
 *              "HTXId": null,
 *              "created": "2020-04-01T15:40:43.584Z"
 *          }
 *      }
 */
Router.route('/:coopID/employee/:empID').delete(
    ensureManager,
    removeEmpFromCoop,
);


module.exports = Router;