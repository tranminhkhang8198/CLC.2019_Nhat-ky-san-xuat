const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');

const { routers } = require('../router')

const app = express();
const { log } = require('./vars');

const logger = require('./logger');

const Router = require('../routes/v1');

const error = require('../middlewares/error');

/**
 * Middlewares
 */

// wear helmet for APIs
app.use(helmet());

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

// receive data in body of request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

// enable CORS in Header
app.use(cors());

// logger for APIs accesses
app.use(morgan(log, { stream: logger.stream }));

// static folders
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/v1/docs', express.static(path.join(__dirname, '../docs/apidoc')));

/**
 * Routers
 */
app.use(Router);

// App routers
app.routers = routers(app)

/**
 * Global error handlers
 */

// if error is not an instance of APIError, convert it
app.use(error.converter);

// handle 404 Not Found error
app.use(error.notFound);

// add a global error handler to catch the error responsed
app.use(error.handler);

module.exports = {
    app,
};