const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { routers } = require('./router')
const { connect } = require('./db')
const { dbName } = require('./config')
const Model = require('./models')
const morgan = require('morgan')
const Router = require('./routes/v1');
const PORT = 3001;


const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());


app.use(morgan('dev'));

app.use(express.static('./images'));

// allow CORS in header
app.use(cors());


app.server = http.createServer(app);



// App routers
app.routers = routers(app)

//connect to mongodb
connect((err, client) => {

    if (err) {
        throw err;
    }

    app.db = client.db(dbName);
});

// Set up models
app.models = new Model(app);

app.use(Router);

// Start server
app.server.listen(PORT, () => {

    console.log(`Server is running on: http://localhost:${PORT}`);
});