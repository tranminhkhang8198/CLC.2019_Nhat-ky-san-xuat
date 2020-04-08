const fs = require("fs");

const getJsonDataFromFile = (file) => {
  let jsonData = fs.readFileSync(file);
  jsonData = JSON.parse(jsonData);
  return jsonData;
};

module.exports = getJsonDataFromFile;
