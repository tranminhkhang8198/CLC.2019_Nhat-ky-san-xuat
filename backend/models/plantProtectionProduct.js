const _ = require("lodash");
const mongoose = require("mongoose");

class PlantProtectionProduct {
  constructor(app) {
    this.app = app;
  }

  createRegistrationInfo(id, registrationInfo, cb = () => {}) {
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
      manufacturerAddress: _.get(registrationInfo, "manufacturerAddress", "")
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

  createScopeOfUse(id, scopeOfUses, cb = () => {}) {
    const collection = this.app.db.collection("scopeOfUses");

    let data = [];
    for (var scopeOfUse in scopeOfUses) {
      let obj = {
        id: id,
        plant: _.get(scopeOfUse, "plant", ""),
        pest: _.get(scopeOfUse, "pest", ""),
        dosage: _.get(scopeOfUse, "dosage", ""),
        phi: _.get(scopeOfUse, "phi", ""),
        usage: _.get(scopeOfUse, "usage", "")
      };

      data.push(obj);
    }

    // Save Scope Of Uses
    collection.insertMany(data, (err, res) => {
      if (err) {
        return cb(err, null);
      }

      console.log("Number of documents inserted: " + res.insertedCount);

      const scopeOfUses = res.ops;

      return cb(null, scopeOfUses);
    });
  }

  beforeCreate(plantProtectionProduct, cb = () => {}) {
    const collection = this.app.db.collection("plantProtectionProduct");
    let err = null;
    const reg = /^\d+$/;

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

      collection.findOne(
        {
          name: {
            $eq: name
          }
        },
        (err, result) => {
          if (err || result) {
            return cb(
              "Thuốc bảo vệ thực vật với tên '" + name + "' đã tồn tại."
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
    var response = {};

    let obj = {
      name: _.get(plantProtectionProduct, "name", ""),
      activeIngredients: _.get(plantProtectionProduct, "activeIngredients", ""),
      content: _.get(plantProtectionProduct, "content", ""),
      plantProtectionProductsGroup: _.get(
        plantProtectionProduct,
        "plantProtectionProductsGroup",
        ""
      ),
      ghs: _.get(plantProtectionProduct, "ghs", ""),
      who: _.get(plantProtectionProduct, "who", ""),
      created: new Date()
    };

    // Validate input payloads
    this.beforeCreate(obj, (err, plantProtectionProduct) => {
      if (err) {
        return cb(err, null);
      }
      // Save plant protection product to database
      collection.insertOne(plantProtectionProduct, (err, res) => {
        if (err) {
          return cb(err, null);
        }

        // Get plant protection product after created
        const pppId = res.insertedId;

        // Add plant protect product info to response
        response = res.ops[0];

        // Save registration info to database
        const registrationInfo = plantProtectionProduct.registrationInfo;

        console.log("someting");
        console.log(plantProtectionProduct);
        console.log("someting");

        this.createRegistrationInfo(
          pppId,
          registrationInfo,
          (err, registrationInfo) => {
            if (err) {
              return cb(err, null);
            }

            // Add registration info to response
            response["registrationInfo"] = registrationInfo;

            console.log(response);
            return cb(null, response);
          }
        );

        // // Save scope of use to database
        // const scopeOfUses = _.get(plantProtectionProduct, "scopeOfUses", []);
        // this.createScopeOfUse(pppId, scopeOfUses, (err, scopeOfUses) => {
        //   if (err) {
        //     return cb(err, null);
        //   }

        //   // Add scope of use to response
        //   response.push(scopeOfUses);
        // });
      });
    });
  }

  update(id, plantProtectionProduct = {}, cb = () => {}) {
    const collection = this.app.db.collection("plantProtectionProduct");

    let obj = {};

    for (var key in plantProtectionProduct) {
      obj[key] = plantProtectionProduct[key];
    }

    this.beforeUpdate(
      id,
      plantProtectionProduct,
      (err, plantProtectionProduct) => {
        if (err) {
          return cb(err, null);
        }

        // Update Plant Protection Product
        collection.findOneAndUpdate(
          {
            _id: mongoose.Types.ObjectId(id)
          },
          {
            $set: obj
          },
          {
            returnNewDocument: false
          },
          (err, info) => {
            if (err) {
              return cb(err, null);
            }
            return cb(null, fertilizer);
          }
        );
      }
    );
  }
}

module.exports = PlantProtectionProduct;
