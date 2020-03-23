const Router = require("express").Router();

const {
  validateBeforeCreate
} = require("../../validations/warehouse.validation");
const { create } = require("../../controllers/warehouse.controller");

Router.route("/").post(validateBeforeCreate, create);

module.exports = Router;
