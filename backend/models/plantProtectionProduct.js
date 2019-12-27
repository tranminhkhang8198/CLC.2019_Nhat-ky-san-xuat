const _ = require("lodash");
const mongoose = require("mongoose");

class PlantProtectionProduct {
    constructor(app) {
        this.app = app;
    }

    createRegistrationInfo(id, registrationInfo, cb = () => { }) {
        const collection = this.app.db.collection("registrationInfo");

        let obj = {
            pppId: id,
            registrationUnit: _.get(registrationInfo, "registrationUnit", ""),
            registrationUnitAddress: _.get(
                registrationInfo,
                "registrationUnitAddress",
                ""
            ),
            manufacturer: _.get(registrationInfo, "manufacturer", ""),
            manufacturerAddress: _.get(
                registrationInfo,
                "manufacturerAddress",
                ""
            ),
            created: new Date()
        };

        // Save Registration Information
        collection.insertOne(obj, (err, res) => {
            if (err) {
                return cb(err, null);
            }

            const registrationInfo = res.ops[0];

            return cb(null, registrationInfo);
        });
    }

    createScopeOfUse(id, scopeOfUse, cb = () => { }) {
        const collection = this.app.db.collection("scopeOfUse");

        let obj = [];
        for (var i in scopeOfUse) {
            let data = {
                pppId: id,
                plant: _.get(scopeOfUse[i], "plant", ""),
                pest: _.get(scopeOfUse[i], "pest", ""),
                dosage: _.get(scopeOfUse[i], "dosage", ""),
                phi: _.get(scopeOfUse[i], "phi", ""),
                usage: _.get(scopeOfUse[i], "usage", ""),
                created: new Date()
            };

            obj.push(data);
        }

        // Save Scope Of Uses
        collection.insertMany(obj, (err, res) => {
            if (err) {
                return cb(err, null);
            }
            // console.log("Number of documents inserted: " + res.insertedCount);
            const scopeOfUse = res.ops;
            return cb(null, scopeOfUse);
        });
    }

    beforeCreate(plantProtectionProduct, cb = () => { }) {
        const collection = this.app.db.collection("plantProtectionProduct");
        let err = null;
        const reg = /^\d+$/;

        const validations = {
            name: {
                errorMessage: "Vui lòng nhập tên thuốc bảo vệ thực vật!",
                doValidate: () => {
                    const name = _.get(plantProtectionProduct, "name", "");

                    if (name && name.length) {
                        return true;
                    }
                    return false;
                }
            },
            ghs: {
                errorMessage: "GHS phải là số",
                doValidate: () => {
                    const ghs = _.get(plantProtectionProduct, "ghs", "");

                    if (ghs != "") {
                        if (!reg.test(ghs)) {
                            return false;
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
                        if (!reg.test(who)) {
                            return false;
                        }
                    }
                    return true;
                }
            },
            phi: {
                errorMessage: "PHI phải là số",
                doValidate: () => {
                    for (var i in plantProtectionProduct.scopeOfUse) {
                        const phi = plantProtectionProduct.scopeOfUse[i].phi;
                        if (phi != "") {
                            if (!reg.test(phi)) {
                                return false;
                            }
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
            return cb(err, null);
        } else {
            // CHECK IF PLANT PROTECTION PRODUCT EXISTS
            const name = _.get(plantProtectionProduct, "name", "");

            collection.findOne(
                {
                    name: {
                        $eq: name
                    }
                },
                (err, result) => {
                    if (err || result) {
                        return cb(
                            "Thuốc bảo vệ thực vật với tên " +
                            name +
                            " đã tồn tại."
                        );
                    }

                    return cb(null, plantProtectionProduct);
                }
            );
        }
    }

    // FIND ALL PLANT PROTECTION PRODUCT IN DATABASE
    find(query = {}, cb = () => { }) {
        const plantProtectionProduct = this.app.db.collection("plantProtectionProduct");
        const scopeOfUse = this.app.db.collection("scopeOfUse");
        const registrationInfo = this.app.db.collection("registrationInfo");

        const pageNumber = query.pageNumber;
        const nPerPage = query.nPerPage;

        let responseToClient = {};

        plantProtectionProduct.find({}).count()
            .then(count => {
                const totalPages = ((count - (count % nPerPage)) / nPerPage) + 1;

                responseToClient["totalProducts"] = count;

                responseToClient["totalPages"] = totalPages;

                return plantProtectionProduct
                    .find()
                    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
                    .limit(Number(nPerPage))
                    .toArray()

            }).then(res => {
                let count = 0;
                let length = res.length;

                if (length == 0) {
                    const message = "Trang tìm kiếm không tồn tại";
                    return cb(message, null);
                }

                res.forEach(doc => {
                    const pppId = mongoose.Types.ObjectId(doc._id);

                    // Get Scope Of Use
                    scopeOfUse.find({ pppId: pppId }).toArray()
                        .then(res => {
                            // Add Scope Of Use To Response
                            doc["scopeOfUse"] = res;

                            // Get Registration Information
                            return registrationInfo.findOne({ pppId: pppId });

                        }).then(res => {
                            // Add Registration To Response
                            doc["registrationInfo"] = res;

                            // Add Complete Doc To Response
                            if (!responseToClient['data']) {
                                responseToClient['data'] = [];
                            }
                            responseToClient["data"].push(doc);

                            // Trigger To Return Response
                            count = count + 1;
                            if (count == length) {
                                return cb(null, responseToClient);
                            }
                        }).catch(err => {
                            return cb(err, null);
                        });
                });

            }).catch(err => {
                return cb(err, null);
            });
    }

    // FIND PLANT PROTECTION PRODUCT BY QUERY
    findByQuery(query, cb = () => { }) {
        const plantProtectionProduct = this.app.db.collection(
            "plantProtectionProduct"
        );
        const scopeOfUse = this.app.db.collection("scopeOfUse");
        const registrationInfo = this.app.db.collection("registrationInfo");

        let responseToClient = {};

        if (query._id) {
            try {
                query._id = mongoose.Types.ObjectId(query._id);
            } catch (err) {
                const message = {
                    errorMessage: 'Id không hợp lệ',
                    code: 500
                }
                return cb(message, null);
            }
        }

        plantProtectionProduct.findOne(query, (err, res) => {
            if (err) {
                throw err;
            }

            if (!res) {
                const message = {
                    errorMessage: "Không tìm thấy thuốc bảo vệ thực vật",
                    code: 404
                };

                return cb(message, null);
            }

            responseToClient = res;

            const pppId = mongoose.Types.ObjectId(res._id);

            // Get scope of use
            scopeOfUse.find({ pppId: pppId }).toArray((err, res) => {
                if (err) {
                    return cb(err, null);
                }
                // Add scope of use to response
                responseToClient["scopeOfUse"] = res;

                // Get registration information
                registrationInfo.findOne({ pppId: pppId }, (err, res) => {
                    if (err) {
                        return cb(err, null);
                    }

                    responseToClient["registrationInfo"] = res;

                    return cb(null, responseToClient);
                });
            });
        });
    }

    // CREATE NEW PLANT PROTECTION PRODUCT
    create(plantProtectionProduct = {}, cb = () => { }) {
        const collection = this.app.db.collection("plantProtectionProduct");
        var response = {};

        // Validate input payloads
        this.beforeCreate(
            plantProtectionProduct,
            (err, plantProtectionProduct) => {
                if (err) {
                    return cb(err, null);
                }

                let pppObj = {
                    name: _.get(plantProtectionProduct, "name", ""),
                    activeIngredient: _.get(
                        plantProtectionProduct,
                        "activeIngredient",
                        ""
                    ),
                    content: _.get(plantProtectionProduct, "content", ""),
                    plantProtectionProductGroup: _.get(
                        plantProtectionProduct,
                        "plantProtectionProductGroup",
                        ""
                    ),
                    ghs: _.get(plantProtectionProduct, "ghs", ""),
                    who: _.get(plantProtectionProduct, "who", ""),
                    created: new Date()
                };

                // Save plant protection product to database
                collection.insertOne(pppObj, (err, res) => {
                    if (err) {
                        return cb(err, null);
                    }

                    // Get plant protection product id after created
                    const pppId = res.insertedId;
                    // Add plant protect product info to response
                    response = res.ops[0];

                    // Save scope of use to database
                    const scopeOfUse = _.get(
                        plantProtectionProduct,
                        "scopeOfUse",
                        []
                    );
                    this.createScopeOfUse(
                        pppId,
                        scopeOfUse,
                        (err, scopeOfUse) => {
                            if (err) {
                                return cb(err, null);
                            }

                            // Add scope of use to response
                            response["scopeOfUse"] = scopeOfUse;
                        }
                    );

                    // Save registration info to database
                    const registrationInfo =
                        plantProtectionProduct.registrationInfo;

                    this.createRegistrationInfo(
                        pppId,
                        registrationInfo,
                        (err, registrationInfo) => {
                            if (err) {
                                return cb(err, null);
                            }

                            // Add registration info to response
                            response["registrationInfo"] = registrationInfo;

                            return cb(null, response);
                        }
                    );
                });
            }
        );
    }

    updateScopeOfUse(scopeOfUseId, update, cb = () => { }) {
        const scopeOfUse = this.app.db.collection("scopeOfUse");

        for (let key in update) {
            // process query for update
            let scopeOfUseQuery = {
                _id: scopeOfUseId
            };
            scopeOfUseQuery[key] = {
                $exists: true
            };

            // process field for update
            let scopeOfUseUpdate = {
                $set: {}
            };
            scopeOfUseUpdate.$set[key] = update[key];

            // Update scope of use
            scopeOfUse.update(scopeOfUseQuery, scopeOfUseUpdate, (err, res) => {
                if (err) {
                    return cb(err, null);
                }
            });
        }
    }

    updateRegistrationInfo(registrationInfoId, update, cb = () => { }) {
        const registrationInfo = this.app.db.collection("registrationInfo");

        for (let key in update) {
            // process query for update
            let registrationInfoQuery = {
                _id: registrationInfoId
            };
            registrationInfoQuery[key] = {
                $exists: true
            };

            // process field for update
            let registrationInfoUpdate = {
                $set: {}
            };
            registrationInfoUpdate.$set[key] = update[key];

            // Update scope of use
            registrationInfo.update(
                registrationInfoQuery,
                registrationInfoUpdate,
                (err, res) => {
                    if (err) {
                        return cb(err, null);
                    }
                }
            );
        }
    }

    updatePlantProtectionProduct(pppId, update, cb = () => { }) {
        const plantProtectionProduct = this.app.db.collection(
            "plantProtectionProduct"
        );

        for (let key in update) {
            // process query for update
            let plantProtectionProductQuery = {
                _id: pppId
            };
            plantProtectionProductQuery[key] = {
                $exists: true
            };

            // process field for update
            let plantProtectionProductUpdate = {
                $set: {}
            };
            plantProtectionProductUpdate.$set[key] = update[key];

            // Update scope of use
            plantProtectionProduct.update(
                plantProtectionProductQuery,
                plantProtectionProductUpdate,
                (err, res) => {
                    if (err) {
                        return cb(err, null);
                    }
                }
            );
        }
    }

    // UPDATE PLANT PROTECTION PRODUCT
    update(query, update = {}, cb = () => { }) {
        this.findByQuery(query, (err, res) => {
            if (err) {
                return cb(err, null);
            }

            // process for update scopeOfUse if was submitted
            if (update.scopeOfUse) {
                update.scopeOfUse.forEach(scopeOfUseElem => {
                    try {
                        const scopeOfUseId = mongoose.Types.ObjectId(
                            scopeOfUseElem._id
                        );

                        let scopeOfUseUpdate = {
                            ...scopeOfUseElem
                        };
                        delete scopeOfUseUpdate._id;
                        delete scopeOfUseUpdate.pppId;
    
                        this.updateScopeOfUse(scopeOfUseId, scopeOfUseUpdate);

                    } catch (err) {
                        return cb(err, null);
                    }
                });
            }

            // process for update scopeOfUse if was submitted
            if (update.registrationInfo) {
                if (update.registrationInfo._id) {
                    try {
                        const registrationInfoId = mongoose.Types.ObjectId(
                            update.registrationInfo._id
                        );

                        let registrationInfoUpdate = {
                            ...update.registrationInfo
                        };
                        delete registrationInfoUpdate._id;
                        delete registrationInfoUpdate.pppId;
    
                        this.updateRegistrationInfo(
                            registrationInfoId,
                            registrationInfoUpdate
                        );
                        
                    } catch (err) {
                        return cb(err, null);
                    }
                }
            }

            // remove field after update
            delete update.scopeOfUse;
            delete update.registrationInfo;

            // process update for plant protection product
            if (res._id) {
                const pppId = mongoose.Types.ObjectId(res._id);

                let pppUpdate = {
                    ...update
                };
                delete pppUpdate._id;

                this.updatePlantProtectionProduct(pppId, pppUpdate);
            }

            // response to client updated doc
            this.findByQuery(query, (err, res) => {
                if (err) {
                    return cb(err, null);
                }

                return cb(null, res);
            });
        });
    }

    // DELETE PLANT PROTECTION PRODUCT
    delete(query, cb = () => { }) {
        const plantProtectionProduct = this.app.db.collection(
            "plantProtectionProduct"
        );
        const scopeOfUse = this.app.db.collection("scopeOfUse");
        const registrationInfo = this.app.db.collection("registrationInfo");

        this.findByQuery(query, (err, res) => {
            if (err) {
                return cb(err, null);
            }

            const pppId = mongoose.Types.ObjectId(res._id);

            // Delete plant protection product
            plantProtectionProduct.deleteOne({ _id: pppId }, (err, res) => {
                if (err) {
                    return cb(err, null);
                }
            });

            // Delete scope of use
            res.scopeOfUse.forEach(scopeOfUseElem => {
                if (scopeOfUseElem._id) {
                    const scopeOfUseId = mongoose.Types.ObjectId(
                        scopeOfUseElem._id
                    );
                    scopeOfUse.deleteOne({ _id: scopeOfUseId }, (err, res) => {
                        if (err) {
                            return cb(err, null);
                        }
                    });
                }
            });

            // Delete registration info
            if (res.registrationInfo._id) {
                registrationInfo.deleteOne(
                    { _id: res.registrationInfo._id },
                    (err, res) => {
                        if (err) {
                            return cb(err, null);
                        }

                        const message = {
                            successMessage:
                                "Xóa thuốc bảo vệ thực vật thành công"
                        };
                        return cb(null, message);
                    }
                );
            }
        });
    }
}

module.exports = PlantProtectionProduct;
