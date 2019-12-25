const _ = require("lodash");
const mongoose = require("mongoose");

class Fertilizer {
    constructor(app) {
        this.app = app;
    }

    beforeCreate(fertilizer, cb = () => { }) {
        const collection = this.app.db.collection("fertilizer");
        let err = null;
        const reg = /^\d+$/;

        const validations = {
            name: {
                errorMessage: "Vui lòng nhập tên phân bón!",
                doValidate: () => {
                    const name = _.get(fertilizer, "name", "");

                    if (name && name.length) {
                        return true;
                    }
                    return false;
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
            return cb(err, fertilizer);

        } else {
            // CHECK IF PLANT PROTECTION PRODUCT EXISTS
            const name = _.get(fertilizer, "name", "");

            collection.findOne({
                name: {
                    $eq: name
                }
            },
                (err, result) => {
                    if (err || result) {
                        const errorMessage = {
                            errorMessage: 'Phân bón với tên ' + name + ' đã tồn tại.'
                        }

                        return cb(errorMessage, null);
                    }

                    return cb(null, fertilizer);
                }
            );
        }
    }


    // CREATE NEW FERTILIZER
    create(fertilizer = {}, cb = () => { }) {
        const collection = this.app.db.collection("fertilizer");

        // Validate input payloads
        this.beforeCreate(fertilizer, (err, fertilizer) => {
            if (err) {
                return cb(err, null);
            }

            let fertilizerObj = {
                ministry: _.get(fertilizer, "ministry", ""),
                province: _.get(fertilizer, "province", ""),
                enterprise: _.get(fertilizer, "enterprise", ""),
                type: _.get(fertilizer, "type", ""),
                name: _.get(fertilizer, "name", ""),
                ingredient: _.get(fertilizer, "ingredient", ""),
                lawDocument: _.get(fertilizer, "ingredient", ""),
                isoCertOrganization: _.get(fertilizer, "isoCertOrganization", ""),
                manufactureAndImport: _.get(fertilizer, "manufactureAndImport", ""),
                created: new Date()
            };

            // Save plant protection product to database
            collection.insertOne(fertilizerObj, (err, res) => {
                if (err) {
                    return cb(err, null);
                }

                return cb(null, res.ops[0]);
            });
        });
    }


    // FIND ALL PLANT PROTECTION PRODUCT IN DATABASE
    find(query = {}, cb = () => { }) {
        const fertilizer = this.app.db.collection("fertilizer");

        const pageNumber = query.pageNumber;
        const nPerPage = query.nPerPage;

        let responseToClient = {};

        fertilizer.find().count()
            .then(count => {
                const totalPages = ((count - (count % nPerPage)) / nPerPage) + 1;

                responseToClient["totalProducts"] = count;

                responseToClient["totalPages"] = totalPages;

                return fertilizer
                    .find()
                    .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
                    .limit(Number(nPerPage))
                    .toArray()
            }).then(res => {
                let length = res.length;
                if (length == 0) {
                    const message = "Trang tìm kiếm không tồn tại";
                    return cb(message, null);
                }

                responseToClient["data"] = res;

                return cb(null, responseToClient);
            }).catch(err => {
                return cb(err, null);
            });
    }


    // FIND PLANT PROTECTION PRODUCT BY QUERY
    findByQuery(query, cb = () => { }) {
        const fertilizer = this.app.db.collection("fertilizer");

        if (query._id) {
            query._id = mongoose.Types.ObjectId(query._id);
        }

        fertilizer.findOne(query, (err, res) => {
            if (err) {
                throw err;
            }

            if (!res) {
                const errorMessage = "Không tìm thấy thuốc bảo vệ thực vật";
                return cb(errorMessage, null);
            }

            return cb(null, res);
        });
    }

    // DELETE FERTILIZER
    delete(query, cb = () => { }) {
        const fertilizer = this.app.db.collection("fertilizer");

        this.findByQuery(query, (err, res) => {
            if (err) {
                return cb(err, null);
            }

            const fertilizerId = mongoose.Types.ObjectId(res._id);

            // Delete fertilizer
            fertilizer.deleteOne({ _id: fertilizerId }, (err, res) => {
                if (err) {
                    return cb(err, null);
                }

                const successMessage = {
                    successMessage: "Xóa phân bón thành công"
                };
                return cb(null, successMessage);
            });
        });
    }

    update(query, update, cb = () => { }) {
        const fertilizer = this.app.db.collection('fertilizer');

        this.findByQuery(query, (err, res) => {
            if (err) {
                return cb(err, null);
            }

            for (let key in update) {
                // process query for update
                let fertilizerQuery = {
                    _id: res._id
                };
                fertilizerQuery[key] = {
                    $exists: true
                };

                // process field for update
                let fertilizerUpdate = {
                    $set: {}
                };
                fertilizerUpdate.$set[key] = update[key];

                // Update scope of use
                fertilizer.update(fertilizerQuery, fertilizerUpdate, (err, res) => {
                    if (err) {
                        return cb(err, null);
                    }
                });
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
}

module.exports = Fertilizer;