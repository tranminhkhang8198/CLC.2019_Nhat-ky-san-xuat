const path = require('path');
const dotenv = require('dotenv-safe');

/**
 * The below configuration with dotenv-safe will ensure that
 * all variables defined in .env.example
 * are also defined in .env
 */
dotenv.config({
    allowEmptyValues: true,
    path: path.join(__dirname, '../.env'),
    example: path.join(__dirname, '../.env.example'),
});

module.exports = {
    env: process.env.NODE_ENV || 'development',
    log: process.env.NODE_ENV === 'development' ? 'dev' : 'combined',
    port: process.env.PORT || 3001,
    hostname: process.env.NODE_ENV === 'development'
        ? process.env.DEV_HOST_NAME
        : process.env.PROD_HOST_NAME,
    database: {
        uri: process.env.DB_URI,
        name: process.env.DB_NAME,
    },
    secretOrPrivateKey: {
        value: process.env.SECRET_OR_PRIVATE_KEY,
        accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION_IN_MINUTE,
        refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION_IN_HOUR,
    },

};
