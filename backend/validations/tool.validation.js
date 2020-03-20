const mongodb = require("mongodb");
const _ = require("lodash");

const catchAsync = require("../utils/catchAsync");

exports.validateBeforeCreate = catchAsync(async (req, res, next) => {
  const { name, total, cooperativeId } = req.body;
  const { db } = req.app;

  let errors = [];
  let messages = [];

  const reg = /^\d+$/;

  // Check name exists

  // Total Validate
  if (total == null) {
    errors.push({
      message: "Vui lòng nhập tổng số lượng"
    });
  } else if (!reg.test(total)) {
    errors.push({
      message: "Tổng số lượng phải là số nguyên dương"
    });
  }

  // Check cooperative exists
  if (cooperativeId == null) {
    errors.push({
      message: "Vui lòng nhập id hợp tác xã"
    });
  } else {
    const Cooperative = db.collection("cooperatives");

    const cooperative = await Cooperative.findOne({
      cooperativeID: cooperativeId
    });

    if (!cooperative) {
      errors.push({
        message: "Hợp tác xã không tồn tại. Vui lòng kiểm tra lại"
      });
    }
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
