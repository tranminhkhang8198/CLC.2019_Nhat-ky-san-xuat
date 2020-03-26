const _ = require("lodash");
const mongodb = require("mongodb");

class Tool {
  constructor(app) {
    this.app = app;

    this.model = {
      name: null,
      total: null,
      available: null,
      image: null,
      note: null,
      cooperativeId: null
    };
  }

  initWithObject(obj) {
    this.model.name = _.get(obj, "name", null);
    this.model.total = _.get(obj, "total", null);
    this.model.available = parseInt(_.get(obj, "available", null));
    this.model.image = _.get(obj, "image", null);
    this.model.note = _.get(obj, "note", null);
    this.model.cooperativeId = _.get(obj, "cooperativeId", null);
  }

  async create(obj) {
    try {
      const Tool = this.app.db.collection("tools");

      // init model
      this.initWithObject(obj);

      const tool = await Tool.insertOne(this.model);

      return tool.ops[0];
    } catch (err) {
      console.log(err);
    }
  }

  async find(query) {
    try {
      const Tool = this.app.db.collection("tools");

      const tools = await Tool.find(query).toArray();

      return tools;
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id) {
    try {
      const Tool = this.app.db.collection("tools");

      const tool = await Tool.findOne({ _id: mongodb.ObjectID(id) });

      return tool;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, field) {
    try {
      const Tool = this.app.db.collection("tools");

      const tool = Tool.findOneAndUpdate(
        { _id: mongodb.ObjectID(id) },
        { $set: field },
        { returnOriginal: false }
      );

      return tool;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      const Tool = this.app.db.collection("tools");

      await Tool.deleteOne({ _id: mongodb.ObjectID(id) });
    } catch (err) {
      console.log(err);
    }
  }

  async isExist(field) {
    try {
      const Tool = this.app.db.collection("tools");

      const tool = await Tool.findOne(field);

      return tool;
    } catch (err) {
      console.log(err);
    }
  }

  async decreaseAvailable(id, borrowedQuantity) {
    try {
      const Tool = this.app.db.collection("tools");

      const tool = await Tool.findOneAndUpdate(
        { _id: mongodb.ObjectID(id) },
        { $inc: { available: -parseInt(borrowedQuantity) } }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async increaseAvailable(id, borrowedQuantity) {
    try {
      const Tool = this.app.db.collection("tools");

      console.log(borrowedQuantity);

      const tool = await Tool.findOneAndUpdate(
        { _id: mongodb.ObjectID(id) },
        { $inc: { available: parseInt(borrowedQuantity) } }
      );
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Tool;
