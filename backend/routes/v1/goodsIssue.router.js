const Router = require("express").Router();

const {
  validateBeforeCreate,
  validateParamId
} = require("../../validations/goodsIssue.validation");
const {
  create,
  getAll,
  getOne,
  deleteOne
} = require("../../controllers/goodsIssue.controller");

Router.route("/").post(validateBeforeCreate, create);

Router.route("/").get(getAll);

Router.route("/:id").get(validateParamId, getOne);

Router.route("/:id").delete(validateParamId, deleteOne);

module.exports = Router;
