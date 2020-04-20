const Joi = require("@hapi/joi");
const mongodb = require("mongodb");

const validateQuantity = (error, db, goodsReceiptInfo) => {
  const Warehouse = db.collection("warehouses");
  for (let goodsReceipt of goodsReceiptInfo) {
    const warehouse = Warehouse.findOne({
      "goodsReceipt.id": mongodb.ObjectID(goodsReceipt.id),
    });
    if (!warehouse) {
      error.push({
        message: `Hoá đơn nhập với id = ${id} không tồn tại.`,
      });
    } else {
      return error.push({
        message:
          "Số lượng xuất kho không thể lớn hơn số lượng hiện có trong kho.",
      });
    }
  }
};

exports.validateParamId = (req, res, next) => {
  if (!mongodb.ObjectID.isValid(req.params.id)) {
    return res.status(400).json({
      errorMessage: "Id không hợp lệ",
    });
  }

  next();
};

const joiGoodsIssueSchema = {
  goodsIssuePost: Joi.object({
    productId: Joi.required().messages({
      "any.required": "Vui lòng nhập id sản phẩm",
    }),
    productType: Joi.string()
      .required()
      .valid("Thuốc bvtv", "Phân bón", "Giống")
      .messages({
        "any.only": `Loại sản phẩm phải là một trong ba loại "Thuốc btvt", "Phân bón", "Giống"`,
        "any.required": "Vui lòng nhập loại sản phẩm",
      }),
    goodsReceiptInfo: Joi.object({
      goodsReceiptId: Joi.string(),
      quantity: Joi.number(),
    })
      .required()
      .messages({
        "any.required":
          "Vui lòng nhập thông tin hoá đơn nhập của sản phẩm cần xuất kho.",
      }),
  }),
};

exports.postValidator = async (req, res, next) => {
  let { error } = await joiGoodsIssueSchema.goodsIssuePost.validate(req.body, {
    abortEarly: false,
  });

  if (!error) {
    error = {};
    error.details = [];
  }

  // Validate diary id
  const productId = req.body.productId;
  if (productId) {
    await validateProductId(error.details, req, productId);
  }

  // Validate quantity
  if (goodsReceiptInfo) {
    await validateQuantity(error.details, db, goodsReceiptInfo);
  }

  if (error.details.length == 0) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join("; ");

    res.status(400).json({ errorMessage: message });
  }
};
