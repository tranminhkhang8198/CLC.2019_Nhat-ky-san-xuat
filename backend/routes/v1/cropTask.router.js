const Router = require("express").Router();

const {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
  createSampleTemplate,
} = require("../../controllers/cropTask.conttroller");
const {
  postValidator,
  patchValidator,
  createSampleTemplateValidator,
  validateParamId,
} = require("../../validations/cropTask.validation");

Router.route("/").post(postValidator, create);
Router.route("/").get(getAll);
Router.route("/:id").get(validateParamId, getOne);
Router.route("/:id").delete(validateParamId, deleteOne);
Router.route("/:id").patch(patchValidator, update);
Router.route("/create-sample-template").post(
  createSampleTemplateValidator,
  createSampleTemplate
);

module.exports = Router;
