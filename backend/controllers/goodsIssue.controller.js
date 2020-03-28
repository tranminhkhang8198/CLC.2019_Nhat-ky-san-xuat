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

  const goodsIssue = await models.goodsIssue.create(filterBody);

  if (!goodsIssue) {
    return res.status(500).json({
      errorMessage: "Lỗi trong quá trình tạo hoá đơn xuất."
    });
  }

  return res.status(201).json(goodsIssue);
});
