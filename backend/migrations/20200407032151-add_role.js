const path = require("path");

const getJsonDataFromFile = require("../utils/getJsonDataFromFile");

module.exports = {
  async up(db, client) {
    const roles = getJsonDataFromFile(
      path.join(__dirname, "../farm/roles.json")
    );

    await db.collection("role").insertMany(roles);
  },

  async down(db, client) {
    await db.collection("role").deleteMany({});
  },
};
