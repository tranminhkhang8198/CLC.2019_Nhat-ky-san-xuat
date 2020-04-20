const path = require("path");

const getJsonDataFromFile = require("../utils/getJsonDataFromFile");

module.exports = {
  async up(db, client) {
    const fertilizers = getJsonDataFromFile(path.join(__dirname, "../farm/database_phan_bon.json"));

    await db.collection("fertilizer").insertMany(fertilizers);
  },

  async down(db, client) {
    await db.collection("fertilizer").deleteMany({});
  }
};
