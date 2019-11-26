const _ = require('lodash');
const {OrderedMap} = require('immutable');
const {ObjectID} = require('mongodb');


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
    addTokenToCache(id, token){

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
    create(userId, cb = () => {}){

        if(typeof userId ==='string'){
            userId = _.toString(userId);
        }

        const token = {
            userId: userId,
            created: new Date()
        };

        this.app.db.collection('token').insertOne(token, (err, info) => {
            if (err== null){

                const id = _.toString(token._id);
                //add token to cache
                this.addTokenToCache(id, token);
            }
            return err ? cb("Error creating token", null) : cb(null, token);
        })

    }


    /**
     * Verify token
     * @param {string} tokenId 
     * @param {callback function} cb 
     */
    verify(tokenId, cb = () => {}){

        if(typeof tokenId !== 'string'){
            tokenId = _.toString(tokenId);
        }

        // Find token in cache
        const inCache = this.Tokens.get(tokenId);

        if(inCache){
            // Get user info
            const userId = inCache.userId.toString();
            console.log("fsdfsdfrwerwerwerwer",userId)
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
            console.log("sdfsfsdfsdfdsfsdfsd ",typeof tokenId);
            // Find token in database
            const tokenObjId = new ObjectID(tokenId);
            console.log("fsddddddddddddddddddddd")
            this.app.db.collection('token').find({_id: tokenObjId}).limit(1).toArray((err, result) => {
            if(err ||!_.get(result, '[0]')){
                return cb("Token is invalid", null);
            }
            else{
                // Find user info
                const token = _.get(result, '[0]');
                const userId = token.userId.toString();
                this.app.models.user.load(userId, (err, user) => {
                    if(err){
                        return cb(err, null);
                    }
                    else{
                        token.user = user;
                        return cb(null,token);
                    }
                });
                
            }
            })

        }

        
    }
}

module.exports = Token;