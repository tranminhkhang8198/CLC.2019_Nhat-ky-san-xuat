const path = require("path");

const getJsonDataFromFile = require("../utils/getJsonDataFromFile");

module.exports = {
  async up(db, client) {
    const cooperatives = getJsonDataFromFile(path.join(__dirname, "../farm/cooperatives.json"));

    await db.collection("cooperatives").insertMany(cooperatives);
  },

  async down(db, client) {
    await db.collection("cooperatives").deleteMany({});
  }
};
