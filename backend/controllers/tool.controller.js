const path = require("path");
const mongodb = require("mongodb");
const fs = require("fs");

const filterObj = require("../utils/filterObj");
const catchAsync = require("../utils/catchAsync");

const uploadImage = file => {
  const filename = "image-" + Date.now();
  const extname = file.name.split(".").slice(-1)[0];
  const img = filename + "." + extname;

  file.mv(path.join(__dirname, "../images/tool/" + img));

  const host = "http://localhost:3001";
  const imgUrl = host + "/tool/" + img;

  return imgUrl;
};

const removeImage = imgUrl => {
  try {
    const filename = imgUrl.split("/").slice(-1)[0];

    const imgPath = path.join(__dirname, "../images/tool/" + filename);

    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.create = catchAsync(async (req, res, next) => {
  const { models } = req.app;

  const filterBody = filterObj(
    req.body,
    "name",
    "total",
    "available",
    "image",
    "cooperativeId",
    "note"
  );

  filterBody.name = filterBody.name.trim().replace(/\s\s+/g, " ");

  filterBody.available = filterBody.total;

  // check if image was posted
  if (req.files) {
    // Get file
    const file = req.files[Object.keys(req.files)[0]];

    const imgUrl = uploadImage(file);

    filterBody.image = imgUrl;
  }

  const newTool = await models.tool.create(filterBody);

  console.log(newTool);

  return res.status(201).json(newTool);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const { models } = req.app;
  const query = { ...req.query };

  const page = parseInt(query.pageNumber) || 1;
  const nPerPage = parseInt(query.nPerPage) || 99;

  const start = (page - 1) * nPerPage;
  const end = page * nPerPage;

  delete query.nPerPage;
  delete query.pageNumber;

  const tools = await models.tool.find(query);
  const paginatedTools = tools.slice(start, end);

  const totalPages = (tools.length - (tools.length % nPerPage)) / nPerPage + 1;

  if (paginatedTools.length == 0) {
    return res.status(404).json({
      errorMessage: "Trang tìm kiếm không tồn tại"
    });
  }

  return res.status(200).json({
    totalTools: tools.length,
    totalPages,
    data: paginatedTools
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const { models } = req.app;
  const id = req.params.id;

  if (!mongodb.ObjectID.isValid(id)) {
    return res.status(400).json({
      errorMessage: "Id không hợp lệ"
    });
  }

  const tool = await models.tool.findOne(id);

  if (!tool) {
    return res.status(404).json({
      errorMessage: `Dụng cụ với id = ${id} không tồn tại`
    });
  }

  return res.status(200).json(tool);
});

exports.update = catchAsync(async (req, res, next) => {
  const { models } = req.app;
  const id = req.params.id;

  const filterBody = filterObj(
    req.body,
    "name",
    "total",
    "available",
    "image",
    "cooperativeId",
    "note"
  );

  if (!mongodb.ObjectID.isValid(id)) {
    return res.status(400).json({
      errorMessage: "Id không hợp lệ"
    });
  }

  const isExist = await models.tool.isExist({ _id: mongodb.ObjectID(id) });

  if (!isExist) {
    return res.status(404).json({
      errorMessage: `Dụng cụ với id = ${id} không tồn tại`
    });
  }

  if (Object.keys(filterBody).length == 0) {
    return res.status(400).json({
      errorMessage: "Vui lòng nhập thông tin cần cập nhật"
    });
  }

  // clear redundant space
  if (filterBody.name) {
    filterBody.name = filterBody.name.trim().replace(/\s\s+/g, " ");
  }

  filterBody.available = parseInt(filterBody.available);

  // check if image was posted
  if (req.files) {
    // Get file
    const file = req.files[Object.keys(req.files)[0]];

    const imgUrl = uploadImage(file);

    filterBody.image = imgUrl;

    // Remove old image
    const tool = await models.tool.findOne(id);

    if (tool.image != null) {
      removeImage(tool.image);
    }
  }

  const tool = await models.tool.update(id, filterBody);

  return res.status(200).json(tool.value);
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const { models } = req.app;
  const id = req.params.id;

  if (!mongodb.ObjectID.isValid(id)) {
    return res.status(400).json({
      errorMessage: "Id không hợp lệ"
    });
  }

  const isExist = await models.tool.isExist({ _id: mongodb.ObjectID(id) });

  if (!isExist) {
    return res.status(404).json({
      errorMessage: `Dụng cụ với id = ${id} không tồn tại`
    });
  }

  await models.tool.delete(id);

  return res.status(200).json({
    successMessage: "Dụng cụ được xoá thành công"
  });
});
