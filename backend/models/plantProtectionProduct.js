const _ = require("lodash")
const mongoose = require("mongoose")

class PlantProtectionProduct {
    constructor(app) {
        this.app = app;
    }

    createScopeOfUse(registrationInfo, cb = () => {}) {
        const collection = this.app.db.collection("scopeOfUse");

        let obj = {
            registrationUint: _.get(registrationInfo, "registrationUint", ""),
            registrationUintAddress: _.get(registrationInfo, "registrationUintAddress", ""),
            manufacturer: _.get(registrationInfo, "manufacturer", ""),
            manufacturerAddress: _.get(registrationInfo, "manufacturerAddress", ""),
            created: new Date()
        };

        // Validate input payloads
        this.beforeCreate(obj, (err, registrationInfo) => {
            if (err) {
                return cb(err, null);
            }
            // Save registrationInfo
            collection.insertOne(registrationInfo, (err, info) => {
                if (err) {
                    return cb(err, null);
                }
                return cb(null, registrationInfo);
            });
        });
    }

    beforeCreate(plantProtectionProduct, cb = () => {}) {
        const collection = this.app.db.collection("plantProtectionProduct");
        let err = null;

        const validations = {
            name: {
                errorMessage: "Vui lòng nhập tên phân bón!",
                doValidate: () => {
                    const name = _.get(plantProtectionProduct, "name", "");

                    if (name && name.length) {
                        return true;
                    }
                    return false;
                }
            },
            ghs: {
                errorMessage: "GHS phải là số!",
                doValidate: () => {
                    const ghs = _.get(plantProtectionProduct, "ghs", "");

                    if (ghs != "") {
                        if (!isNaN(ghs)) {
                            return false
                        }
                    }
                    return true;
                }
            },
            who: {
                errorMessage: "WHO phải là số",
                doValidate: () => {
                    const who = _.get(plantProtectionProduct, "who", "");

                    if (who != "") {
                        if (!isNaN(who)) {
                            return false
                        }
                    }
                    return true;
                }
            }
        };

        let errors = [];
        _.each(validations, (validation, field) => {
            const isValid = validation.doValidate();
            if (!isValid) {
                const errorMessage = validation.errorMessage;
                errors.push(errorMessage);
            }
        });

        if (errors.length) {
            const err = _.join(errors, ", ");
            console.log("Validation finally is: ", err);
            return cb(err, plantProtectionProduct);
        } else {
            // CHECK IF PLANT PROTECTION PRODUCT EXISTS
            const name = _.get(plantProtectionProduct, "name", "");

            collection.findOne({
                    name: {
                        $eq: name
                    }
                },
                (err, result) => {
                    if (err || result) {
                        return cb(
                            "Plant protection product with name = ' " + name + "' already exist"
                        );
                    }

                    return cb(null, plantProtectionProduct);
                }
            );
        }
    }


    // FIND ALL PLANT PROTECTION PRODUCT IN DATABASE
    find(cb = () => {}) {
        const collection = this.app.db.collection("plantProtectionProduct");

        collection.find({}).toArray((err, plantProtectionProducts) => {
            if (err) {
                return cb(err, null);
            }

            return cb(null, plantProtectionProducts);
        });
    }

    // CREATE NEW PLANT PROTECTION PRODUCT
    create(plantProtectionProduct = {}, cb = () => {}) {
        const collection = this.app.db.collection("plantProtectionProduct");

        let obj = {
            name: _.get(plantProtectionProduct, "name", ""),
            activeIngredients: _.get(plantProtectionProduct, "activeIngredients", ""),
            content: _.get(plantProtectionProduct, "content", ""),
            plantProtectionProductsGroup: _.get(plantProtectionProduct, "plantProtectionProductsGroup", ""),
            ghs: _.get(plantProtectionProduct, "ghs", ""),
            who: _.get(plantProtectionProduct, "who", ""),
            created: new Date()
        };

        // Validate input payloads
        this.beforeCreate(obj, (err, plantProtectionProduct) => {
            if (err) {
                return cb(err, null);
            }
            // Save plantProtectionProduct
            collection.insertOne(plantProtectionProduct, (err, info) => {
                if (err) {
                    return cb(err, null);
                }
                return cb(null, plantProtectionProduct);
            });
        });
    }

    update(id, plantProtectionProduct = {}, cb = () => {}) {
        const collection = this.app.db.collection("plantProtectionProduct");

        let obj = {};

        for (var key in plantProtectionProduct) {
            obj[key] = plantProtectionProduct[key];
        }

        this.beforeUpdate(id, plantProtectionProduct, (err, plantProtectionProduct) => {
            if (err) {
                return cb(err, null);
            }

            // Update Plant Protection Product
            collection.findOneAndUpdate({
                    _id: mongoose.Types.ObjectId(id)
                }, {
                    $set: obj
                }, {
                    returnNewDocument: false
                },
                (err, info) => {
                    if (err) {
                        return cb(err, null);
                    }
                    return cb(null, fertilizer);
                }
            );
        });
    }
}

module.exports = PlantProtectionProduct;