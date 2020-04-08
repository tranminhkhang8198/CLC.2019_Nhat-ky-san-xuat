const mongodb = require("mongodb");
const _ = require("lodash");

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

exports.validateBeforeCreate = catchAsync(async (req, res, next) => {
  const { name, total, cooperativeId } = req.body;
  const { db } = req.app;

  let errors = [];
  let messages = [];

  const reg = /^[1-9]\d*$/;

  // Name validate
  if (name == null) {
    errors.push({
      message: "Vui lòng nhập tên dụng cụ."
    });
  } else {
    const Tool = db.collection("tools");

    var regex = new RegExp(["^", name, "$"].join(""), "i");

    const tool = await Tool.findOne({
      name: regex
    });

    if (tool) {
      errors.push({
        message: `Dụng cụ với tên ${name} đã tồn tại.`
      });
    }
  }

  // Total Validate
  if (total == null) {
    errors.push({
      message: "Vui lòng nhập tổng số lượng."
    });
  } else if (!reg.test(total)) {
    errors.push({
      message: "Tổng số lượng phải là số nguyên dương."
    });
  }

  // Check cooperative exists
  if (cooperativeId == null) {
    errors.push({
      message: "Vui lòng nhập id hợp tác xã."
    });
  } else {
    const Cooperative = db.collection("cooperatives");

    const cooperative = await Cooperative.findOne({
      cooperativeID: cooperativeId
    });

    if (!cooperative) {
      errors.push({
        message: "Hợp tác xã không tồn tại. Vui lòng kiểm tra lại."
      });
    }
  }

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
  const { name, total, available, cooperativeId } = req.body;
  const { db } = req.app;

  let errors = [];
  let messages = [];

  const reg = /^[1-9]\d*$/;

  // Validate name
  if (name != null) {
    const Tool = db.collection("tools");

    var regex = new RegExp(["^", name, "$"].join(""), "i");

    const tool = await Tool.findOne({
      name: regex
    });

    if (tool) {
      errors.push({
        message: `Dụng cụ với tên ${name} đã tồn tại.`
      });
    }
  }

  // Validate total
  if (total != null) {
    if (!reg.test(total)) {
      errors.push({
        message: "Tổng số lượng phải là số nguyên dương."
      });
    }
  }

  // Validate available
  if (available != null) {
    if (!reg.test(available)) {
      errors.push({
        message: "Số lượng còn lại trong kho phải là số nguyên dương."
      });
    }
  }

  // Validate cooperative
  if (cooperativeId != null) {
    const Cooperative = db.collection("cooperatives");

    const cooperative = await Cooperative.findOne({
      cooperativeID: cooperativeId
    });

    if (!cooperative) {
      errors.push({
        message: "Hợp tác xã không tồn tại. Vui lòng kiểm tra lại."
      });
    }
  }

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
