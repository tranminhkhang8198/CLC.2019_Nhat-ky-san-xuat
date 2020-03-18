const Router = require('express').Router()

const testRoute = require('../v1/test.router');

Router.use('/v1/api/test', testRoute);

module.exports = Router;
