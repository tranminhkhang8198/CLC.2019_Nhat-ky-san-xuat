const mongodb = require("mongodb");
const path = require("path");

const getJsonDataFromFile = require("../utils/getJsonDataFromFile");

module.exports = {
  async up(db, client) {
    const scopeOfUses = getJsonDataFromFile(
      path.join(__dirname, "../farm/scopeOfUse.json")
    );

    for (let scopeOfUse of scopeOfUses) {
      scopeOfUse._id = mongodb.ObjectID(scopeOfUse._id);
      scopeOfUse.pppId = mongodb.ObjectID(scopeOfUse.pppId);
    }

    await db.collection("scopeOfUse").insertMany(scopeOfUses);
  },

  async down(db, client) {
    await db.collection("scopeOfUse").deleteMany({});
  },
};
