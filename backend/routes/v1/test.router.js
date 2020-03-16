const Router = require('express').Router();

const {
    testController,
} = require('../../controllers/test.controller');

Router.route('/').post(
    testController,
);

module.exports = Router;