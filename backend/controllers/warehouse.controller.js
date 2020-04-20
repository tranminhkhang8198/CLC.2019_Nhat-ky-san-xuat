const path = require("path");
const mongodb = require("mongodb");
const fs = require("fs");

const filterObj = require("../utils/filterObj");
const catchAsync = require("../utils/catchAsync");

const getProductCollection = (db, type) => {
  const collections = {
    "Thuốc bvtv": "plantProtectionProduct",
    "Phân bón": "fertilizer",
    Giống: "cultivars",
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

const isExistWarehouseDoc = async (db, id) => {
  const warehouse = db
    .collection("warehouses")
    .findOne({ _id: mongodb.ObjectID(id) });

  return warehouse;
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
    "cooperativeId",
    "patchCode"
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

  const warehouses = await models.warehouse.find(query);
  const paginatedWarehouses = warehouses.slice(start, end);

  const totalPages =
    (warehouses.length - (warehouses.length % nPerPage)) / nPerPage + 1;

  if (paginatedWarehouses.length == 0) {
    return res.status(404).json({
      errorMessage: "Trang tìm kiếm không tồn tại",
    });
  }

  for (warehouse of paginatedWarehouses) {
    const product = await getProduct(
      db,
      warehouse.productType,
      warehouse.productId
    );

    if (!product) {
      warehouse.productName = "Không tìm thấy thông tin sản phẩm từ danh mục.";
    } else {
      warehouse.productName = product.name;
    }

    let quantity = 0;
    if (warehouse.goodsReceiptInfo.length > 0) {
      for (let goodReceipt of warehouse.goodsReceiptInfo) {
        quantity += goodReceipt.quantity;
      }

      warehouse.quantity = quantity;

      delete warehouse.goodsReceiptInfo;
    }
  }

  return res.status(200).json({
    totalWarehouseDocs: warehouses.length,
    totalPages,
    data: paginatedWarehouses,
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const { db, models } = req.app;
  const id = req.params.id;

  const warehouse = await models.warehouse.findOne(id);

  if (!warehouse) {
    return res.status(404).json({
      errorMessage: `Không tìm thấy document.`,
    });
  }

  const product = await getProduct(db, warehouse.productType, id);

  if (!product) {
    return res.status(404).json({
      errorMessage: "Không tìm thấy thông tin sản phẩm.",
    });
  }

  warehouse.productName = product.name;

  return res.status(200).json(warehouse);
});

exports.update = catchAsync(async (req, res, next) => {
  const { models } = req.app;
  const id = req.params.id;

  const warehouse = await models.warehouse.findOne(id);

  if (!warehouse) {
    return res.status(404).json({
      errorMessage: `Không tìm thấy document.`,
    });
  }

  const filterBody = filterObj(
    req.body,
    "productId",
    "productType",
    "price",
    "quantity",
    "goodsReceiptId",
    "cooperativeId",
    "patchCode"
  );

  const updatedWarehouse = await models.warehouse.update(id, filterBody);

  return res.status(200).json(updatedWarehouse.value);
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const { models, db } = req.app;
  const id = req.params.id;

  const warehouse = await isExistWarehouseDoc(db, id);

  if (!warehouse) {
    return res.status(404).json({
      errorMessage: "Không tìm thấy document.",
    });
  }

  await models.warehouse.delete(id);

  return res.status(200).json({
    successMessage: "Document được xoá thành công.",
  });
});
