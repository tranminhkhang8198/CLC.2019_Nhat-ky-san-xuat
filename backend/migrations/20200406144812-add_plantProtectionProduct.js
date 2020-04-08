const path = require("path");
const mongodb = require("mongodb");

const getJsonDataFromFile = require("../utils/getJsonDataFromFile");

module.exports = {
  async up(db, client) {
    const plantProtectionProducts = getJsonDataFromFile(
      path.join(__dirname, "../farm/plantProtectionProduct.json")
    );

    for (let plantProtectionProduct of plantProtectionProducts) {
      plantProtectionProduct._id = mongodb.ObjectID(plantProtectionProduct._id);
    }

    await db
      .collection("plantProtectionProduct")
      .insertMany(plantProtectionProducts);
  },

  async down(db, client) {
    await db.collection("plantProtectionProduct").deleteMany({});
  },
};
