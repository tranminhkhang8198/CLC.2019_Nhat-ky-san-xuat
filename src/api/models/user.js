const _ = require('lodash');
const {OrderedMap} = require('immutable');
const bcrypt = require('bcrypt');
const {ObjectID} = require('mongodb')

const salt = 10;

class User{

    constructor(app){
        this.app = app;
        this.users = new OrderedMap();
    }

    load(id, cb = () => {}){

        id = _.toString(id)
        // Find user in cache
        const userInCache = this.users.get(id);

        if(userInCache){
            return cb(null, userInCache);
        }

        // Find in data base
        console.log("sdfsdfsfffffffffffffffffff",id);
        const userId = new ObjectID(id);

        this.app.db.collection('user').find({_id: userId}).limit(1).toArray((err, result) => {

            if(err || !_.get(result, '[0]')){
                cb("User is not found", null)
            }
            else{
                cb(null, _.get(result, '[0]'))
            }
        })

    }


    saveUserToCache(id, user){
        if (typeof id === 'string'){
            id = new ObjectID(id);
        }
        this.users = this.users.set(id, user);
    }
    /**
     * Validate User infor before add to database
     * @param {*} user 
     * @param {*} cb
     * @returns {cb(err, user)} 
     */
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
            personalId:{
                errorMessage: "Personal id is invalid",
                doValidate: () => {

                    return true;
                }
            },
            address:{
                errorMessage: "Address is in valid",
                doValidate: () => {

                    return true;
                }
            },
            phone:{
                errorMessage: "Phone is reqired",
                doValidate: () => {
                    const phone = _.get(user, 'phone', '');
                    if (phone && phone.length){
                        return true;
                    }
                    return false;
                }
            },
            email:{
                errorMessage: "Email is not valid",
                doValidate: () => {
                    
                    const email = _.get(user, 'email', '');
                    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return emailRegex.test(email)
                }
            },
            roleId:{
                errorMessage: "Role ID is in valid",
                doValidate: () => {

                    return true;
                }
            },
            HTXId:{
                errorMessage: "HTX ID is invalid",
                doValidate: () =>{

                    return true;
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
            const phone = _.get(user, 'phone', '');
            collection.findOne({phone: {$eq: phone}}, (err, result) =>{

                console.log("Finding phone number in database with result: ", err, result);
                if(err || result){
                    return cb("Phone number already exist");
                }
                const password = _.get(user, 'password');

                return cb(null, user);
            });
        }
    }
    

    /**
     * Create new user
     * @param {*} user 
     * @param {*} cb 
     */
    create(user = {}, cb = () =>{}){
        
        const collection = this.app.db.collection('user');

        let obj = {
            name: _.toString(_.get(user, 'name', '')),
            personalId: _.toString(_.get(user, 'personalId')),
            address: _.toString(_.get(user, 'address')),
            phone: _.toString(_.get(user, 'phone')),
            email: _.trim(_.toLower(_.get(user, 'email', ''))),
            roleId: _.get(user, 'roleId'),
            HTXId: _.get(user,'HTXId'),
            password: _.get(user, 'password'),
            created: new Date(),
        };

        // Validate input payloads
        this.validateUser(obj, (err, user) => {

            if(err){
                return cb(err, null);
            }

            // Encrypt password
            user.password = bcrypt.hashSync(user.password,salt);

            // Save user to database
            collection.insertOne(user, (err, info) => {
                if(err){
                    return cb(err, null);
                }

                _.unset(user, 'password');
                return cb(null, user);

            })
        });

    }

    validateLogin(account = {}, cb = () => {}){

        const phone = _.get(account, 'phone', '');
        const password = _.get(account, 'password','');

        if(!phone || !password|| !phone.length||!password.length){
            return cb("Phone and password are required", null);
        }
        else{
            return cb(null, account);
        }

    }
    
    login(account= {}, cb = () => {} ){

        this.validateLogin(account, (err, account) => {
            if(err){
                return cb(err, account);
            }
            else{
                // Check phone number in data base
                const phone = _.get(account, 'phone');
                const query = {
                    phone: `${phone}`
                };
                const options = {
                    _id: true,
                    name: true,
                    address: false,
                    phone: true,
                    email: false,
                    roleId: false,
                    HTXId: false,
                    password: true,
                    created: true
                };
                this.app.db.collection('user').find(query, options).limit(1).toArray((err, result) => {
                    if(err || !_.get(result,'[0]')){
                        return cb("User not found", null);
                    }
                    else{
                        const user = _.get(result,'[0]')
                        const plainPassword = account.password;
                        const conparePassword = user.password;
                        const passwordMatched = bcrypt.compareSync(plainPassword, conparePassword);
                        if (passwordMatched){
                            // Add user to cache
                            const id = _.toString(user._id);
                            this.saveUserToCache(id, user);

                            // Create token
                            this.app.models.token.create(user._id, (err, token) => {

                                if(err){
                                    return cb(err, null);
                                }
                                else{
                                    token.user = user;
                                    return cb(null, token)
                                }
                            });

                        }
                        else{
                            return cb("Wrong password", null);
                        }
                        
                    }
                })
            }
        })
    }
}
module.exports = User;