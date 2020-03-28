const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");

exports.create = catchAsync(async (req, res, next) => {
  const { models, db } = req.app;

  const filterBody = filterObj(
    req.body,
    "receiverId",
    "productId",
    "productType",
    "quantity",
    "issuedDate",
    "receivedDate",
    "goodsReceiptId",
    "cooperativeId",
    "note"
  );

  // Check product exist in warehouse
  const isExistProductInWarehouse = await models.warehouse.isExist(
    filterBody.productId,
    filterBody.cooperativeId
  );

  if (!isExistProductInWarehouse) {
    return res.status(400).json({
      errorMessage: "Sản phẩm cần xuất kho không tồn tại."
    });
  }

  const warehouse = await models.warehouse.updateQuantity(
    filterBody.productId,
    filterBody.cooperativeId,
    -parseInt(filterBody.quantity)
  );

  if (!warehouse) {
    return res.status(500).json({
      errorMessage: "Lỗi trong quá trình cập nhật số lượng sản phẩm trong kho."
    });
  }

  const goodsIssue = await models.goodsIssue.create(filterBody);

  if (!goodsIssue) {
    return res.status(500).json({
      errorMessage: "Lỗi trong quá trình tạo hoá đơn xuất."
    });
  }

  return res.status(201).json(goodsIssue);
});
