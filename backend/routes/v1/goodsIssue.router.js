const Router = require("express").Router();

const {
  validateBeforeCreate
} = require("../../validations/goodsIssue.validation");
const { create } = require("../../controllers/goodsIssue.controller");

Router.route("/").post(validateBeforeCreate, create);

module.exports = Router;
