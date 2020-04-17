const Joi = require("@hapi/joi");
const mongodb = require("mongodb");

const validateCooperativeId = async (error, db, id) => {
  try {
    // Check exist
    const Cooperative = db.collection("cooperatives");
    const cooperative = await Cooperative.findOne({
      cooperativeID: id,
    });

    if (!cooperative) {
      return error.push({
        message: "Hợp tác xã không tồn tại.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const validatePartitcipant = async (error, db, id) => {
  if (!mongodb.ObjectID.isValid(id)) {
    error.push({
      message: `Người tham gia với id = ${id} không hợp lệ.`,
    });
  } else {
    try {
      const User = db.collection("user");
      const user = await User.findOne({ _id: mongodb.ObjectID(id) });

      if (!user) {
        error.push({
          message: `Người tham gia với id = ${id} không tồn tại.`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const validateCoverImage = (error, file) => {
  if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
    error.push({
      message: "Định dạng hình ảnh khôn hợp lệ. Vui lòng chọn ảnh khác.",
    });
  }
};

const validateTrainedContent = (error, file) => {
  if (!file.name.match(/.(doc|docx|pdf|xls|xlsx)$/i)) {
    error.push({
      message: "Định dạng file nội dung tập huấn không hợp lệ.",
    });
  }
};

exports.validateParamId = (req, res, next) => {
  if (!mongodb.ObjectID.isValid(req.params.id)) {
    return res.status(400).json({
      errorMessage: "Id không hợp lệ",
    });
  }

  next();
};

const joiEventSchema = {
  eventPOST: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Tên sự kiện phải là text.",
      "any.required": "Vui lòng nhập tên sự kiện.",
    }),
    participants: Joi.array().required().messages({
      "any.required": "Vui lòng nhập thành phần tham gia.",
      "array.base": "Thành phần tham gia không hợp lệ.",
    }),
    instructorInfo: Joi.object({
      name: Joi.string(),
      position: Joi.string(),
      workUnit: Joi.string(),
    }),
    trainedDate: Joi.date().iso().messages({
      "date.format": "Ngày tập huấn không hợp lệ.",
    }),
    note: Joi.string(),
    cooperativeId: Joi.required().messages({
      "any.required": "Vui lòng nhập id hợp tác xã.",
    }),
  }),

  eventPATCH: Joi.object({
    name: Joi.string().messages({
      "string.base": "Tên sự kiện phải là text.",
    }),
    participants: Joi.array().messages({
      "array.base": "Thành phần tham gia không hợp lệ.",
    }),
    instructorInfo: Joi.object({
      name: Joi.string(),
      position: Joi.string(),
      workUnit: Joi.string(),
    }),
    trainedDate: Joi.date().iso().messages({
      "date.format": "Ngày tập huấn không hợp lệ.",
    }),
    note: Joi.string(),
  }),
};

exports.postValidator = async (req, res, next) => {
  let { error } = await joiEventSchema.eventPOST.validate(req.body, {
    abortEarly: false,
  });

  if (!error) {
    error = {};
    error.details = [];
  }

  // Validate cooperative
  const cooperativeId = req.body.cooperativeId;
  if (cooperativeId) {
    await validateCooperativeId(error.details, req.app.db, cooperativeId);
  }

  // Validate participants
  const participants = req.body.participants;
  if (Array.isArray(participants)) {
    for (let participant of participants) {
      await validatePartitcipant(error.details, req.app.db, participant);
    }
  }

  if (req.files) {
    // Validate cover image
    if (req.files.coverImage) {
      validateCoverImage(error.details, req.files.coverImage);
    }

    // Validate trained content
    if (req.files.trainedContent) {
      validateTrainedContent(error.details, req.files.trainedContent);
    }
  }

  if (error.details.length == 0) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join("; ");

    res.status(400).json({ errorMessage: message });
  }
};

exports.patchValidator = async (req, res, next) => {
  if (Object.keys(req.body).length == 0 && !req.files) {
    return res.status(400).json({
      errorMessage: "Vui lòng nhập nội dung cần cập nhật.",
    });
  }

  let { error } = await joiEventSchema.eventPATCH.validate(req.body, {
    abortEarly: false,
  });

  if (!error) {
    error = {};
    error.details = [];
  }

  // Validate cooperative
  const cooperativeId = req.body.cooperativeId;
  if (cooperativeId) {
    await validateCooperativeId(error.details, req.app.db, cooperativeId);
  }

  // Validate participants
  const participants = req.body.participants;
  if (Array.isArray(participants)) {
    for (let participant of participants) {
      await validatePartitcipant(error.details, req.app.db, participant);
    }
  }

  // Validate cover image
  if (req.files) {
    if (req.files.coverImage) {
      validateCoverImage(error.details, req.files.coverImage);
    }

    // Validate trained content
    if (req.files.trainedContent) {
      validateTrainedContent(error.details, req.files.trainedContent);
    }
  }

  if (error.details.length == 0) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join("; ");

    res.status(400).json({ errorMessage: message });
  }
};
