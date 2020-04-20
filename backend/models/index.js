const User = require("./user");
const Token = require("./token");
const Role = require("./authorization/role");
const Resource = require("./authorization/resource");
const Permission = require("./authorization/permission");
const PlantProtectionProduct = require("./plantProtectionProduct");
const Cooperative = require("./cooperative");
const Diary = require("./diary");
const ScopeOfUse = require("./scopeOfUse");
const Fertilizer = require("./fertilizer");
const Field = require("./field");
const GoodsIssue = require("./goodsIssue.model");
const GoodsReceipt = require("./goodsReceipt");
const Employee = require("./employee");
const Tool = require("./tool.model");
const Subcontractor = require("./subcontractor");
const Warehouse = require("./warehouse.model");
const Test = require("./test.model");
const BorrowedTool = require("./borrowedTool.model");
const Event = require("./event.model");
const CropTask = require("./cropTask.model");

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
    this.field = new Field(app);
    this.goodsIssue = new GoodsIssue(app);
    this.goodsReceipt = new GoodsReceipt(app);
    this.employee = new Employee(app);
    this.tool = new Tool(app);
    this.subcontractor = new Subcontractor(app);
    this.warehouse = new Warehouse(app);
    this.test = new Test(app);
    this.borrowedTool = new BorrowedTool(app);
    this.event = new Event(app);
    this.cropTask = new CropTask(app);
  }
}
module.exports = Model;
