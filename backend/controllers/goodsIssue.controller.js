const mongodb = require("mongodb");

const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");

const getUserInfo = async (db, id) => {
  try {
    const User = db.collection("user");

    const user = await User.findOne({ _id: mongodb.ObjectID(id) });

    return user;
  } catch (err) {
    console.log(err);
  }
};

const getProductCollection = (db, type) => {
  const collections = {
    "Thuốc bvtv": "plantProtectionProduct",
    "Phân bón": "fertilizer",
    Giống: "cultivars"
  };

  const Collection = db.collection(collections[type]);

  return Collection;
};

const getProduct = async (db, type, id) => {
  try {
    const Product = getProductCollection(db, type);

    const product = await Product.findOne({ _id: mongodb.ObjectID(id) });

    return product;
  } catch (err) {
    console.log(err);
  }
};

const isExist = async (db, id) => {
  const goodsIssue = db
    .collection("goodsIssues")
    .findOne({ _id: mongodb.ObjectID(id) });

  return goodsIssue;
};

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

exports.getAll = catchAsync(async (req, res, next) => {
  const { db, models } = req.app;
  const query = { ...req.query };

  const page = parseInt(query.pageNumber) || 1;
  const nPerPage = parseInt(query.nPerPage) || 99;

  const start = (page - 1) * nPerPage;
  const end = page * nPerPage;

  delete query.nPerPage;
  delete query.pageNumber;

  const goodsIssues = await models.goodsIssue.find(query);
  const paginatedGoodIssues = goodsIssues.slice(start, end);

  const totalPages =
    (goodsIssues.length - (goodsIssues.length % nPerPage)) / nPerPage + 1;

  if (paginatedGoodIssues.length == 0) {
    return res.status(404).json({
      errorMessage: "Trang tìm kiếm không tồn tại"
    });
  }

  for (goodsIssue of paginatedGoodIssues) {
    const product = await getProduct(
      db,
      goodsIssue.productType,
      goodsIssue.productId
    );

    if (!product) {
      goodsIssue.productName = "Không tìm thấy thông tin sản phẩm từ danh mục.";
    } else {
      goodsIssue.productName = product.name;
    }

    const user = await getUserInfo(db, goodsIssue.receiverId);

    if (user) {
      goodsIssue.receiverName = user.name;
    } else {
      goodsIssue.receiverName =
        "Không tìm thấy thông tin người dùng từ cơ sở dữ liệu.";
    }
  }

  return res.status(200).json({
    totalGoodsIssueDocs: goodsIssues.length,
    totalPages,
    data: paginatedGoodIssues
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const { db, models } = req.app;
  const id = req.params.id;

  const goodsIssue = await models.goodsIssue.findOne(id);

  if (!goodsIssue) {
    return res.status(404).json({
      errorMessage: `Không tìm thấy document.`
    });
  }

  const product = await getProduct(
    db,
    goodsIssue.productType,
    goodsIssue.productId
  );

  if (!product) {
    goodsIssue.productName = "Không tìm thấy thông tin sản phẩm từ danh mục.";
  } else {
    goodsIssue.productName = product.name;
  }

  const user = await getUserInfo(db, goodsIssue.receiverId);

  if (user) {
    goodsIssue.receiverName = user.name;
  } else {
    goodsIssue.receiverName =
      "Không tìm thấy thông tin người dùng từ cơ sở dữ liệu.";
  }

  return res.status(200).json(goodsIssue);
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const { models, db } = req.app;
  const id = req.params.id;

  const goodsIssue = await isExist(db, id);

  if (!goodsIssue) {
    return res.status(404).json({
      errorMessage: "Không tìm thấy document."
    });
  }

  await models.goodsIssue.delete(id);

  return res.status(200).json({
    successMessage: "Document được xoá thành công."
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { models } = req.app;
  const id = req.params.id;

  const goodsIssue = await models.goodsIssue.findOne(id);

  if (!goodsIssue) {
    return res.status(404).json({
      errorMessage: `Không tìm thấy document.`
    });
  }

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

  const updatedGoodsIssue = await models.goodsIssue.update(id, filterBody);

  return res.status(200).json(updatedGoodsIssue.value);
});
