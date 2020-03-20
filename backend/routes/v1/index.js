const Router = require('express').Router()

const testRoute = require('../v1/test.router');
const toolRouter = require('../v1/tool.router');

Router.use('/v1/api/test', testRoute);
Router.use('/api/tools', toolRouter);

module.exports = Router;