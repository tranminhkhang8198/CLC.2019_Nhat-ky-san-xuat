const path = require('path');

const envEnum = require('./enum/env.enum');

require('dotenv-safe').config({
    allowEmptyValues: true,
    path: path.join(__dirname, '../../../.env'),
    example: path.join(__dirname, '../../../.env.example'),
});

module.exports = {
    port: parseInt(process.env.PORT, 10),
    env: process.env.NODE_ENV,
    host: process.env.NODE_ENV === envEnum.PRODUCTION
        ? `${process.env.HOST}`
        : `${process.env.HOST}:${process.env.PORT}`,
    db: {
        url: process.env.DB_URL,
    },
};

