require("dotenv").config();

const http = require("http");
const { connect } = require('./config/mongo');
const { app } = require("./config/express");
const Model = require("./models");

app.server = http.createServer(app);

// Start server
const PORT = process.env.PORT || 3001;

(async () => {
  const dbConnection = await connect();

  app.server.listen(PORT, () => {
    app.db = dbConnection.db;
    // Set up models
    app.models = new Model(app);
    console.log(`Server is running on: http://localhost:${PORT}`);
  });
})()