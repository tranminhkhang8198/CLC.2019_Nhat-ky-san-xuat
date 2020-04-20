const _ = require("lodash");
const mongodb = require("mongodb");
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');

class Warehouse {
  constructor(app) {
    this.app = app;

    this.model = {
      productId: null,
      productType: null,
      goodReceiptInfo: null,
      cooperativeId: null,
    };
  }

  initWithObject(obj) {
    this.model.productId = _.get(obj, "productId", null);
    this.model.productType = _.get(obj, "productType", null);
    this.model.goodReceiptInfo = _.get(obj, "goodReceiptInfo", null);
    this.model.cooperativeId = _.get(obj, "cooperativeId", null);
  }

  async insertOne(obj) {
    try {
      const result = await this.app.db.collection('warehouses').insertOne(
        obj,
      );

      return result ? result.ops : null;

    } catch (error) {
      throw new APIError({
        message: 'Failed on inserting warehouse document',
        status: httpStatus.INTERNAL_SERVER_ERROR,
        stack: error.stack,
        isPublic: false,
        errors: error.errors,
      })
    }
  }

  async create(obj) {
    try {
      const Warehouse = this.app.db.collection("warehouses");

      // init model
      this.initWithObject(obj);

      delete this.model._id;

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
        _id: mongodb.ObjectID(id),
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
        cooperativeId,
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
  async pushReceipt(productId, goodsReceiptInfo) {
    try {
      const result = await this.app.db.collection('warehouses').findOneAndUpdate(
        {
          productId: productId,
        },
        {
          $push: {
            goodsReceiptInfo: goodsReceiptInfo,
          }
        },
        {
          returnOriginal: false,
        }
      );
      console.log(result);
      return result;

    } catch (error) {
      throw new APIError({
        message: 'Failed on pushing receipt to warehouse',
        status: httpStatus.INTERNAL_SERVER_ERROR,
        stack: error.stack,
        isPublic: false,
        errors: error.errors,
      })
    }
  }
}

module.exports = Warehouse;
