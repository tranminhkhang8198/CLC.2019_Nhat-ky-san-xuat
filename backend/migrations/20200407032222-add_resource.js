const path = require("path");

const getJsonDataFromFile = require("../utils/getJsonDataFromFile");

module.exports = {
  async up(db, client) {
    const resources = getJsonDataFromFile(
      path.join(__dirname, "../farm/resource.json")
    );

    await db.collection("resource").insertMany(resources);
  },

  async down(db, client) {
    await db.collection("resource").deleteMany({});
  },
};
