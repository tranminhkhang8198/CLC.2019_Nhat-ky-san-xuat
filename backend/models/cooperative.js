/**
 * @ModelName cooperatives Hop tac xa
 * @field {String} name Ten
 * @field {String} foreignName Ten nuoc ngoai
 * @field {String} abbreviationName Ten viet tat
 * @field {String} logo Bieu tuong
 * @field {String} status Tinh Trang
 * @field {String} cooperativeID Ma so HTX
 * @field {String} tax Ma so thue
 * @field {String} surrgate Nguoi dai dien
 * @field {String} director Giam doc
 * @field {String} address Dia chi tru so
 * @field {String} phone So dien thoai
 * @filed {String} email email
 * @field {String} fax Dia chi fax
 * @field {String} website Dia chi Website
 * @field {String} representOffice Dia chi van phong dai dien
 * @field {Array} docs Tai lieu lien quan
 */
const _ = require("lodash");

class Cooperative {
	constructor(app) {
		this.app = app;
	}

	validateCooperative(cooperative, cb = () => { }) {
		const collection = this.app.db.collection("cooperatives");
		const validateions = {
			name: {
				errMessage: "Ten hop tac xa la bat buoc",
				doValidate: () => {
					const name = _.get(cooperative, "name", "");
					if (name && name.length > 0) {
						return true;
					}
					return false;
				}
			},
			foreignName: {
				errMessage: "Ten nuoc ngoai khong hop le",
				doValidate: () => {
					const foreignName = _.get(cooperative, "foreignName", "");
					return true;
				}
			},
			abbreviationName: {
				errMessage: "Ten viet tat khong hop le",
				doValidate: () => {
					const abbreviationName = _.get(
						cooperation,
						"abbreviationName",
						""
					);
					return true;
				}
			},
			logo: {
				errMessage: "Huy hieu khong hop le",
				doValidate: () => {
					const logo = _.get(cooperative, "logo", "");
					return true;
				}
			},
			status: {
				errMessage: "Trang thai khong hop le",
				doValidate: () => {
					const status = _.get(cooperative, "status", "");
					return true;
				}
			},
			cooperativeID: {
				errMessage: "Ma so HTX thieu hoac khong hop le",
				doValidate: () => {
					const cooperativeID = _.get(
						cooperative,
						"cooperativeID",
						""
					);
					if (cooperativeID && cooperativeID.length > 0) {
						return true;
					}
					return false;
				}
			},
			tax: {
				errMessage: "Ma so thue khong hop le",
				doValidate: () => {
					const tax = _.get(cooperative, "tax", "");
					return true;
				}
			},
			surrgate: {
				errMessage: "Ten nguoi dai dien thieu hoac khong hop le",
				doValidate: () => {
					const surrgate = _.get(cooperative, "surrgate", "");
					if (surrgate && surrgate.length > 0) {
						return true;
					}
					return false;
				}
			},
			director: {
				errMessage: "Ten giam doc thieu hoac khong hop le",
				doValidate: () => {
					const director = _.get(cooperative, "director", "");
					if (director && director.length > 0) {
						return true;
					}
					return false;
				}
			},
			address: {
				errMessage: "dia chi khong hop le",
				doValidate: () => {
					const address = _.get(cooperative, "address", "");
					return true;
				}
			},
			phone: {
				errMessage: "So dien thoai khong hop le",
				doValidate: () => {
					const phone = _.get(cooperative, "phone", "");
					return true;
				}
			},

			emai: {
				errMessage: "Dia chi email khong hop le",
				doValidate: () => {
					const email = _.get(cooperative, "email", "");
					return true;
				}
			},
			fax: {
				errMessage: "Dia chi fax khong hop le",
				doValidate: () => {
					const fax = _.get(cooperative, "fax", "");
					return true;
				}
			},
			website: {
				errMessage: "Website khong hop le",
				doValidate: () => {
					const website = _.get(cooperative, "website", "");
					return true;
				}
			},
			representOffice: {
				errMessage: "Van phong dai dien khong hop le",
				doValidate: () => {
					const representOffice = _.get(
						cooperative,
						"representOffice",
						""
					);
					return true;
				}
			},
			docs: {
				errMessage: "Danh sach tai lieu khong hop le",
				doValidate: () => {
					const docs = _.get(cooperative, "docs", "");
					return true;
				}
			}
		};

		const errors = [];
		eval
		_.each(validateions, (validation, field) => {
			const isValid = validation.doValidate
			if (!isValid) {
				errors.push(validation.errMessage)
			}
		})
		if (errors.length) {
			const err = _.join(errors, ',');
			return cb({ errMessage: err }, null);
		} else {
			// Find in database for sure that HTX ID does not exist in database
			const query = {
				cooperativeID: cooperative.cooperativeID
			};
			const options = {

			};

			collection.findOne(query, (err, result) => {
				if (err) {
					return cb({ errorMessage: "Query error" }, null)
				}
				if (result) {
					return cb({ errorMessage: "HTX da ton tai trong csdl" })
				} else {
					return cb(null, cooperative);
				}

			})
		}
	}
	create(cooperative, cb = () => { }) {
		const collection = this.app.db.collection('cooperatives')
		const obj = {
			name: _.get(cooperative, 'name', ''),
			foreignName: _.get(cooperative, 'foreignName', ''),
			abbreviationName: _.get(cooperative, 'abbreviationName', ''),
			logo: _.get(cooperative, 'logo', ''),
			status: _.get(cooperative, 'status', ''),
			cooperativeID: _.get(cooperative, 'cooperativeID', ''),
			tax: _.get(cooperative, 'tax', ''),
			surrgate: _.get(cooperative, 'surrgate', ''),
			director: _.get(cooperative, 'director', ''),
			address: _.get(cooperative, 'address', ''),
			phone: _.get(cooperative, 'phone', ''),
			fax: _.get(cooperative, 'fax', ''),
			website: _.get(cooperative, 'website', ''),
			representOffice: _.get(cooperative, 'representOffice', ''),
			docs: _.get(cooperative, 'docs', null)
		}
		this.validateCooperative(obj, (err, ValidCooperative) => {
			if (err) {
				return cb(err, null);
			} else {
				collection.insertOne(obj, (err, result) => {
					if (err) {
						return cb({ errMessage: "Loi trong qua trinh them du lieu vao database" }, null);
					}
					else {
						return cb(null, ValidCooperative);
					}
				})
			}
		});
	}
}
module.exports = Cooperative;
