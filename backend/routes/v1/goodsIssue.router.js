const Router = require("express").Router();

const {
  validateBeforeCreate,
  validateParamId,
  validateBeforeUpdate
} = require("../../validations/goodsIssue.validation");
const {
  create,
  getAll,
  getOne,
  deleteOne,
  update
} = require("../../controllers/goodsIssue.controller");

Router.route("/").post(validateBeforeCreate, create);

Router.route("/").get(getAll);

Router.route("/:id").get(validateParamId, getOne);

Router.route("/:id").delete(validateParamId, deleteOne);

Router.route("/:id").patch(validateParamId, validateBeforeUpdate, update);

module.exports = Router;
