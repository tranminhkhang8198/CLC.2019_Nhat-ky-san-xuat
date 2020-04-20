const Router = require("express").Router();

const testRoute = require("../v1/test.router");
const toolRouter = require("../v1/tool.router");
const borrowedToolRouter = require("../v1/borrowedTool.router");
const warehouseRouter = require("./warehouse.router");
const goodsReceipt = require("../v1/goodsReceipt.route");
const goodsIssueRouter = require("./goodsIssue.router");
const employeeRouter = require("../v1/employee.router");
const eventRouter = require("./event.router");
const cropTaskRouter = require("./cropTask.router");
const diaryRouter = require('../v1/diary.router');

Router.use("/v1/api/test", testRoute);
Router.use("/api/tools", toolRouter);
Router.use("/api/borrowedTools", borrowedToolRouter);
Router.use("/api/warehouses", warehouseRouter);
Router.use("/v1/api/goodsReceipt", goodsReceipt);
Router.use("/api/goods-issues", goodsIssueRouter);
Router.use("/v1/api/cooperatives/", employeeRouter);
Router.use("/api/events", eventRouter);
Router.use("/api/crop-tasks", cropTaskRouter);
Router.use('/v1/api/diary', diaryRouter);

module.exports = Router;
