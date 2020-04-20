const mongodb = require("mongodb");
const path = require("path");

const getJsonDataFromFile = require("../utils/getJsonDataFromFile");

module.exports = {
  async up(db, client) {
    const registrationInfos = getJsonDataFromFile(
      path.join(__dirname, "../farm/registrationInfo.json")
    );

    for (let registrationInfo of registrationInfos) {
      registrationInfo._id = mongodb.ObjectID(registrationInfo._id);
      registrationInfo.pppId = mongodb.ObjectID(registrationInfo.pppId);
    }

    await db.collection("registrationInfo").insertMany(registrationInfos);
  },

  async down(db, client) {
    await db.collection("registrationInfo").deleteMany({});
  },
};
