const { formatTimeIn8601 } = require('../helpers/date');
const httpStatus = require('http-status');
const { ObjectID } = require('mongodb');
module.exports.createNewDiary = async (req, res, next) => {
    try {
        const {
            diary,
        } = req.app.models;

        const {
            plantID,
            fields,
            HTX_id,
            begin,
            end,
            status,
            name,
            description,
        } = req.body;
        console.log(req.query);

        for (let i in fields) {
            fields[i] = new ObjectID(fields[i]);
        }

        const diaryObj = {
            plantID: plantID ? plantID.trim() : '',
            fields: fields ? fields : [],
            HTX_id: HTX_id ? HTX_id : '',
            begin: begin ? formatTimeIn8601(parseInt(begin)) : new Date().toISOString(),
            end: end ? formatTimeIn8601(parseInt(end)) : new Date().toISOString(),
            status: status ? status : 'farming',
            name: name ? name : '',
            description: description ? description : '',

        }

        const result = await diary.insertOne(diaryObj);

        return res.status(httpStatus.CREATED)
            .json({
                code: httpStatus.CREATED,
                message: 'Create new diary successfully',
                result: result,
            })
            .end();

    } catch (error) {
        next(error);
    }
}

module.exports.getDiaryByID = async (req, res, next) => {
    try {
        const {
            diaryID,
        } = req.params;

        const {
            diary,
        } = req.app.models;

        const result = await diary.getByID(new ObjectID(diaryID));

        if (!result) {
            return res.status(httpStatus.NOT_FOUND)
                .json({
                    code: httpStatus.NOT_FOUND,
                    message: 'Diary is not found',
                })
                .end();
        }

        return res.status(httpStatus.OK)
            .json({
                code: httpStatus.OK,
                message: 'Get diary successfully',
                result: result,
            })
            .end();



    } catch (error) {
        next(error);
    }
}