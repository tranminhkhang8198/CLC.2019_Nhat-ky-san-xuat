const filterObj = require('../utils/filterObj');
const catchAsync = require('../utils/catchAsync');

exports.createNewTool = catchAsync(async (req, res, next) => {
    const {
        models
    } = req.app;

    const filterBody = filterObj(req.body, 'name', 'total', 'available', 'image', 'cooperativeId', 'note');

    const newTool = await models.tool.create(filterBody);

    return res.status(200).json(
        newTool
    );
});