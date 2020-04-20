const _ = require("lodash");
const mongodb = require("mongodb");

class Event {
  constructor(app) {
    this.app = app;

    this.model = {
      name: null,
      participants: [],
      instructorInfo: {
        name: null,
        position: null,
        workUnit: null,
      },
      trainedDate: null,
      note: null,
      coverImage: null,
      cooperativeId: null,
      trainedContent: null,
    };
  }

  initWithObject(obj) {
    this.model.name = _.get(obj, "name", null);
    this.model.participants = _.get(obj, "participants", null);
    this.model.instructorInfo = _.get(obj, "instructorInfo", null);
    this.model.trainedDate = _.get(obj, "trainedDate", null);
    this.model.note = _.get(obj, "note", null);
    this.model.coverImage = _.get(obj, "coverImage", null);
    this.model.trainedContent = _.get(obj, "trainedContent", null);
    this.model.cooperativeId = _.get(obj, "cooperativeId", null);
  }

  async create(obj) {
    try {
      const Event = this.app.db.collection("events");

      // init model
      this.initWithObject(obj);

      delete this.model._id;

      const event = await Event.insertOne(this.model);

      return event.ops[0];
    } catch (err) {
      console.log(err);
    }
  }

  async find(query) {
    try {
      const Event = this.app.db.collection("events");

      const events = await Event.find(query).toArray();

      return events;
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id) {
    try {
      const Event = this.app.db.collection("events");

      const event = await Event.findOne({
        _id: mongodb.ObjectID(id),
      });

      return event;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, field) {
    try {
      const Event = this.app.db.collection("events");

      const event = Event.findOneAndUpdate(
        { _id: mongodb.ObjectID(id) },
        { $set: field },
        { returnOriginal: false }
      );

      return event;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      const Event = this.app.db.collection("events");

      await Event.deleteOne({ _id: mongodb.ObjectID(id) });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Event;
