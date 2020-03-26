const path = require("path");
const mongodb = require("mongodb");
const fs = require("fs");

const filterObj = require("../utils/filterObj");
const catchAsync = require("../utils/catchAsync");

const getProductCollection = (db, type) => {
  const collections = {
    "Thuốc bvtv": "plantProtectionProduct",
    "Phân bón": "fertilizer",
    Giống: "cultivars"
  };

  const Collection = db.collection(collections[type]);

  return Collection;
};

exports.create = catchAsync(async (req, res, next) => {
  const { models } = req.app;

  const filterBody = filterObj(
    req.body,
    "productId",
    "productType",
    "price",
    "quantity",
    "goodsReceiptId",
    "cooperativeId"
  );

  const newWarehouse = await models.warehouse.create(filterBody);

  return res.status(201).json(newWarehouse);
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

  const warehouses = await models.warehouses.find(query);
  const paginatedWarehouses = warehouses.slice(start, end);

  const totalPages =
    (warehouses.length - (warehouses.length % nPerPage)) / nPerPage + 1;

  if (paginatedWarehouses.length == 0) {
    return res.status(404).json({
      errorMessage: "Trang tìm kiếm không tồn tại"
    });
  }

  for (warehouse of paginatedWarehouses) {
    borrowedTool.toolName = tool.name;
    borrowedTool.userBorrowedName = user.name;

    delete borrowedTool.toolId;
    delete borrowedTool.userBorrowedId;
  }

  return res.status(200).json({
    totalBorrowedTools: borrowedTools.length,
    totalPages,
    data: paginatedBorrowedTools
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const { db, models } = req.app;
  const id = req.params.id;

  const borrowedTool = await models.borrowedTool.findOne(id);

  const user = await getUserInfo(db, borrowedTool.userBorrowedId);
  const tool = await models.tool.findOne(borrowedTool.toolId);

  borrowedTool.toolName = tool.name;
  borrowedTool.userBorrowedName = user.name;

  delete borrowedTool.toolId;
  delete borrowedTool.userBorrowedId;

  if (!borrowedTool) {
    return res.status(404).json({
      errorMessage: `Không tìm thấy document.`
    });
  }

  return res.status(200).json(borrowedTool);
});

exports.update = catchAsync(async (req, res, next) => {
  const { models } = req.app;
  const id = req.params.id;

  const filterBody = filterObj(
    req.body,
    "toolId",
    "borrowedQuantity",
    "borrowedDate",
    "returnedDate",
    "image",
    "note",
    "userBorrowedId",
    "cooperativeId"
  );

  // check if image was posted
  if (req.files) {
    // Get file
    const file = req.files[Object.keys(req.files)[0]];

    const imgUrl = uploadImage(file);

    filterBody.image = imgUrl;

    // Remove old image
    const borrowedTool = await models.borrowedTool.findOne(id);

    if (borrowedTool.image != null) {
      removeImage(borrowedTool.image);
    }
  }

  const borrowedTool = await models.borrowedTool.update(id, filterBody);

  return res.status(200).json(borrowedTool.value);
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const { models } = req.app;
  const id = req.params.id;

  await models.borrowedTool.delete(id);

  return res.status(200).json({
    successMessage: "Document được xoá thành công."
  });
});

exports.returnTool = catchAsync(async (req, res, next) => {
  const { models } = req.app;
  const id = req.params.id;

  const filterBody = filterObj(req.body, "returnedDate");

  const borrowedTool = await models.borrowedTool.update(id, filterBody);

  await models.tool.increaseAvailable(
    borrowedTool.value.toolId,
    borrowedTool.value.borrowedQuantity
  );

  return res.status(200).json(borrowedTool.value);
});
