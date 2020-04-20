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
    this.model.patchCode = _.get(obj, "patchCode", null);
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
      const Warehouse = this.app.db.collection("warehouses");

      const warehouses = await Warehouse.find(query).toArray();

      return warehouses;
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id) {
    try {
      const Warehouse = this.app.db.collection("warehouses");

      const warehouse = await Warehouse.findOne({
        _id: mongodb.ObjectID(id)
      });

      return warehouse;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, field) {
    try {
      const Warehouse = this.app.db.collection("warehouses");

      const warehouse = Warehouse.findOneAndUpdate(
        { _id: mongodb.ObjectID(id) },
        { $set: field },
        { returnOriginal: false }
      );

      return warehouse;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      const Warehouse = this.app.db.collection("warehouses");

      await Warehouse.deleteOne({ _id: mongodb.ObjectID(id) });
    } catch (err) {
      console.log(err);
    }
  }

  async isExist(productId, cooperativeId) {
    try {
      const Warehouse = this.app.db.collection("warehouses");

      const warehouse = await Warehouse.findOne({
        productId,
        cooperativeId
      });

      return warehouse;
    } catch (err) {
      console.log(err);
    }
  }

  async updateQuantity(productId, cooperativeId, quantity) {
    try {
      const Warehouse = this.app.db.collection("warehouses");

      const warehouse = await Warehouse.findOneAndUpdate(
        { productId, cooperativeId },
        { $inc: { quantity: parseInt(quantity) } }
      );
      return warehouse;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Warehouse;
