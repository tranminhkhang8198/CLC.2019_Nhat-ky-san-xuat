const _ = require('lodash');
const jwt = require('jsonwebtoken');
const {OrderedMap} = require('immutable');
const {ObjectID} = require('mongodb');
const config = require('./config/tokenConfig');


class Token{

    constructor(app){
        this.app = app;
        this.Tokens = new OrderedMap();
    }

    /**
     * Add token to cache
     * @param {string} id 
     * @param {token object} token 
     */
    addTokenToCache(token){

        // this.Tokens.append(token)
        if(typeof id==='string'){
            id = new ObjectID(id);
        }

        this.Tokens = this.Tokens.set(id, token);
    }

    /**
     * Create new token
     * @param {string} userId 
     * @param {callback function} cb 
     */
    create(user, cb = () => {}){

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
            if (err){
                return cb("Error creating token", null);
            }else{
                return cb(null, {token:token, refreshToken: refreshToken})
            }
        })

    }


    /**
     * Verify token
     * @param {string} tokenId 
     * @param {callback function} cb 
     */
    verify(token, cb = () => {}){

        // Find token in cache
        const inCache = this.Tokens.get(token);
        // console.log("incache", inCache);

        if(inCache){
            // Get user info
            const userId = inCache.userId.toString();
            this.app.models.user.load(userId, (err, user) => {
                if(err){
                    return cb(err, null);
                }
                else{
                    inCache.user = user
                    return cb(null, inCache);
                }
            });
        }
        else{
            // Find token in database
            // let tokenObjId;
            // try{
            //     tokenObjId = new ObjectID(tokenId);
            // }
            // catch(e){
            //     return cb({error:"Token is invalid"}, null);
            // }
            let decoded;
            try {
                decoded = jwt.verify(token, config.secret);
            } catch (error) {
                cb({errorMessage:"Token khong dung hoac da het han"}, null);
            }
            _.unset(decoded,'password');
            cb(null, decoded);

        }

        
    }

    verifyJwtToken(refreshToken, cb = ()=>{}){
        const collection = this.app.db.collection('token')
        jwt.verify(refreshToken, config.refreshTokenSecret,(err, decoded)=> {
            if(err){
                return cb({errorMessage:"Refresh token not match"}, null);
            }else{
                // Get user
                const query = {
                    refreshToken : refreshToken
                }
                collection.find(query).toArray((err, result)=>{
                    if(err || !_.get(result,'[0]')){
                        return cb({errorMessage: "Token is not found"}, null);
                    }else{

                        const token = _.get(result,'[0]');
                        const userId = token.userId;

                        // Get user from userId
                        this.app.models.user.load(userId, (err, user)=>{
                            if(err){

                                return cb({errorMessage: "user is not found"}, null)
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
                                const options ={
                                    $set:{
                                        refreshToken: newRefreshToken
                                    }
                                }
                                collection.updateOne(query, options, (err, result)=>{
                                    if(err){
                                        return cb({errorMessage:"Khong the cap nhat refresh token"},null);
                                    }
                                    else{

                                        if(result.result.nModified == 0){
                                            return cb({errorMessage:"Khong the thay doi refresh token trong database"}, null)
                                        }else{
                                            return cb(null, {token:token,refreshToken:newRefreshToken});
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
}

module.exports = Token;