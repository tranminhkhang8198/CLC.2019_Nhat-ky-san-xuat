const path = require("path");

const getJsonDataFromFile = require("../utils/getJsonDataFromFile");

module.exports = {
  async up(db, client) {
    const users = getJsonDataFromFile(path.join(__dirname, "../farm/user.json"));

    await db.collection("user").insertMany(users);
  },

  async down(db, client) {
    await db.collection("user").deleteMany({});
  }
};

