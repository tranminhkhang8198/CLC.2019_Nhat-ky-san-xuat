const mongodb = require("mongodb");
const fs = require("fs");
const path = require("path");

const filterObj = require("../utils/filterObj");
const catchAsync = require("../utils/catchAsync");

const getCooperativeId = async (db, diaryId) => {
  const diary = await db
    .collection("diaries")
    .findOne({ _id: mongodb.ObjectID(diaryId) });

  return diary.HTX_id;
};

exports.create = catchAsync(async (req, res, next) => {
  const { db, models } = req.app;

  const filterBody = filterObj(
    req.body,
    "name",
    "startDate",
    "endDate",
    "type",
    "note",
    "stage",
    "diaryId"
  );

  const cooperativeId = await getCooperativeId(db, diaryId);

  filterBody.cooperativeId = cooperativeId;

  const cropTask = await models.cropTask.create(filterBody);

  return res.status(201).json(cropTask);
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

  const cropTasks = await models.cropTask.find(query);
  const paginatedCropTasks = cropTasks.slice(start, end);

  const totalPages =
    (cropTasks.length - (cropTasks.length % nPerPage)) / nPerPage + 1;

  if (paginatedCropTasks.length == 0) {
    return res.status(404).json({
      errorMessage: "Trang tìm kiếm không tồn tại",
    });
  }

  return res.status(200).json({
    totalCropTasks: paginatedCropTasks.length,
    totalPages,
    data: cropTasks,
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const { db, models } = req.app;
  const id = req.params.id;

  const cropTask = await models.cropTask.findOne(id);

  if (!cropTask) {
    return res.status(404).json({
      errorMessage: `Không tìm thấy document.`,
    });
  }

  return res.status(200).json(cropTask);
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const { models } = req.app;
  const id = req.params.id;

  const cropTask = await models.cropTask.findOne(id);

  if (!cropTask) {
    return res.status(404).json({
      errorMessage: `Không tìm thấy document.`,
    });
  }

  await models.cropTask.delete(id);

  return res.status(200).json({
    successMessage: "Document được xoá thành công.",
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { db, models } = req.app;
  const id = req.params.id;

  const cropTask = await models.cropTask.findOne(id);

  if (!cropTask) {
    return res.status(404).json({
      errorMessage: `Không tìm thấy document.`,
    });
  }

  const filterBody = filterObj(
    req.body,
    "name",
    "startDate",
    "endDate",
    "type",
    "note",
    "stage",
    "diaryId"
  );

  const cooperativeId = await getCooperativeId(db, filterBody.diaryId);

  if (cropTask.cooperativeId != cooperativeId) {
    filterBody.cooperativeId = cooperativeId;
  }

  const updatedCropTask = await models.cropTask.update(id, filterBody);

  return res.status(200).json(updatedCropTask.value);
});

exports.createSampleTemplate = catchAsync(async (req, res, next) => {
  const { db } = req.app;

  const filterBody = filterObj(req.body, "diaryId");

  const cooperativeId = await getCooperativeId(db, filterBody.diaryId);

  let rawdata = fs.readFileSync(
    path.join(__dirname, "../farm/cropTask-template.json")
  );
  let cropTasks = JSON.parse(rawdata);
  for (cropTask of cropTasks) {
    cropTask.diaryId = filterBody.diaryId;
    cropTask.cooperativeId = cooperativeId;
  }

  await db
    .collection("cropTasks")
    .insertMany(cropTasks)
    .then((result) => {
      return res.status(201).json({
        successMessage: "Qui trình cho vụ mùa được tạo thành công.",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        errorMessage: "Lỗi trong quá trình tạo qui trình cho vụ mùa.",
      });
    });
});
