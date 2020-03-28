const Router = require("express").Router();

const {
  validateBeforeCreate
} = require("../../validations/goodsIssue.validation");
const { create, getAll } = require("../../controllers/goodsIssue.controller");

Router.route("/").post(validateBeforeCreate, create);

Router.route("/").get(getAll);

module.exports = Router;
