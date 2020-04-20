const _ = require("lodash");
const mongodb = require("mongodb");

class CropTask {
  constructor(app) {
    this.app = app;

    this.model = {
      name: null,
      startDate: null,
      endDate: null,
      type: null,
      stage: null,
      note: null,
      diaryId: null,
    };
  }

  initWithObject(obj) {
    this.model.name = _.get(obj, "name", null);
    this.model.startDate = _.get(obj, "startDate", null);
    this.model.endDate = _.get(obj, "endDate", null);
    this.model.stage = _.get(obj, "stage", null);
    this.model.type = _.get(obj, "type", null);
    this.model.note = _.get(obj, "note", null);
    this.model.diaryId = _.get(obj, "diaryId", null);
  }

  async create(obj) {
    try {
      const CropTask = this.app.db.collection("cropTasks");

      // init model
      this.initWithObject(obj);

      delete this.model._id;

      const cropTask = await CropTask.insertOne(this.model);

      return cropTask.ops[0];
    } catch (err) {
      console.log(err);
    }
  }

  async find(query) {
    try {
      const CropTask = this.app.db.collection("cropTasks");

      const cropTasks = await CropTask.find(query).toArray();

      return cropTasks;
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id) {
    try {
      const CropTask = this.app.db.collection("cropTasks");

      const cropTask = await CropTask.findOne({
        _id: mongodb.ObjectID(id),
      });

      return cropTask;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, field) {
    try {
      const CropTask = this.app.db.collection("cropTasks");

      const cropTask = CropTask.findOneAndUpdate(
        { _id: mongodb.ObjectID(id) },
        { $set: field },
        { returnOriginal: false }
      );

      return cropTask;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      const CropTask = this.app.db.collection("cropTasks");

      await CropTask.deleteOne({ _id: mongodb.ObjectID(id) });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = CropTask;
