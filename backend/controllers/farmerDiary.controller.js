const httpStatus = require('http-status');
const _ = require('lodash');

const FarmerDiaryModel = require('../models/farmerDiary.model');

const { ObjectID } = require('mongodb');

module.exports.createFarmerDiary = async (req, res, next) => {
    const db = req.app.db;

    const diaryId = req.body.diaryId;
    const farmerId = req.body.farmerId;
    const cropTasks = req.body.cropTasks.map(item => {
        item.createdAt = new Date();
        return item;
    });

    const FarmerDiary = new FarmerDiaryModel(db);

    try {
        const newFarmerDiary = await FarmerDiary.create({
            diaryId,
            farmerId,
            cropTasks,
        });
        console.log(newFarmerDiary)
        return res.status(httpStatus.CREATED).json({
            message: 'Ghi nhật ký thành công',
            code: httpStatus.CREATED,
            diary: newFarmerDiary.model,
        })
        .end();
    } catch (error) {
        return next(error);
    }
};

module.exports.getCollection = async (req, res, next) => {
    const db = req.app.db;
    const FarmerDiary = new FarmerDiaryModel(db);

    try {
        const data = await FarmerDiary.getCollection();
        return res.status(httpStatus.OK).json({
            message: 'Lấy dữ liệu thành công',
            code: httpStatus.OK,
            data,
        })
        .end();
    } catch (error) {
        return next(error);
    }
};

module.exports.dropCollection = async (req, res, next) => {
    const db = req.app.db;
    const FarmerDiary = new FarmerDiaryModel(db);

    try {
        await FarmerDiary.dropCollection();
        return res.status(httpStatus.NO_CONTENT).end();
    } catch (error) {
        return next(error);
    }
};

module.exports.getById = async (req, res, next) => {
    const db = req.app.db;
    const { id } = req.params;

    const FarmerDiary = new FarmerDiaryModel(db);

    try {
        if (!ObjectID.isValid(id)) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid id' }).end();
        }
    } catch (error) {
        
    }

    try {
        const result = await FarmerDiary.findById(id);
        return res.status(httpStatus.OK).json({ data: result, message: 'OK' }).end();
    } catch (error) {
        return next(error);
    }
};

module.exports.getFarmerDiaryByFarmerId = async (req, res, next) => {
    const db = req.app.db;
    const { farmerId } = req.params;

    const FarmerDiary = new FarmerDiaryModel(db);

    try {
        if (!ObjectID.isValid(farmerId)) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid farmer id' }).end();
        }
    } catch (error) {
        
    }

    try {
        const result = await FarmerDiary.findByFarmerId(farmerId);
        return res.status(httpStatus.OK).json({ data: result, message: 'OK' }).end();
    } catch (error) {
        return next(error);
    }
};
