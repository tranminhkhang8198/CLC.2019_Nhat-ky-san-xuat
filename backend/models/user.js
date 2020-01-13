

const _ = require('lodash');
const { OrderedMap } = require('immutable');
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb')

const salt = 10;

class User {

    constructor(app) {
        this.app = app;
        this.users = new OrderedMap();
    }

    /**
     * Load user info with id
     * @param {string} id 
     * @param {callback function} cb 
     * @returns {user object}
     */
    load(id, cb = () => { }) {

        id = _.toString(id)
        // Find user in cache
        const userInCache = this.users.get(id);

        if (userInCache) {
            return cb(null, userInCache);
        }

        // Find in data base
        const userId = new ObjectID(id);

        this.app.db.collection('user').find({ _id: userId }).limit(1).toArray((err, result) => {

            if (err || !_.get(result, '[0]')) {
                cb("User is not found", null)
            }
            else {
                cb(null, _.get(result, '[0]'))
            }
        })

    }


    /**
     * Save user to cache
     * @param {string} id 
     * @param {user object} user 
     */
    saveUserToCache(id, user) {
        if (typeof id === 'string') {
            id = new ObjectID(id);
        }
        this.users = this.users.set(id, user);
    }

    /**
     * Validate User infor before add to database
     * @param {user object} user 
     * @param {callback function} cb
     * @returns {cb(err, user)} 
     */
    validateUser(user, cb = () => { }) {

        const collection = this.app.db.collection('user');
        const validations = {
            name: {
                errorMessage: "Name is required",
                doValidate: () => {

                    const name = _.get(user, 'name', '');
                    if (name && name.length) {
                        return true;
                    }
                    return false;
                }
            },
            avatar: {
                errorMessage: "Logo không hợp lệ",
                doValidate: () => {
                    const logo = _.get(user, 'logo', '');
                    return true
                }
            },
            personalId: {
                errorMessage: "Personal id is invalid",
                doValidate: () => {
                    const personalId = _.get(user, 'personalId', '');
                    if (personalId && personalId.length >= 9) {
                        return true;
                    }
                    return false;
                }
            },
            address: {
                errorMessage: "Address is in valid",
                doValidate: () => {

                    return true;
                }
            },
            phone: {
                errorMessage: "Phone number is reqired",
                doValidate: () => {
                    const phone = _.get(user, 'phone', '');
                    if (phone && phone.length) {
                        return true;
                    }
                    return false;
                }
            },
            email: {
                errorMessage: "Email is not valid",
                doValidate: () => {

                    const email = _.get(user, 'email', '');
                    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return emailRegex.test(email)
                }
            },
            user: {
                errorMessage: "User type is in valid",
                doValidate: () => {

                    return true;
                }
            },
            HTXId: {
                errorMessage: "HTX ID is invalid",
                doValidate: () => {

                    return true;
                }
            },

            password: {
                errorMessage: "Passsword is required and more than 3 characters",
                doValidate: () => {

                    const password = _.get(user, 'password', '');
                    if (password && password.length >= 3) {
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
            if (!isValid) {

                const errorMessage = validation.errorMessage;
                errors.push(errorMessage);

            }

        });
        if (errors.length) {
            const err = _.join(errors, ',');
            return cb(err, user);
        } else {

            //find in database make sure this phone number is not exits.
            const phone = _.get(user, 'phone', '');
            collection.findOne({ phone: { $eq: phone } }, (err, result) => {

                if (err || result) {
                    return cb("Phone number already exist");
                }
                const password = _.get(user, 'password');

                return cb(null, user);
            });
        }
    }


    /**
     * Create new user and save to database
     * @param {user object} user 
     * @param {callback function} cb
     * @returns {cb(err, user)} 
     */
    create(user = {}, cb = () => { }) {

        const collection = this.app.db.collection('user');
        const avatar = user.avatar;
        let obj = {
            name: _.toString(_.get(user, 'name', '')),
            avatar: _.toString(_.get(user, 'avatar', '')),
            personalId: _.toString(_.get(user, 'personalId')),
            address: _.toString(_.get(user, 'address')),
            phone: _.toString(_.get(user, 'phone')),
            email: _.trim(_.toLower(_.get(user, 'email', ''))),
            user: _.get(user, 'user', 'user'),
            HTXId: _.get(user, 'HTXId', ''),
            password: _.get(user, 'password'),
            created: new Date(),
        };

        // Validate input payloads
        this.validateUser(obj, (err, user) => {

            if (err) {
                return cb(err, null);
            }

            // Encrypt password
            user.password = bcrypt.hashSync(user.password, salt);

            // Save user to database
            collection.insertOne(user, (err, info) => {
                if (err) {
                    return cb(err, null);
                }

                _.unset(user, 'password');
                return cb(null, user);

            })
        });

    }

    /**
     * Validate user account info
     * @param {user object} account 
     * @param {callback function} cb
     * @returns {cb(err, result)} 
     */
    validateLogin(account = {}, cb = () => { }) {

        const phone = _.get(account, 'phone', '');
        const password = _.get(account, 'password', '');

        if (!phone || !password || !phone.length || !password.length) {
            return cb("Phone and password are required", null);
        }
        else {
            return cb(null, account);
        }

    }

    /**
     * Login user account and create token
     * @param {user object} account 
     * @param {callback function} cb
     * @returns {cb(err, result)}
     */
    login(account = {}, cb = () => { }) {

        this.validateLogin(account, (err, account) => {
            if (err) {
                return cb(err, account);
            }
            else {
                // Check phone number in data base
                const phone = _.get(account, 'phone');
                const query = {
                    phone: `${phone}`
                };
                const options = {
                    projection: {
                        _id: true,
                        name: true,
                        address: false,
                        phone: true,
                        email: false,
                        roleId: false,
                        HTXId: false,
                        password: true,
                        created: true
                    }

                };
                this.app.db.collection('user').find(query).limit(1).toArray((err, result) => {
                    if (err || !_.get(result, '[0]')) {
                        return cb("User not found", null);
                    }
                    else {
                        const user = _.get(result, '[0]')
                        const plainPassword = account.password;
                        const conparePassword = user.password;
                        const passwordMatched = bcrypt.compareSync(plainPassword, conparePassword);
                        if (passwordMatched) {
                            // Add user to cache
                            const id = _.toString(user._id);
                            this.saveUserToCache(id, user);

                            // Create token
                            this.app.models.token.create(user, (err, tokenObj) => {

                                if (err) {
                                    return cb(err, null);
                                }
                                else {
                                    // _.unset(token,'userId')
                                    return cb(null, tokenObj);
                                }
                            });

                        }
                        else {
                            return cb("Wrong password", null);
                        }

                    }
                })
            }
        })
    }

    /**
     * Get all users info
     * @param {callback function} cb 
     * @returns {cb(err, result)}
     */
    get(userId, cb = () => { }) {
        const collection = this.app.db.collection('user');
        let query = {}
        if (userId != "all") {
            console.log(userId)
            let idObj
            try {
                idObj = new ObjectID(userId);
            } catch (err) {
                return cb({ err: "userId is invalid" }, null);
            }
            console.log(idObj);
            query = {
                "_id": idObj
            }
        };
        const options = {
            projection: {
                password: 0
            }
        }
        console.log(query)
        collection.find(query, options).toArray((err, result) => {
            if (err || !_.get(result, '[0]')) {
                console.log(err);
                console.log(result)
                return cb({ err: "Users are not found" }, null);
            }
            else {
                return cb(null, result);
            }
        })
    }
    validateUpdate(user) {


    }

    update(body, cb = () => { }) {
        const collection = this.app.db.collection('user');
        // Validate update info
        // TODO: Validate before update

        let query = body.query;
        let updateData = body.update;

        // Validate query
        if (query._id) {
            try {
                query._id = new ObjectID(query._id);
            } catch (error) {
                return cb({ errorMessage: "User id is invalid in query block" }, null);
            }
        }

        collection.updateMany(query, updateData, { returnNewDocument: true }, (err, result) => {
            if (err || result.result.nModified == 0) {
                console.log("err: ", err);
                return err ? cb({ errorMessage: "Failed while updating user" }, null) : cb({ errorMessage: "Nothing to update" }, null);
            }
            else {
                console.log("query result", result);
                return cb(null, { nModified: `${result.result.nModified}` });
            }
        })
    }

    /**
     * Get user workgroup from id
     * @param {string} userId 
     * @param {callback function} cb
     * @returns {(err, result)} 
     */
    workgroup(userId, cb = () => { }) {
        const collection = this.app.db.collection('user');

        collection.findOne({ "_id": new ObjectID(_.toString(userId)) }, (err, result) => {
            if (err) {
                return cb({ err: "error finding workgroup" }, null);
            }
            else {
                const workgroup = result.user;
                return cb(null, workgroup);
            }
        })

    }
    search(query, cb = () => { }) {

        this.collection = this.app.db.collection('user');
        const pageNumber = _.get(query, 'pageNumber', 0);
        const resultnumber = _.get(query, 'resultNumber', 0);

    }
}
module.exports = User;