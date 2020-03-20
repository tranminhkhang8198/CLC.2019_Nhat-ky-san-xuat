const Router = require('express').Router();

const {
    createNewTool,
} = require('../../controllers/tool.controller');

const {
    validateBeforeCreate
} = require('../../validations/tool.validation');

Router.route('/').post(
    validateBeforeCreate,
    createNewTool
);

module.exports = Router;