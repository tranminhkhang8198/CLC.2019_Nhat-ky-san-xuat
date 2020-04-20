const _ = require("lodash");
const mongodb = require("mongodb");

class BorrowedTool {
  constructor(app) {
    this.app = app;

    this.model = {
      toolId: null,
      borrowedQuantity: null,
      borrowedDate: null,
      returnedDate: null,
      image: null,
      note: null,
      userBorrowedId: null,
      cooperativeId: null
    };
  }

  initWithObject(obj) {
    this.model.toolId = _.get(obj, "toolId", null);
    this.model.borrowedQuantity = _.get(obj, "borrowedQuantity", null);
    this.model.borrowedDate = _.get(obj, "borrowedDate", null);
    this.model.returnedDate = _.get(obj, "returnedDate", null);
    this.model.image = _.get(obj, "image", null);
    this.model.note = _.get(obj, "note", null);
    this.model.userBorrowedId = _.get(obj, "userBorrowedId", null);
    this.model.cooperativeId = _.get(obj, "cooperativeId", null);
  }

  async create(obj) {
    try {
      const BorrowedTool = this.app.db.collection("borrowedTools");

      // init model
      this.initWithObject(obj);

      delete this.model._id;

      const borrowedTool = await BorrowedTool.insertOne(this.model);

      return borrowedTool.ops[0];
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

module.exports = BorrowedTool;
