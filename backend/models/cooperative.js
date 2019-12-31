/**
 * @collectionName cooperatives Hop tac xa
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
const { ObjectID } = require("mongodb");

class Cooperative {
	constructor(app) {
		this.app = app;
	}

	validate(cooperative, method, cb = () => { }) {
		console.log(cooperative);
		const collection = this.app.db.collection("cooperatives");
		const validatetions = {
			name: {
				errorMessage: "Ten hop tac xa la bat buoc",
				doValidate: () => {
					const name = _.get(cooperative, "name", "");
					console.log("name", name.length);
					if ((!name || name.length <= 0) && method == "post") {
						return false;
					}
					return true;
				}
			},
			foreignName: {
				errorMessage: "Ten nuoc ngoai khong hop le",
				doValidate: () => {
					const foreignName = _.get(cooperative, "foreignName", "");
					return true;
				}
			},
			abbreviationName: {
				errorMessage: "Ten viet tat khong hop le",
				doValidate: () => {
					const abbreviationName = _.get(
						cooperative,
						"abbreviationName",
						""
					);
					return true;
				}
			},
			logo: {
				errorMessage: "Huy hieu khong hop le",
				doValidate: () => {
					const logo = _.get(cooperative, "logo", "");
					return true;
				}
			},
			status: {
				errorMessage: "Trang thai khong hop le",
				doValidate: () => {
					const status = _.get(cooperative, "status", "");
					return true;
				}
			},
			cooperativeID: {
				errorMessage: "Ma so HTX thieu hoac khong hop le",
				doValidate: () => {
					const cooperativeID = _.get(
						cooperative,
						"cooperativeID",
						""
					);
					if ((!cooperativeID || cooperativeID.length <= 0) && method == "post") {
						return false;
					}
					return true;
				}
			},
			tax: {
				errorMessage: "Ma so thue khong hop le",
				doValidate: () => {
					const tax = _.get(cooperative, "tax", "");
					return true;
				}
			},
			surrgate: {
				errorMessage: "Ten nguoi dai dien thieu hoac khong hop le",
				doValidate: () => {
					const surrgate = _.get(cooperative, "surrgate", "");
					if ((!surrgate || surrgate.length <= 0) && method == "post") {
						return false;
					}
					return true;
				}
			},
			director: {
				errorMessage: "Ten giam doc thieu hoac khong hop le",
				doValidate: () => {
					const director = _.get(cooperative, "director", "");
					if ((!director || director.length <= 0) && method == "post") {
						return false;
					}
					return true;
				}
			},
			address: {
				errorMessage: "dia chi khong hop le",
				doValidate: () => {
					const address = _.get(cooperative, "address", "");
					return true;
				}
			},
			phone: {
				errorMessage: "So dien thoai khong hop le",
				doValidate: () => {
					const phone = _.get(cooperative, "phone", "");
					return true;
				}
			},

			emai: {
				errorMessage: "Dia chi email khong hop le",
				doValidate: () => {
					const email = _.get(cooperative, "email", "");
					return true;
				}
			},
			fax: {
				errorMessage: "Dia chi fax khong hop le",
				doValidate: () => {
					const fax = _.get(cooperative, "fax", "");
					return true;
				}
			},
			website: {
				errorMessage: "Website khong hop le",
				doValidate: () => {
					const website = _.get(cooperative, "website", "");
					return true;
				}
			},
			representOffice: {
				errorMessage: "Van phong dai dien khong hop le",
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
				errorMessage: "Danh sach tai lieu khong hop le",
				doValidate: () => {
					const docs = _.get(cooperative, "docs", "");
					return true;
				}
			}
		};

		const errors = [];
		_.each(validatetions, (validation, field) => {
			// console.log(field);
			const isValid = validation.doValidate();
			if (!isValid) {
				errors.push(validation.errorMessage)
			}
		})
		if (errors.length) {
			const err = _.join(errors, ',');
			return cb({ errorMessage: err }, null);
		} else {
			return cb(null, cooperative);
			// // Find in database for sure that HTX ID does not exist in database
			// const query = {
			// 	cooperativeID: cooperative.cooperativeID
			// };
			// const options = {

			// };

			// collection.findOne(query, (err, result) => {
			// 	if (err) {
			// 		return cb({ errorMessage: "Query error" }, null)
			// 	}
			// 	if (result) {
			// 		return cb({ errorMessage: "HTX da ton tai trong csdl" })
			// 	} else {
			// 		return cb(null, cooperative);
			// 	}

			// })
		}
	}
	isExist(cooperative, cb = () => { }) {
		const collection = this.app.db.collection('cooperatives');
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
	create(cooperative, cb = () => { }) {
		const method = "post";
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
		this.validate(obj, method, (err, ValidCooperative) => {
			if (err) {
				return cb(err, null);
			} else {
				this.isExist(ValidCooperative, (err, noneExistCooperative) => {

					if (err) {
						return cb({ errorMessage: err.errorMessage }, null);
					}
					else {
						collection.insertOne(obj, (err, result) => {
							if (err) {
								return cb({ errorMessage: "Lỗi cập nhật cơ sỡ dữ liệu", errorCode: 500 }, null);
							}
							else {
								return cb(null, noneExistCooperative);
							}
						})
					}
				})

			}
		});
	}

	search(params, cb = () => { }) {

		const collection = this.app.db.collection('cooperatives');
		const resultNumber = _.get(params, 'resultNumber', 0);
		const pageNumber = _.get(params, 'pageNumber', 0);
		_.unset(params, 'resultNumber');
		_.unset(params, 'pageNumber');
		let query = params;

		let _id = _.get(query, "_id", null);
		if (_id != null) {
			try {
				_id = new ObjectID(_id);
				_.set(query, '_id', _id);
			} catch (error) {
				return cb({ errorMessage: "ID không hợp lệ" });
			}

		}
		console.log(query, typeof (query._id));

		collection.find(query).limit(parseInt(resultNumber)).skip(pageNumber * resultNumber).toArray((err, result) => {
			if (err) {
				return cb({ errorMessage: "Loi trong qua trinh tim kiem" }, null);
			}
			else {
				return cb(null, result);
			}
		})
	}

	get(params, cb = () => { }) {

		const collection = this.app.db.collection('cooperatives');
		// const query = _.get(params, 'query', {});
		// const options = _.get(params, 'options', {});
		const resultNumber = _.get(params, 'resultNumber', 0);
		const pageNumber = _.get(params, 'pageNumber', 0);
		// var _id = _.get(query, "_id", null);
		// if (_id != null) {
		// 	try {
		// 		_id = new ObjectID(_id);
		// 		_.set(query, '_id', _id);
		// 	} catch (error) {
		// 		return cb({ errorMessage: "ID không hợp lệ" });
		// 	}

		// }
		collection.find().limit(parseInt(resultNumber)).skip(pageNumber * resultNumber).toArray((err, result) => {
			if (err || result.length == 0) {
				return err
					? cb({ errorMessage: "Loi trong qua trinh tim kiem", errorCode: 501 }, null)
					: cb({ errorMessage: "Khong tim thay du lieu", errorCode: 400 }, null);
			}
			else {
				return cb(null, result);
			}
		})
	}
	getAll(cb = () => { }) {

		const collection = this.app.db.collection('cooperatives');

		collection.find().toArray((err, result) => {
			if (err || result.length == 0) {
				return err
					? cb({ errorMessage: "Loi trong qua trinh tim kiem", errorCode: 501 }, null)
					: cb({ errorMessage: "Khong tim thay du lieu", errorCode: 400 }, null);
			}
			else {
				return cb(null, result);
			}
		})
	}

	delete(query, cb = () => { }) {
		const collection = this.app.db.collection('cooperatives');
		console.log(query);
		if (query === null || Object.getOwnPropertyNames(query).length === 0) {
			return cb({ errorMessage: "Tác vụ yêu cầu phải có điều kiện" }, null);
		}
		var _id = _.get(query, "_id", null);
		if (_id != null) {
			try {
				_id = new ObjectID(_id);
				_.set(query, '_id', _id);
			} catch (error) {
				return cb({ errorMessage: "ID khong hop le" }, null);
			}

		}

		collection.deleteMany(query, (err, result) => {
			if (err || result.result.n == 0) {
				return err ? cb({ errorMessage: "Lỗi trong qua trình xóa dữ liệu" }, null) : cb({
					errorMessage: "Dữ liệu không tồn tại"
				});
			}
			else {

				return cb(null, { successMessage: `Xóa thành công: ${result.result.n} dữ liệu` });
			}
		})




	}

	update(query, update, cb = () => { }) {
		const collection = this.app.db.collection('cooperatives');
		const method = "patch";
		var updateData = {
			$set: update
		};
		this.validate(update, method, (err, validUpdateObj) => {
			if (err) {
				return cb({ errorMessage: err.errorMessage }, null);
			}
			else {
				if (query._id) {
					try {
						_.set(query, '_id', new ObjectID(query._id));

					} catch (error) {
						return cb({ errorMessage: "ID khong hop le" }, null);
					}
				}

				collection.updateMany(query, updateData, { returnNewDocument: true }, (err, result) => {
					if (err || result.result.nModified == 0) {
						return err ? cb({ errorMessage: "Loi trong qua trinh cap nhat thong tin HTX" }, null) : cb({ errorMessage: "Nothing to update" }, null);
					}
					else {
						return cb(null, { successMessage: `Số lượng dữ liệu đã chỉnh sửa: ${result.result.nModified}` });
					}
				})
			}
		});

	}

	count(cb = () => { }) {
		const collection = this.app.db.collection('cooperatives');
		collection.find().count((err, result) => {
			if (err) {
				return cb({ errorMessage: "Lỗi trong quá trình truy xuất dữ liệu", errorCode: 500 }, null);
			}
			else {
				return cb(null, { total: result });
			}
		})
	}
}
module.exports = Cooperative;
