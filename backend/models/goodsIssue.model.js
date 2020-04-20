const _ = require("lodash");
const mongodb = require("mongodb");

class GoodsIssue {
  constructor(app) {
    this.app = app;

    this.model = {
      productId: null,
      productType: null,
      issuedDate: null,
      receivedDate: null,
      receivedStatus: null,
      receiverId: null,
      goodsReceiptInfo: null,
      cooperativeId: null,
      note: null,
    };
  }

  initWithObject(obj) {
    this.model.productId = _.get(obj, "productId", null);
    this.model.productType = _.get(obj, "productType", null);
    this.model.issuedDate = _.get(obj, "issuedDate", null);
    this.model.receivedDate = _.get(obj, "receivedDate", null);
    this.model.receivedStatus = _.get(obj, "receivedStatus", null);
    this.model.receiverId = _.get(obj, "receiverId", null);
    this.model.goodsReceiptInfo = _.get(obj, "goodsReceiptInfo", null);
    this.model.cooperativeId = _.get(obj, "cooperativeId", null);
    this.model.note = _.get(obj, "note", null);
  }

  async create(obj) {
    try {
      const GoodsIssue = this.app.db.collection("goodsIssues");

      this.initWithObject(obj);

      delete this.model._id;

      const goodsIssue = await GoodsIssue.insertOne(this.model);

      return goodsIssue.ops[0];
    } catch (err) {
      console.log(err);
    }
  }

  async find(query) {
    try {
      const GoodsIssue = this.app.db.collection("goodsIssues");

      const goodsIssues = GoodsIssue.find(query).toArray();

      return goodsIssues;
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id) {
    try {
      const GoodsIssue = this.app.db.collection("goodsIssues");

      const goodsIssue = GoodsIssue.findOne({ _id: mongodb.ObjectID(id) });

      return goodsIssue;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, field) {
    try {
      const GoodsIssue = this.app.db.collection("goodsIssues");

      const goodsIssue = GoodsIssue.findOneAndUpdate(
        { _id: mongodb.ObjectID(id) },
        { $set: field },
        { returnOriginal: false }
      );

      return goodsIssue;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      const GoodsIssue = this.app.db.collection("goodsIssues");

      await GoodsIssue.deleteOne({ _id: mongodb.ObjectID(id) });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = GoodsIssue;
