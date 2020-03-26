const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017/";
const url = "mongodb+srv://htx:vrC115qG5M0DV8VH@cluster0-4e7a2.mongodb.net/";
const fs = require("fs");
const _ = require("lodash");
const path = require("path");

function getDatabasePhanBon(file) {
  let phanBon = fs.readFileSync(file);
  phanBon = JSON.parse(phanBon);
  return phanBon;
}

class Fertilizer {
  constructor(db) {
    this.db = db;
  }

  // CREATE NEW PLANT PROTECTION PRODUCT
  create(fertilizer = {}, cb = () => {}) {
    const collection = this.db.collection("fertilizer");
    var response = {};

    let fertilizerObj = {
      ministry: _.get(fertilizer, "ministry", ""),
      province: _.get(fertilizer, "province", ""),
      enterprise: _.get(fertilizer, "enterprise", ""),
      type: _.get(fertilizer, "type", ""),
      name: _.get(fertilizer, "name", ""),
      ingredient: _.get(fertilizer, "ingredient", ""),
      lawDocument: _.get(fertilizer, "ingredient", ""),
      isoCertOrganization: _.get(fertilizer, "isoCertOrganization", ""),
      manufactureAndImport: _.get(fertilizer, "manufactureAndImport", ""),
      created: new Date()
    };

    // Save plant protection product to database
    collection.insertOne(fertilizerObj, (err, res) => {
      if (err) {
        return cb(err, null);
      }

      return cb(null, response);
    });
  }
}

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("farm");

  const file = path.join(__dirname, "../docs/database_phan_bon.json");

  const phanBon = getDatabasePhanBon(file);

  const fertilizer = new Fertilizer(dbo);

  let count = 0;
  for (var i in phanBon) {
    fertilizer.create(phanBon[i], (err, res) => {
      if (err) {
        console.log("Something wrong");
        return;
      }

      count++;

      console.log("Create phan bon " + count);

      if (count == phanBon.length) {
        console.log("Import phan bon successfully");
        db.close();
      }
    });
  }
});
