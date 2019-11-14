const User = require("./user");
const Token = require("./token");
const Role = require("./permission/role");
const Resource = require("./permission/resource");
const Permission = require("./permission/permission");
const PlantProtectionProduct = require("./plantProtectionProduct");

class Model {
  constructor(app) {
    this.app = app;
    this.user = new User(app);
    this.token = new Token(app);
    this.role = new Role(app);
    this.resource = new Resource(app);
    this.permission = new Permission(app);
    this.plantProtectionProduct = new PlantProtectionProduct(app);
  }
}
module.exports = Model;
