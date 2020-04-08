const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { OrderedMap } = require('immutable');
const { ObjectID } = require('mongodb');
const config = require('./config/tokenConfig');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');
class Token {

    constructor(app) {
        this.app = app;
        this.Tokens = new OrderedMap();
    }

    /**
     * Add token to cache
     * @param {string} id 
     * @param {token object} token 
     */
    addTokenToCache(token) {

        // this.Tokens.append(token)
        if (typeof id === 'string') {
            id = new ObjectID(id);
        }

        this.Tokens = this.Tokens.set(id, token);
    }

    /**
     * Create new token
     * @param {string} userId 
     * @param {callback function} cb 
     */
    create(user, cb = () => { }) {

        // if(typeof userId ==='string'){
        //     userId = _.toString(userId);
        // }

        // const token = {
        //     userId: userId,
        //     created: new Date()
        // };
        // Create new token

        let options = {
            expiresIn: config.tokenLife
        };
        const token = jwt.sign(user, config.secret, options)
        options = {
            expiresIn: config.refreshTokenLife
        }
        const refreshToken = jwt.sign(user, config.refreshTokenSecret, options);

        const userId = user._id;


        const tokenObj = {
            refreshToken: refreshToken,
            userId: userId
        }

        this.app.db.collection('token').insertOne(tokenObj, (err, info) => {
            if (err) {
                return cb("Error creating token", null);
            } else {
                return cb(null, { token: token, refreshToken: refreshToken })
            }
        })

    }


    /**
     * Verify token
     * @param {string} tokenId 
     * @param {callback function} cb 
     */
    async verify(token) {
        try {
            console.log(token);
            const payload = await jwt.verify(token, config.secret);
            return payload;

        } catch (error) {
            throw new APIError({
                message: 'Unauthorized',
                status: httpStatus.UNAUTHORIZED,
                stack: error.stack,
                isPublic: false,
                errors: error.errors,
            })
        }

    }

    refresh(refreshToken, cb = () => { }) {
        const collection = this.app.db.collection('token')
        jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
            if (err) {
                //TODO: neu token het hang thi xoa khoi database
                if (err.message === "jwt expired") {
                    const collection = this.app.db.collection('token');
                    collection.deleteOne({ refreshToken: refreshToken }, (err, result) => {
                        if (err) {
                            return cb({ errorMessage: "Some thong went wrong" }, null);
                        } else {
                            return cb(null, result);
                        }
                    })
                }
                return cb({ errorMessage: "Refresh token not match" }, null);
            } else {
                // Get user
                const query = {
                    refreshToken: refreshToken
                }
                collection.find(query).toArray((err, result) => {
                    if (err || !_.get(result, '[0]')) {
                        return cb({ errorMessage: "Token is not found" }, null);
                    } else {

                        const token = _.get(result, '[0]');
                        const userId = token.userId;

                        // Get user from userId
                        this.app.models.user.load(userId, (err, user) => {
                            if (err) {

                                return cb({ errorMessage: "user is not found" }, null)
                            } else {

                                console.log(user);
                                // Create new token from user
                                let signOptions = {
                                    expiresIn: config.tokenLife
                                }
                                const token = jwt.sign(user, config.secret, signOptions);
                                // Create new fresh token
                                signOptions = {
                                    expiresIn: config.refreshTokenLife
                                }
                                const newRefreshToken = jwt.sign(user, config.refreshTokenSecret, signOptions);

                                // Update token in database
                                const query = {
                                    refreshToken: refreshToken
                                }
                                const options = {
                                    $set: {
                                        refreshToken: newRefreshToken
                                    }
                                }
                                collection.updateOne(query, options, (err, result) => {
                                    if (err) {
                                        return cb({ errorMessage: "Khong the cap nhat refresh token" }, null);
                                    }
                                    else {

                                        if (result.result.nModified == 0) {
                                            return cb({ errorMessage: "Khong the thay doi refresh token trong database" }, null)
                                        } else {
                                            return cb(null, { token: token, refreshToken: newRefreshToken });
                                        }
                                    }
                                })


                            }
                        })
                    }
                })


            }
        })
    }

    remove(refreshToken, cb = () => { }) {
        if (!refreshToken) {
            return cb({ errorMessage: "Token khong hop le" })
        }
        // Verify Token
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, config.refreshTokenSecret)
        } catch (error) {
            return cb({ errorMessage: "Token khong hop le hoac het hieu luc" });
        }
        // Delete token
        const collection = this.app.db.collection('token');
        collection.deleteOne({ refreshToken: refreshToken }, (err, result) => {
            if (err) {
                return cb({ errorMessage: "Loi xoa du lieu database" }, null);
            }
            else {
                return cb(null, { responseMessage: "Xoa thanh cong" });
            }
        });
    }
}

module.exports = Token;