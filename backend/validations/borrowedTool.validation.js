const mongodb = require("mongodb");
const _ = require("lodash");
const validator = require("validator");

const catchAsync = require("../utils/catchAsync");

const checkFileType = filename => {
  if (!filename.match(/.(jpg|jpeg|png|gif)$/i)) return false;
  return true;
};

const validateImg = (files, errors) => {
  // Get file
  const file = files[Object.keys(files)[0]];

  if (!checkFileType(file.name)) {
    errors.push({
      message: "Định dạng hình ảnh khôn hợp lệ. Vui lòng chọn ảnh khác."
    });
  }
};

const validateToolId = async (errors, models, id) => {
  if (!mongodb.ObjectID.isValid(id))
    return errors.push({
      message: "Id dụng cụ cần mượn không hợp lệ."
    });

  try {
    const isExist = await models.tool.isExist({ _id: mongodb.ObjectID(id) });

    if (!isExist) {
      errors.push({
        message: `Dụng cụ cần mượn không tồn tại.`
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const validateBorrowedQuantity = async (errors, quantity, models, toolId) => {
  const reg = /^[1-9]\d*$/;

  if (!reg.test(quantity)) {
    return errors.push({
      message: "Số lượng mượn phải là số nguyên dương lớn hơn 0."
    });
  }

  const tool = await models.tool.findOne(toolId);

  if (parseInt(quantity) > tool.available) {
    errors.push({
      message: "Số lượng mượn lớn hơn số lượng hiện có. Vui lòng kiểm tra lại"
    });
  }
};

const validateBorrowedDate = (errors, date) => {
  if (!validator.isISO8601(date)) {
    errors.push({
      message: "Định dạng ngày mượn không hợp lệ."
    });
  }
};

const validateReturnedDate = async (errors, returnedDate, models, id) => {
  if (!validator.isISO8601(returnedDate)) {
    return errors.push({
      message: "Định dạng ngày trả không hợp lệ."
    });
  }
  returnedDate = Date.parse(returnedDate);

  const borrowedTool = await models.borrowedTool.findOne(id);

  if (borrowedTool) {
    const borrowedDate = Date.parse(borrowedTool.borrowedDate);

    if (parseInt(returnedDate) < parseInt(borrowedDate)) {
      errors.push({
        message: "Ngày trả không thể nhỏ hơn ngày mượn."
      });
    }
  }
};

const validateUserBorrowedId = async (req, errors, db, id) => {
  if (!mongodb.ObjectID.isValid(id)) {
    errors.push({
      message: "Id người mượn không hợp lệ."
    });
  } else {
    try {
      const User = db.collection("user");
      const user = await User.findOne({ _id: mongodb.ObjectID(id) });

      if (!user) {
        errors.push({
          message: `Người mượn không tồn tại.`
        });
      } else {
        req.body.cooperativeId = user.HTXId;
      }
    } catch (err) {
      console.log(err);
    }
  }
};

exports.validateParamId = (req, res, next) => {
  if (!mongodb.ObjectID.isValid(req.params.id)) {
    return res.status(400).json({
      errorMessage: "Id không hợp lệ"
    });
  }

  next();
};

exports.validateExist = async (req, res, next) => {
  const { models } = req.app;

  const isExist = await models.borrowedTool.isExist({
    _id: mongodb.ObjectID(req.params.id)
  });

  if (!isExist) {
    return res.status(404).json({
      errorMessage: `Document không tồn tại`
    });
  }

  next();
};

exports.validateBeforeCreate = catchAsync(async (req, res, next) => {
  const { db, models } = req.app;
  const {
    toolId,
    borrowedQuantity,
    borrowedDate,
    image,
    userBorrowedId
  } = req.body;

  let errors = [];
  let messages = [];

  // Validate toolId
  if (toolId == null) {
    errors.push({
      message: "Vui lòng nhập id của dụng cụ cần mượn."
    });
  } else {
    await validateToolId(errors, models, toolId);
  }

  // Validate borrowedQuantity
  if (borrowedQuantity == null) {
    errors.push({
      message: "Vui lòng nhập số lượng mượn."
    });
  } else {
    validateBorrowedQuantity(errors, borrowedQuantity, models, toolId);
  }

  // Validate borrowedDate
  if (borrowedDate == null) {
    errors.push({
      message: "Vui lòng nhập ngày mượn."
    });
  } else {
    validateBorrowedDate(errors, borrowedDate);
  }

  // Validate userBorrowedId
  if (userBorrowedId == null) {
    errors.push({
      message: "Vui lòng nhập id người mượn."
    });
  } else {
    await validateUserBorrowedId(req, errors, db, userBorrowedId);
  }

  // Validate image
  if (req.files) {
    validateImg(req.files, errors);
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
  const { db, models } = req.app;
  const {
    toolId,
    borrowedQuantity,
    borrowedDate,
    returnedDate,
    image,
    userBorrowedId
  } = req.body;

  let errors = [];
  let messages = [];

  if (Object.keys(req.body).length == 0) {
    return res.status(400).json({
      errorMessage: "Vui lòng nhập thông tin cần cập nhật"
    });
  }

  if (toolId != null) {
    await validateToolId(errors, models, toolId);
  }

  if (borrowedQuantity != null) {
    const borrowedTool = await models.borrowedTool.findOne(req.params.id);
    const toolId = borrowedTool.toolId;
    validateBorrowedQuantity(errors, borrowedQuantity, models, toolId);
  }

  if (borrowedDate != null) {
    validateBorrowedDate(errors, borrowedDate);
  }

  if (returnedDate != null) {
    await validateReturnedDate(errors, returnedDate, models, req.params.id);
  }

  if (userBorrowedId != null) {
    await validateUserBorrowedId(req, errors, db, userBorrowedId);
  }

  // Validate image
  if (req.files) {
    validateImg(req.files, errors);
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

exports.validateBeforeReturn = catchAsync(async (req, res, next) => {
  const { db, models } = req.app;
  const { returnedDate } = req.body;

  let errors = [];
  let messages = [];

  // Check if returnedDate already exist
  const borrowedTool = await models.borrowedTool.findOne(req.params.id);
  if (borrowedTool.returnedDate) {
    return res.status(400).json({
      errorMessage:
        "Dụng cụ đã được trả. Sử dụng update nếu muốn cập nhật ngày trả"
    });
  }

  if (returnedDate == null) {
    errors.push({
      message: "Vui lòng nhập ngày trả"
    });
  } else {
    await validateReturnedDate(errors, returnedDate, models, req.params.id);
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
