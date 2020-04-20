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

    try {
      const Collection = db.collection(collections[type]);

      const isExist = await isExistProduct(Collection, id);

      if (!isExist) {
        return errors.push({
          message: "Sản phẩm không tồn tại trong danh mục."
        });
      }
    } catch (err) {
      console.log(err);
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

exports.validateParamId = (req, res, next) => {
  if (!mongodb.ObjectID.isValid(req.params.id)) {
    return res.status(400).json({
      errorMessage: "Id không hợp lệ sản phẩm không hợp lệ."
    });
  }

  next();
};

exports.validateBeforeCreate = catchAsync(async (req, res, next) => {
  const { models, db } = req.app;

  const {
    productId,
    productType,
    price,
    quantity,
    patchCode,
    goodsReceiptId,
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

  // Validate goodsReceiptId
  if (goodsReceiptId == null) {
    errors.push({
      message: "Vui lòng nhập id hoá đơn nhập."
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

  // Validate patchCode
  if (patchCode == null) {
    errors.push({
      message: "Vui lòng nhập mã số lô."
    });
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

exports.validateBeforeUpdate = catchAsync(async (req, res, next) => {
  const { models, db } = req.app;

  const {
    productId,
    productType,
    price,
    quantity,
    patchCode,
    goodsReceiptId,
    cooperativeId
  } = req.body;

  const errors = [];
  const messages = [];

  if (productId) {
    await validateProductId(errors, db, productId, productType);
  }

  if (price) {
    validatePrice(errors, price);
  }

  if (quantity) {
    validateQuantity(errors, quantity);
  }

  if (goodsReceiptId) {
    await validateGoodsReceiptId(errors, db, goodsReceiptId);
  }

  if (cooperativeId) {
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
