require("dotenv").config();

const http = require("http");
const bodyParser = require("body-parser");
const { app } = require("./config/express");
const cors = require("cors");
const Model = require("./models");
const morgan = require("morgan");
const Router = require("./routes/v1");

app.server = http.createServer(app);

// Set up models
app.models = new Model(app);

// Start server
const PORT = process.env.PORT || 3001;
app.server.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
