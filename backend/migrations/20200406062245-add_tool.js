const path = require("path");

const getJsonDataFromFile = require("../utils/getJsonDataFromFile");

module.exports = {
  async up(db, client) {
    const tools = getJsonDataFromFile(path.join(__dirname, "../farm/tool.json"));

    await db.collection("tools").insertMany(tools);
  },

  async down(db, client) {
    await db.collection("tools").deleteMany({});
  }
};
