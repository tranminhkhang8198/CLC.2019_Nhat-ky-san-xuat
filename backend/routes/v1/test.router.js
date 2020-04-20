const Router = require('express').Router();

const {
    testController,
} = require('../../controllers/test.controller');
const {
    validateBeforeInsert,
} = require('../../validations/test.validation')

Router.route('/').post(
    validateBeforeInsert,
    testController,
);

module.exports = Router;