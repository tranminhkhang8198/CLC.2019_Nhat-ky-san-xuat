const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const {routers} = require('./router')
const {connect} = require('./db')
const {dbName} = require('./config')
const Model = require('./models')

const PORT = 3001;


const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.server = http.createServer(app);




// App routers
app.routers = routers(app)

//connect to mongodb
connect((err, client) => {

    if(err){
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