const User = require("./user");
const Token = require("./token");
const Role = require("./authorization/role");
const Resource = require("./authorization/resource");
const Permission = require("./authorization/permission");
const PlantProtectionProduct = require("./plantProtectionProduct");
const Cooperative = require('./cooperative');
const Diary = require('./diary');
const ScopeOfUse = require('./scopeOfUse');
const Fertilizer = require('./fertilizer');
const Field = require('./field');
const PlantProtectionProductWarehouse = require('./plantProtectionProductWarehouse');
const GoodReceipt = require('./goodReceipt');
const GoodsIssue = require('./goodsIssue');

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
    this.fertilizer = new Fertilizer(app);
    this.diary = new Diary(app);
    this.field = new Field(app)
    this.plantProtectionProductWarehouse = new PlantProtectionProductWarehouse(app);
    this.goodReceipt = new GoodReceipt(app);
    this.goodsIssue = new GoodsIssue(app);
  }
}
module.exports = Model;