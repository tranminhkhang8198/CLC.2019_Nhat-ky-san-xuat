const mongodb = require("mongodb");
const _ = require("lodash");
const validator = require("validator");

const catchAsync = require("../utils/catchAsync");

exports.validateParamId = (req, res, next) => {
  if (!mongodb.ObjectID.isValid(req.params.id)) {
    return res.status(400).json({
      errorMessage: "Id không hợp lệ"
    });
  }

  next();
};

const validateCooperativeId = async (errors, db, id) => {
  try {
    const Cooperative = db.collection("cooperatives");

    const cooperative = await Cooperative.findOne({
      cooperativeID: id
    });

    if (!cooperative) {
      return errors.push({
        message: "Hợp tác xã không tồn tại."
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const validateGoodsReceiptId = async (errors, db, id) => {
  if (!mongodb.ObjectID.isValid(id)) {
    return errors.push({
      message: "Id hoá đơn nhập không hợp lệ."
    });
  }

  try {
    const GoodsReceiptId = db.collection("goodsReceipts");

    const goodsReceiptId = await GoodsReceiptId.findOne({
      _id: mongodb.ObjectID(id)
    });

    if (!goodsReceiptId) {
      return errors.push({
        message: "Hoá đơn nhập không tồn tại."
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const validateReceiverId = async (errors, db, id) => {
  if (!mongodb.ObjectID.isValid(id)) {
    errors.push({
      message: "Id người nhận không hợp lệ."
    });
  } else {
    try {
      const User = db.collection("user");
      const user = await User.findOne({ _id: mongodb.ObjectID(id) });

      if (!user) {
        errors.push({
          message: `Người nhận không tồn tại.`
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const isValidProductType = type => {
  const allowedType = ["Thuốc bvtv", "Phân bón", "Giống"];

  return allowedType.includes(type);
};

const validateProductType = (errors, type) => {
  if (!isValidProductType(type)) {
    return errors.push({
      message:
        'Loại sản phẩm phải là 1 trong 3 loại "Thuốc bvtv", "Phân bón", "Giống".'
    });
  }
};

const validateQuantity = async (
  errors,
  models,
  productId,
  cooperativeId,
  quantity
) => {
  const reg = /^[1-9]\d*$/;

  if (!reg.test(quantity)) {
    return errors.push({
      message: "Số lượng mượn phải là số nguyên dương lớn hơn 0."
    });
  }

  const warehouse = await models.warehouse.isExist(productId, cooperativeId);

  if (warehouse) {
    if (parseInt(quantity) > parseInt(warehouse.quantity)) {
      errors.push({
        message: "Số lượng xuất kho không thể lớn hơn số lượng hiện có."
      });
    }
  }
};

const validateIssuedDate = (errors, date) => {
  if (!validator.isISO8601(date)) {
    errors.push({
      message: "Định dạng ngày mượn không hợp lệ."
    });
  }
};

exports.validateBeforeCreate = catchAsync(async (req, res, next) => {
  const { models, db } = req.app;

  const {
    productId,
    receiverId,
    productType,
    quantity,
    issuedDate,
    receivedDate,
    goodsReceiptId,
    cooperativeId,
    note
  } = req.body;

  let errors = [];
  let messages = [];

  // Validate receiverId
  if (!receiverId) {
    errors.push({
      message: "Vui lòng nhập id người nhận."
    });
  } else {
    await validateReceiverId(errors, db, receiverId);
  }

  // Validate productType
  if (productType == null) {
    errors.push({
      message: "Vui lòng nhập loại sản phẩm."
    });
  } else {
    validateProductType(errors, productType);
  }

  // Validate quantity
  if (quantity == null) {
    errors.push({
      message: "Vui lòng nhập số lượng nhập kho."
    });
  } else {
    validateQuantity(errors, models, productId, cooperativeId, quantity);
  }

  if (!issuedDate) {
    errors.push({
      message: "Vui lòng nhập ngày xuất kho."
    });
  } else {
    validateIssuedDate(errors, issuedDate);
  }

  if (!goodsReceiptId) {
    errors.push({
      errorMessage: "Vui lòng nhập id hoá đơn nhập."
    });
  } else {
    await validateGoodsReceiptId(errors, db, goodsReceiptId);
  }

  // Validate cooperativeId
  if (cooperativeId == null) {
    errors.push({
      message: "Vui lòng nhập id hợp tác xã."
    });
  } else {
    await validateCooperativeId(errors, db, cooperativeId);
  }

  if (errors.length > 0) {
    _.each(errors, err => {
      messages.push(err.message);
    });

    const errorMessage = _.join(messages, "; ");

    return res.status(400).json({
      errorMessage
    });
  }

  next();
});
