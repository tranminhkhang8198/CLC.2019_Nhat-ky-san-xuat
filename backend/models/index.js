const User = require("./user");
const Token = require("./token");
const Role = require("./permission/role");
const Resource = require("./permission/resource");
const Permission = require("./permission/permission");
const PlantProtectionProduct = require("./plantProtectionProduct");
const Cooperative = require('./cooperative');
const Diary = require('./diary');
const ScopeOfUse = require('./scopeOfUse');
const Field = require('./field');

class Model {
  constructor(app) {
    this.app = app;
    this.user = new User(app);
    this.token = new Token(app);
    this.role = new Role(app);
    this.resource = new Resource(app);
    this.permission = new Permission(app);
    this.plantProtectionProduct = new PlantProtectionProduct(app);
    this.cooperative = new Cooperative(app);
    this.scopeOfUse = new ScopeOfUse(app);
    this.diary = new Diary(app);
    this.field = new Field(app)
  }
}
module.exports = Model;