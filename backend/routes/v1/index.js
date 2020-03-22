const Router = require("express").Router();

const testRoute = require("../v1/test.router");
const toolRouter = require("../v1/tool.router");
const borrowedToolRouter = require("../v1/borrowedTool.router");

Router.use("/v1/api/test", testRoute);
Router.use("/api/tools", toolRouter);
Router.use("/api/borrowedTools", borrowedToolRouter);

module.exports = Router;
