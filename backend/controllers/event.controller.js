const path = require("path");
const mongodb = require("mongodb");
const fs = require("fs");

const filterObj = require("../utils/filterObj");
const catchAsync = require("../utils/catchAsync");

const uploadImage = (file) => {
  const filename = "image-" + Date.now();
  const extname = file.name.split(".").slice(-1)[0];
  const img = filename + "." + extname;

  file.mv(path.join(__dirname, "../images/event/" + img));

  const host = "http://localhost:3001";
  const imgUrl = host + "/event/" + img;

  return imgUrl;
};

const uploadContent = (file) => {
  const filename = "content-" + Date.now();
  const extname = file.name.split(".").slice(-1)[0];
  const content = filename + "." + extname;

  file.mv(path.join(__dirname, "../images/event/" + content));

  const host = "http://localhost:3001";
  const contentUrl = host + "/event/" + content;

  return contentUrl;
};

const removeFile = (url) => {
  try {
    const filename = url.split("/").slice(-1)[0];

    const filePath = path.join(__dirname, "../images/event/" + filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.log(err);
  }
};

const getUserInfo = async (db, id) => {
  try {
    const User = db.collection("user");

    const user = await User.findOne({ _id: mongodb.ObjectID(id) });

    return user;
  } catch (err) {
    console.log(err);
  }
};

exports.create = catchAsync(async (req, res, next) => {
  const { models } = req.app;

  const filterBody = filterObj(
    req.body,
    "name",
    "participants",
    "instructorInfo",
    "trainedDate",
    "note",
    "coverImage",
    "trainedContent",
    "cooperativeId"
  );

  if (req.files) {
    if (req.files.coverImage) {
      const file = req.files.coverImage;
      const imgUrl = uploadImage(file);
      filterBody.coverImage = imgUrl;
    }

    if (req.files.trainedContent) {
      const file = req.files.trainedContent;
      const contentUrl = uploadContent(file);
      filterBody.trainedContent = contentUrl;
    }
  }

  const newEvent = await models.event.create(filterBody);

  return res.status(201).json(newEvent);
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

  const events = await models.event.find(query);
  const paginatedEvents = events.slice(start, end);

  const totalPages =
    (events.length - (events.length % nPerPage)) / nPerPage + 1;

  if (paginatedEvents.length == 0) {
    return res.status(404).json({
      errorMessage: "Trang tìm kiếm không tồn tại",
    });
  }

  for (paginatedEvent of paginatedEvents) {
    let participantsName = [];
    for (participant of paginatedEvent.participants) {
      const user = await getUserInfo(db, participant);

      if (user) {
        participantsName.push(user.name);
      } else {
        participantsName.push(
          "Không tìm thấy thông tin người dùng từ cơ sở dữ liệu."
        );
      }
    }

    paginatedEvent.participants = participantsName;
  }

  return res.status(200).json({
    totalEvents: events.length,
    totalPages,
    data: paginatedEvents,
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const { db, models } = req.app;
  const id = req.params.id;

  const event = await models.event.findOne(id);

  if (!event) {
    return res.status(404).json({
      errorMessage: `Không tìm thấy document.`,
    });
  }

  let participantsName = [];
  for (participant of event.participants) {
    const user = await getUserInfo(db, participant);

    if (user) {
      participantsName.push(user.name);
    } else {
      participantsName.push(
        "Không tìm thấy thông tin người dùng từ cơ sở dữ liệu."
      );
    }
  }

  event.participants = participantsName;

  return res.status(200).json(event);
});

exports.update = catchAsync(async (req, res, next) => {
  const { models } = req.app;
  const id = req.params.id;

  const event = await models.event.findOne(id);

  if (!event) {
    return res.status(404).json({
      errorMessage: `Không tìm thấy document.`,
    });
  }

  const filterBody = filterObj(
    req.body,
    "name",
    "participants",
    "instructorInfo",
    "trainedDate",
    "note",
    "coverImage",
    "trainedContent",
    "cooperativeId"
  );

  if (req.files) {
    if (req.files.coverImage) {
      const file = req.files.coverImage;
      const imgUrl = uploadImage(file);
      filterBody.coverImage = imgUrl;

      console.log(event.coverImage);

      removeFile(event.coverImage);
    }

    if (req.files.trainedContent) {
      const file = req.files.trainedContent;
      const contentUrl = uploadContent(file);
      filterBody.trainedContent = contentUrl;

      removeFile(event.trainedContent);
    }
  }

  const updatedEvent = await models.event.update(id, filterBody);

  return res.status(200).json(updatedEvent.value);
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const { models } = req.app;
  const id = req.params.id;

  const event = await models.event.findOne(id);

  if (!event) {
    return res.status(404).json({
      errorMessage: `Không tìm thấy document.`,
    });
  }

  await models.event.delete(id);

  return res.status(200).json({
    successMessage: "Document được xoá thành công.",
  });
});
