const _ = require('lodash')

class User{

    constructor(app){
        this.app = app;
    }
    
    validateUser(user, cb = () => {}){

        const collection = this.app.db.collection('user');
        let err = null;
        const validations = {
            name:{
                errorMessage: "Name is required",
                doValidate: () =>{

                    const name = _.get(user, 'name', '');
                    if (name && name.length){
                        return true;
                    }
                    return false;
                }
            },
            email:{
                errorMessage: "Email is not valid",
                doValidate: () =>{
                    
                    const email = _.get(user, 'email', '');
                    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return emailRegex.test(email)
                }
            },
            password:{
                errorMessage: "Passsword is required and more than 3 characters",
                doValidate: () => {

                    const password = _.get(user, 'password','');
                    if(password && password.length>=3){
                        return true;
                    }
                    return false;
                }
            }
        }

        let errors = [];
        // return cb(err, user);
        _.each(validations, (validation, field) => {

            const isValid = validation.doValidate();
            if(!isValid){

                const errorMessage = validation.errorMessage;
                errors.push(errorMessage);

            }

        });
        if(errors.length){
            const err = _.join(errors, ',');
            console.log("Validation finally is: ", err);
            return cb(err, user);
        } else {

            //find in database make sure this email address is not exits.
            const email = _.get(user, 'email', '');
            collection.findOne({email: {$eq: email}}, (err, result) =>{

                console.log("Finding email in database with result: ", err, result);
                if(err || result){
                    return cb("Email already exist");
                }

                return cb(null, user);
            });
        }
    }
    
    create(user = {}, cb = () =>{}){
        
        const collection = this.app.db.collection('user');

        let obj = {
            name: _.toString(_.get(user, 'name', '')),
            email: _.trim(_.toLower(_.get(user, 'email', ''))),
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