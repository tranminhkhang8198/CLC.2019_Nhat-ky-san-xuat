const _ = require("lodash");
const mongodb = require("mongodb");

class Warehouse {
  constructor(app) {
    this.app = app;

    this.model = {
      productId: null,
      productType: null,
      price: null,
      quantity: null,
      patchCode: null,
      goodReceiptId: null,
      cooperativeId: null
    };
  }

  initWithObject(obj) {
    this.model.productId = _.get(obj, "productId", null);
    this.model.productType = _.get(obj, "productType", null);
    this.model.price = _.get(obj, "price", null);
    this.model.quantity = _.get(obj, "quantity", null);
    this.model.goodReceiptId = _.get(obj, "goodReceiptId", null);
    this.model.cooperativeId = _.get(obj, "cooperativeId", null);
  }

  async create(obj) {
    try {
      const Warehouse = this.app.db.collection("warehouses");

      // init model
      this.initWithObject(obj);

      const warehouse = await Warehouse.insertOne(this.model);

      return warehouse.ops[0];
    } catch (err) {
      console.log(err);
    }
  }

  async find(query) {
    try {
      const BorrowedTool = this.app.db.collection("borrowedTools");

      const borrowedTools = await BorrowedTool.find(query).toArray();

      return borrowedTools;
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id) {
    try {
      const BorrowedTool = this.app.db.collection("borrowedTools");

      const borrowedTool = await BorrowedTool.findOne({
        _id: mongodb.ObjectID(id)
      });

      return borrowedTool;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, field) {
    try {
      const BorrowedTool = this.app.db.collection("borrowedTools");

      const borrowedTool = BorrowedTool.findOneAndUpdate(
        { _id: mongodb.ObjectID(id) },
        { $set: field },
        { returnOriginal: false }
      );

      return borrowedTool;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      const BorrowedTool = this.app.db.collection("borrowedTools");

      await BorrowedTool.deleteOne({ _id: mongodb.ObjectID(id) });
    } catch (err) {
      console.log(err);
    }
  }

  async isExist(field) {
    try {
      const BorrowedTool = this.app.db.collection("borrowedTools");

      const borrowedTool = await BorrowedTool.findOne(field);

      return borrowedTool;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Warehouse;
