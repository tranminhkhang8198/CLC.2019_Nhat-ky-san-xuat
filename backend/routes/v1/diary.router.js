const Router = require('express').Router();

const {
    createNewDiary,
    getDiaryByID,
} = require('../../controllers/diary.controller');
const {
} = require('../../validations/diary.validation')
const {
    ensureManager,
    ensureAdmin,

} = require('../../controllers/auth.controller');

/**
 * @api {post} /v1/api/diary/ Create new diary
 * @apiVersion 1.0.0
 * @apiSampleRequest http://localhost:3001/v1/api/diary
 * 
 * @apiName postNewDiary
 * @apiGroup Diary
 * @apiHeader authorization
 * 
 * @apiParam {String} plantID Plant unique ID
 * @apiParam {String[]} fields List of fields
 * @apiParam {String} HTX_id Cooperatives ID
 * @apiParam {Date} begin Farming begin date
 * @apiParam {Date} end Farming end date
 * @apiParam {String} name Diary name
 * @apiParam {String} description Diary description
 * @apiParamExample {json} Request-Example
 *      HTTP/1.1
 *          {
 *              "plantID": "5dedc93ebad8e32650d38789",
 *              "fields": [
 *                  "5dedc932bad8e32650d38788",
 *                  "5dedc93ebad8e32650d38789"
 *              ],
 *              "HTX_id": "5dedc93ebad8e32650d38789",
 *              "begin": "1970-01-01T08:32:50+08:00",
 *              "end": "1970-01-01T08:32:50+08:00",
 *              "status": "active",
 *              "name": "Vu he thu",
 *              "description": "",
 *          }
 * @apiSuccess {Code} code Response code
 * @apiSuccess {String} message Response message
 * @apiSuccess {Objec} result Result object
 * @apiSuccess {String} result.plantID Plant unique ID
 * @apiSuccess {String[]} result.fields List of fields
 * @apiSuccess {String} result.HTX_id Cooperatives ID
 * @apiSuccess {Date} result.begin Farming begin date
 * @apiSuccess {Date} result.end Farming end date
 * @apiSuccess {String="farming","finished"} result.status Diary status
 * @apiSuccess {String} result.name Diary name
 * @apiSuccess {String} result.description Diary description
 * @apiSuccess {String} result._id Diary ID
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 201 CREATED
 *      {
 *          "code": 201,
 *          "message": "Create new diary successfully",
 *          "result": {
 *              "plantID": "5dedc93ebad8e32650d38789",
 *              "fields": [
 *                  "5dedc932bad8e32650d38788",
 *                  "5dedc93ebad8e32650d38789"
 *              ],
 *              "HTX_id": "5dedc93ebad8e32650d38789",
 *              "begin": "1970-01-01T08:32:50+08:00",
 *              "end": "1970-01-01T08:32:50+08:00",
 *              "status": "active",
 *              "name": "Vu he thu",
 *              "description": "",
 *              "_id": "5e9d5bc8f643a83766c86cff"
 *          }
 *      }
 * 
 */
Router.route('/').post(
    ensureAdmin,
    createNewDiary,
);



/**
 * @api {get} /v1/api/diary/:diaryID Get Diary info by ID
 * @apiVersion 1.0.0
 * @apiSampleRequest http://localhost:3001/v1/api/diary/5e9d5e59c1722f38c42088ea
 * 
 * @apiName GetDiaryByID
 * @apiGroup Diary
 * @apiHeader authorization
 * 
 * @apiSuccess {Code} code Response code
 * @apiSuccess {String} message Response message
 * @apiSuccess {Objec} result Result object
 * @apiSuccess {String} result.plantID Plant unique ID
 * @apiSuccess {String[]} result.fields List of fields
 * @apiSuccess {String} result.HTX_id Cooperatives ID
 * @apiSuccess {Date} result.begin Farming begin date
 * @apiSuccess {Date} result.end Farming end date
 * @apiSuccess {String="farming","finished"} result.status Diary status
 * @apiSuccess {String} result.name Diary name
 * @apiSuccess {String} result.description Diary description
 * @apiSuccess {String} result._id Diary ID
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 200 OK
 *      {
 *          "code": 200,
 *          "message": "Get diary infomation successfully",
 *          "result": {
 *              "plantID": "5dedc93ebad8e32650d38789",
 *              "fields": [
 *                  "5dedc932bad8e32650d38788",
 *                  "5dedc93ebad8e32650d38789"
 *              ],
 *              "HTX_id": "5dedc93ebad8e32650d38789",
 *              "begin": "1970-01-01T08:32:50+08:00",
 *              "end": "1970-01-01T08:32:50+08:00",
 *              "status": "active",
 *              "name": "Vu he thu",
 *              "description": "",
 *              "_id": "5e9d5bc8f643a83766c86cff"
 *          }
 *      }
 */
Router.route('/:diaryID').get(
    // ensureEmployee,
    getDiaryByID,
)

module.exports = Router;