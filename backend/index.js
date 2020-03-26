const http = require('http');
const bodyParser = require('body-parser');
const { app, } = require('./config/express');
const cors = require('cors');
const { connect } = require('./db')
const { dbName } = require('./config')
const Model = require('./models')
const morgan = require('morgan')
const Router = require('./routes/v1');
const PORT = 3001;

app.server = http.createServer(app);

//connect to mongodb
connect((err, client) => {

    if (err) {
        throw err;
    }

    app.db = client.db(dbName);
});

// Set up models
app.models = new Model(app);
// Start server
app.server.listen(PORT, () => {

    console.log(`Server is running on: http://localhost:${PORT}`);
});
