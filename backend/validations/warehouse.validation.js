const mongodb = require("mongodb");
const _ = require("lodash");
const validator = require("validator");

const catchAsync = require("../utils/catchAsync");

const isExistProduct = async (Collection, id) => {
  try {
    const product = await Collection.findOne({ _id: mongodb.ObjectID(id) });

    return product;
  } catch (err) {
    console.log(err);
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

const validateProductId = async (errors, db, id, type) => {
  if (!mongodb.ObjectID.isValid(id)) {
    return errors.push({
      message: "Id sản phẩm không hợp lệ."
    });
  }

  if (isValidProductType(type)) {
    const collections = {
      "Thuốc bvtv": "plantProtectionProduct",
      "Phân bón": "fertilizer",
      Giống: "cultivars"
    };

    const Collection = db.collection(collections[type]);

    const isExist = await isExistProduct(Collection, id);

    if (!isExist) {
      return errors.push({
        message: "Sản phẩm không tồn tại trong danh mục."
      });
    }
  }
};

const validatePrice = (errors, price) => {
  const reg = /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/;

  if (!reg.test(price)) {
    return errors.push({
      message: "Giá phải là số lớn hơn 0."
    });
  }
};

const validateQuantity = async (errors, quantity) => {
  const reg = /^[1-9]\d*$/;

  if (!reg.test(quantity)) {
    return errors.push({
      message: "Số lượng mượn phải là số nguyên dương lớn hơn 0."
    });
  }
};

exports.validateBeforeCreate = catchAsync(async (req, res, next) => {
  const { models, db } = req.app;

  const {
    productId,
    productType,
    price,
    quantity,
    goodReceiptId,
    cooperativeId
  } = req.body;

  const errors = [];
  const messages = [];

  // Validate productType
  if (productType == null) {
    errors.push({
      message: "Vui lòng nhập loại sản phẩm."
    });
  } else {
    validateProductType(errors, productType);
  }

  // validate productId
  if (productId == null) {
    errors.push({
      message: "Vui lòng nhập id sản phẩm."
    });
  } else {
    await validateProductId(errors, db, productId, productType);
  }

  // Validate price
  if (price) {
    validatePrice(errors, price);
  }

  // Validate quantity
  if (quantity == null) {
    errors.push({
      message: "Vui lòng nhập số lượng nhập kho."
    });
  } else {
    validateQuantity(errors, quantity);
  }

  // Validate goodsReceipt

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
