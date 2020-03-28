const Router = require("express").Router();

const { create } = require("../../controllers/goodsIssue.controller");

Router.route("/").post(create);

module.exports = Router;
