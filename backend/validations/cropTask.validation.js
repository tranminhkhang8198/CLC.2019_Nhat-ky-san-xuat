const Joi = require("@hapi/joi");
const mongodb = require("mongodb");

const validateDiaryId = async (error, db, id) => {
  try {
    if (!mongodb.ObjectID.isValid(id)) {
      return error.push({
        message: "Id nhật ký chung của mùa vụ không hợp lệ.",
      });
    }

    // Check exist
    const Diary = db.collection("diaries");
    const dairy = await Diary.findOne({
      _id: mongodb.ObjectID(id),
    });

    if (!dairy) {
      return error.push({
        message: "Nhật ký chung cho vụ mùa không tồn tại.",
      });
    }
  } catch (err) {
    console.log(err);
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

const joiCropTaskSchema = {
  cropTaskPOST: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Tên tác vụ, công việc phải là text.",
      "any.required": "Vui lòng nhập tên tác vụ, sự kiện",
    }),
    startDate: Joi.date().iso().messages({
      "date.format": "Ngày bắt đầu công việc không hợp lệ.",
    }),
    endDate: Joi.date().iso().messages({
      "date.format": "Ngày kết thúc công việc không hợp lệ.",
    }),
    type: Joi.string()
      .required()
      .valid("Bón Phân", "Phun Thuốc", "Nước", "CV khác")
      .messages({
        "any.only": `Loại công việc phải là một trong bốn loại "Bón Phân", "Phun Thuốc", "Nước", "CV khác".`,
        "any.required": "Vui lòng nhập loại công việc.",
      }),
    note: Joi.string(),
    diaryId: Joi.required().messages({
      "any.required": "Vui lòng nhập id nhật ký chung của vụ mùa.",
    }),
  }),

  cropTaskPATCH: Joi.object({
    name: Joi.string().messages({
      "string.base": "Tên tác vụ, công việc phải là text.",
    }),
    startDate: Joi.date().iso().messages({
      "date.format": "Ngày bắt đầu công việc không hợp lệ.",
    }),
    endDate: Joi.date().iso().messages({
      "date.format": "Ngày kết thúc công việc không hợp lệ.",
    }),
    type: Joi.string()
      .valid("Bón Phân", "Phun Thuốc", "Nước", "CV khác")
      .messages({
        "any.only": `Loại công việc phải là một trong bốn loại "Bón Phân", "Phun Thuốc", "Nước", "CV Khác".`,
      }),
    diaryId: Joi.string(),
  }),

  createSampleTemplatePost: Joi.object({
    diaryId: Joi.required().messages({
      "any.required": "Vui lòng nhập id nhật ký chung của vụ mùa.",
    }),
  }),
};

exports.postValidator = async (req, res, next) => {
  let { error } = await joiCropTaskSchema.cropTaskPOST.validate(req.body, {
    abortEarly: false,
  });

  if (!error) {
    error = {};
    error.details = [];
  }

  // Validate diary id
  const diaryId = req.body.diaryId;
  if (diaryId) {
    await validateDiaryId(error.details, req.app.db, diaryId);
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

  let { error } = await joiCropTaskSchema.cropTaskPATCH.validate(req.body, {
    abortEarly: false,
  });

  if (!error) {
    error = {};
    error.details = [];
  }

  // Validate diary id
  const diaryId = req.body.diaryId;
  if (diaryId) {
    await validateDiaryId(error.details, req.app.db, diaryId);
  }

  if (error.details.length == 0) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join("; ");

    res.status(400).json({ errorMessage: message });
  }
};

exports.createSampleTemplateValidator = async (req, res, next) => {
  let { error } = await joiCropTaskSchema.createSampleTemplatePost.validate(
    req.body,
    {
      abortEarly: false,
    }
  );

  if (!error) {
    error = {};
    error.details = [];
  }

  // Validate diary id
  const diaryId = req.body.diaryId;
  if (diaryId) {
    await validateDiaryId(error.details, req.app.db, diaryId);
  }

  if (error.details.length == 0) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join("; ");

    res.status(400).json({ errorMessage: message });
  }
};
