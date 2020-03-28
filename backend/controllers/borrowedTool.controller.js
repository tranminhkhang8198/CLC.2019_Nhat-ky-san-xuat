const path = require("path");
const mongodb = require("mongodb");
const fs = require("fs");

const filterObj = require("../utils/filterObj");
const catchAsync = require("../utils/catchAsync");

const getUserInfo = async (db, id) => {
  try {
    const User = db.collection("user");

    const user = await User.findOne({ _id: mongodb.ObjectID(id) });

    return user;
  } catch (err) {
    console.log(err);
  }
};

const uploadImage = file => {
  const filename = "image-" + Date.now();
  const extname = file.name.split(".").slice(-1)[0];
  const img = filename + "." + extname;

  file.mv(path.join(__dirname, "../images/borrowedTool/" + img));

  const host = "http://localhost:3001";
  const imgUrl = host + "/borrowedTool/" + img;

  return imgUrl;
};

const removeImage = imgUrl => {
  try {
    const filename = imgUrl.split("/").slice(-1)[0];

    const imgPath = path.join(__dirname, "../images/borrowedTool/" + filename);

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
    "toolId",
    "borrowedQuantity",
    "borrowedDate",
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
  }

  const newBorrowedTool = await models.borrowedTool.create(filterBody);

  await models.tool.decreaseAvailable(
    filterBody.toolId,
    filterBody.borrowedQuantity
  );

  return res.status(201).json(newBorrowedTool);
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

  const borrowedTools = await models.borrowedTool.find(query);
  const paginatedBorrowedTools = borrowedTools.slice(start, end);

  const totalPages =
    (borrowedTools.length - (borrowedTools.length % nPerPage)) / nPerPage + 1;

  if (paginatedBorrowedTools.length == 0) {
    return res.status(404).json({
      errorMessage: "Trang tìm kiếm không tồn tại"
    });
  }

  for (borrowedTool of paginatedBorrowedTools) {
    const user = await getUserInfo(db, borrowedTool.userBorrowedId);
    const tool = await models.tool.findOne(borrowedTool.toolId);

    if (user) {
      borrowedTool.userBorrowedName = user.name;
    } else {
      borrowedTool.userBorrowedName =
        "Không tìm thấy thông tin người dùng từ cơ sở dữ liệu.";
    }

    if (tool) {
      borrowedTool.toolName = tool.name;
    } else {
      borrowedTool.toolName =
        "Không tìm thấy thông tin sản phẩm từ cơ sở dữ liệu.";
    }

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

  const borrowedTool = models.borrowedTool.findOne(id);

  if (!borrowedTool) {
    return res.status(404).json({
      errorMessage: `Không tìm thấy document.`
    });
  }

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

  const updatedBorrowedTool = await models.borrowedTool.update(id, filterBody);

  return res.status(200).json(updatedBorrowedTool.value);
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
