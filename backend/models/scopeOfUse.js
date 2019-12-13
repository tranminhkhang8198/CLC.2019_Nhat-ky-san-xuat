const _ = require("lodash");
const mongoose = require("mongoose");

class ScopeOfUSe {
    constructor(app) {
        this.app = app;
    }

    findAllProducts(query, cb = () => { }) {
        const scopeOfUse = this.app.db.collection("scopeOfUse");
        const plantProtectionProduct = this.app.db.collection("plantProtectionProduct");

        let responseToClient = [];

        scopeOfUse.aggregate([
            {
                $match: query
            },
            {
                $group: {
                    _id: "$pppId"
                }
            },
        ]).toArray((err, res) => {
            if (err) {
                return cb(err, null);
            }

            let count = 0;
            let length = res.length;

            res.forEach((doc) => {
                plantProtectionProduct.aggregate([
                    {
                        $match: {
                            _id: mongoose.Types.ObjectId(doc._id)
                        }
                    },
                    {
                        $project: {
                            name: 1
                        }
                    }
                ], (err, res) => {
                    if (err) {
                        return cb(err, null);
                    }

                    return cb(null, res);
                    // responseToClient.push(res[0]);

                    // count = count + 1;

                    // if (count == length) {
                    //     return cb(null, responseToClient);
                    // }
                });

            });
        });
    }

    // findPestByPlant(query, cb = () => { }) {
    //     const scopeOfUse = this.app.db.collection("scopeOfUse");

    //     scopeOfUse.aggregate([
    //         {
    //             $match: query
    //         },
    //         {
    //             $group: {
    //                 _id: "$pest"
    //             }
    //         }
    //     ]).toArray((err, res) => {
    //         if (err) {
    //             return cb(err, null);
    //         }

    //         return cb(null, res);
    //     });
    // }

    // findAllProductForPest(query, cb = () => { }) {
    //     const scopeOfUse = this.app.db.collection("scopeOfUse");

    //     scopeOfUse.aggregate([
    //         {
    //             $match: query
    //         },
    //         {
    //             $group: {
    //                 _id: "$pppId"
    //             }
    //         }
    //     ]).toArray((err, res) => {
    //         if (err) {
    //             return cb(err, null);
    //         }

    //         return cb(null, res);
    //     });
    // }
}

module.exports = ScopeOfUSe;