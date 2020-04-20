if (process.env.NODE_ENV == "development") {
  exports.mongodbUrl =
    process.env.MONGO_URL ||
    "mongodb+srv://htx:vrC115qG5M0DV8VH@cluster0-4e7a2.mongodb.net/farm";
} else {
  exports.mongodbUrl =
    process.env.MONGO_URL || "mongodb://localhost:27017/farm";
}

exports.dbName = process.env.DB_NAME || "farm";
