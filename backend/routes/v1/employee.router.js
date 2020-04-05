const Router = require('express').Router();

const {
    updateEmployeeByID,
} = require('../../controllers/employee.controller');
const {
    validateBeforeUpdate,
} = require('../../validations/employee.validation')

/**
 * @api {patch} /v1/api/employee/:empID Update employee information
 * @apiVersion 1.0.0
 * @apiSampleRequest http://localhost:3001/v1/api/employee/5e89c41d36b4634f8171ad5a
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
Router.route('/:empID').patch(
    validateBeforeUpdate,
    updateEmployeeByID,
);

module.exports = Router;