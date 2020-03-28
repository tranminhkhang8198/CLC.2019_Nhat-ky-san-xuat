const Router = require("express").Router();

const testRoute = require("../v1/test.router");
const toolRouter = require("../v1/tool.router");
const borrowedToolRouter = require("../v1/borrowedTool.router");
const warehouseRouter = require("./warehouse.router");
const goodsReceipt = require("../v1/goodsReceipt.route");
const goodsIssueRouter = require("./goodsIssue.router");

Router.use("/v1/api/test", testRoute);
Router.use("/api/tools", toolRouter);
Router.use("/api/borrowedTools", borrowedToolRouter);
Router.use("/api/warehouses", warehouseRouter);
Router.use("/v1/api/goodsReceipt", goodsReceipt);
Router.use("/api/goods-issues", goodsIssueRouter);

module.exports = Router;
