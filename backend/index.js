require("dotenv").config();

const http = require("http");
const { app } = require("./config/express");
const Model = require("./models");

const { connect } = require('./config/mongo')

app.server = http.createServer(app);

// Start server
const PORT = process.env.PORT || 3001;

(async () => {
  const dbConnection = await connect();
  app.db = dbConnection.db;
  // Set up models
  app.models = new Model(app);
  app.server.listen(PORT, async () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
  });  
})();
