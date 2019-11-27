const _ = require('lodash')

class User{

    constructor(app){
        this.app = app;
    }
    
    validateUser(user, cb = () => {}){

        let err = null;
        return cb(err, user);
    }
    
    create(user = {}, cb = () =>{}){
        
        const collection = this.app.db.collection('user');

        let obj = {
            name: _.toString(_.get(user, 'name', '')),
            email: _.toLower(_.get(user, 'email', '')),
            password: _.get(user, 'password'),
            created: new Date(),
        };

        // Validate input payloads
        this.validateUser(obj, (err, user) => {

            if(err){
                return cb(err, null);
            }

            // Save user
            collection.insertOne(user, (err, info) => {
                if(err){
                    return cb(err, null);
                }

                return cb(null, user);

            })
        });

    }
}
module.exports = User;