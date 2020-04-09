const httpStatus = require('http-status');
const _ = require('lodash');

const APIError = require('../utils/APIError');

const RiceSeedModel = require('../models/rice.model');

module.exports.createNewRiceSeed = async (req, res, next) => {
    const { db } = req.app;

    const code = _.get(req.body, 'code', '');
    const name = _.get(req.body, 'name', '');

    const RiceSeed = new RiceSeedModel(db);

    try {
        const isDataExisted = await RiceSeed.check({ code, name });

        if (isDataExisted) {
            throw new APIError({
                message: 'Dữ liệu đã tồn tại',
                status: httpStatus.CONFLICT,
            });
        }
    } catch (error) {
        return next(error);
    }

    try {
        const newRiceSeed = await RiceSeed.create({ code, name });
        return res.status(httpStatus.CREATED).json({
            message: 'Thành công tạo mới giống lúa',
            code: httpStatus.CREATED,
            riceseed: newRiceSeed.model,
        })
        .end();
    } catch (error) {
        return next(error);
    }
};

module.exports.findById = async (req, res, next) => {
    const { db } = req.app;

    const id = _.get(req.params, 'id', '');

    const RiceSeed = new RiceSeedModel(db);

    try {
        const result = await RiceSeed.findById(id);

        if (!result) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: 'Không tìm thấy giống lúa trong cơ sở dữ liệu',
                code: httpStatus.NOT_FOUND,
            })
            .end();
        }

        return res.status(httpStatus.OK).json({
            message: 'OK',
            code: httpStatus.OK,
            riceseed: result.model,
        })
        .end();
    } catch (error) {
        return next(error);
    }
};

module.exports.findAll = async (req, res, next) => {
    const { db } = req.app;

    const pageNumber = parseInt(_.get(req.query, 'pageNumber', 1), 10);
    const pageSize = parseInt(_.get(req.query, 'pageSize', 100), 10);

    const RiceSeed = new RiceSeedModel(db);

    try {
        const {
            riceseed,
            documentCount,
        } = await RiceSeed.findAll({
            pageNumber,
            pageSize,
        });
        
        return res.status(httpStatus.OK).json({
            message: 'OK',
            code: httpStatus.OK,
            pageNumber,
            pageSize,
            totalRiceseed: documentCount,
            totalPage: Math.ceil(documentCount / pageSize),
            riceseed: riceseed,
        })
        .end();
    } catch (error) {
        return next(error);
    }
}

module.exports.updateByCode = async (req, res, next) => {
    const { db } = req.app;

    const code = _.get(req.params, 'code', '');
    const name = _.get(req.body, 'name', '');

    const RiceSeed = new RiceSeedModel(db);

    try {
        const findCode = await RiceSeed.findByCode(code);

        if (!findCode) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: 'Không tìm thấy giống lúa trong cơ sở dữ liệu',
                code: httpStatus.NOT_FOUND,
            })
            .end();
        }
    } catch (error) {
        return next(error);
    }

    try {
        const findName = await RiceSeed.findByName(name);

        if (findName) {
            return res.status(httpStatus.CONFLICT).json({
                message: 'Tên giống lúa đã tồn tại',
                code: httpStatus.CONFLICT,
            })
            .end();
        }
    } catch (error) {
        return next(error);
    }

    try {
        const updatedRiceseed = await RiceSeed.updateByCode(code, { name });

        return res.status(httpStatus.OK).json({
            message: 'Cập nhật thông tin giống lúa thành công',
            code: httpStatus.OK,
            riceseed: updatedRiceseed.model,
        })
        .end();
    } catch (error) {
        return next(error);
    }
}

module.exports.deleteById = async (req, res, next) => {
    const { db } = req.app;

    const id = _.get(req.params, 'id', '');

    const RiceSeed = new RiceSeedModel(db);

    try {
        const result = await RiceSeed.findById(id);

        if (!result) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: 'Xóa thành công',
                code: httpStatus.NOT_FOUND,
            })
            .end();
        }
    } catch (error) {
        return next(error);
    }

    try {
        await RiceSeed.deleteById(id);
        return res.status(httpStatus.NO_CONTENT).end();
    } catch (error) {
        return next(error);
    }
}

module.exports.dropCollection = async (req, res, next) => {
    const { db } = req.app;

    const RiceSeed = new RiceSeedModel(db);

    try {
        const result = await RiceSeed.dropCollection();
        return res.status(httpStatus.OK).json({
            message: 'OK',
            code: httpStatus.OK,
            count: result.deletedCount,
        })
        .end();
    } catch (error) {
        return next(error);
    }
}