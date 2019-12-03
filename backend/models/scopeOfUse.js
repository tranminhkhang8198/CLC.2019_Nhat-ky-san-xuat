const _ = require("lodash");
const mongoose = require("mongoose");

class ScopeOfUSe {
    constructor(app) {
        this.app = app;
    }

    findByQuery(query, cb = () => { }) {
        const scopeOfUse = this.app.db.collection("scopeOfUse");

        scopeOfUse.find(query).toArray((err, res) => {
            if (err) {
                return cb(err, null);
            }

            return cb(null, res);
        });
    }

    findPestByPlant(query, cb = () => { }) {
        const scopeOfUse = this.app.db.collection("scopeOfUse");

        scopeOfUse.aggregate([
            {
                $match: query
            },
            {
                $group: {
                    _id: "$pest"
                }
            }
        ]).toArray((err, res) => {
            if (err) {
                return cb(err, null);
            }

            return cb(null, res);
        });
    }

    findAllProductForPest(query, cb = () => { }) {
        const scopeOfUse = this.app.db.collection("scopeOfUse");

        scopeOfUse.aggregate([
            {
                $match: query
            },
            {
                $group: {
                    _id: "$pppId"
                }
            }
        ]).toArray((err, res) => {
            if (err) {
                return cb(err, null);
            }

            return cb(null, res);
        });
    }
}

module.exports = ScopeOfUSe;