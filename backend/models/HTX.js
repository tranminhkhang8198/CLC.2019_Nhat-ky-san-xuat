/**
 * @ModelName cooperatives Hop tac xa
 * @field {String} name Ten
 * @field {String} foreignName Ten nuoc ngoai
 * @field {String} abbreviationName Ten viet tat
 * @field {String} logo Bieu tuong
 * @field {String} Status Tinh Trang
 * @field {String} cooperrativeID Ma so HTX
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

	validateCooperative(cooperative, cb = () => {}) {
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
			cooperrativeID: {
				errMessage: "Ma so HTX thieu hoac khong hop le",
				doValidate: () => {
					const cooperrativeID = _.get(
						cooperative,
						"cooperativeID",
						""
					);
					if (cooperrativeID && cooperrativeID.length > 0) {
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

		errors = [];
		eval
		_.each(validateions, (validation, field)=>{
			if(!validation.doValidate){
				errors.
			}
		})
	}
}
module.exports = Cooperative;
