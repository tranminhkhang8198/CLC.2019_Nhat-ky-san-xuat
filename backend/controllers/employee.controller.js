const httpStatus = require('http-status');
const { ObjectID } = require('mongodb');

module.exports.updateEmployeeByID = async (req, res, next) => {
    try {
        const {
            employee,
        } = req.app.models;

        const {
            name,
            avatar,
            personalId,
            address,
            phone,
            email,
            jobTitle,
            HTXId,
        } = req.body;
        const empID = new ObjectID(req.params.empID);
        const updateData = {
            name: name ? name : null,
            avatar: avatar ? avatar : null,
            personalId: personalId ? personalId : null,
            address: address ? address : null,
            phone: phone ? phone : null,
            email: email ? email : null,
            user: jobTitle ? jobTitle : null,
            HTXId: HTXId ? HTXId : null,
        }

        for (let k in updateData) {
            const val = updateData[k]
            if (val === null) {
                delete updateData[k];
            }
        }

        const result = await employee.updateByEmpID(empID, updateData);

        if (!result) {
            return res.status(httpStatus.NOT_FOUND)
                .json({
                    code: httpStatus.NOT_FOUND,
                    message: 'Employee is not found',
                })
                .end();
        }
        return res.status(httpStatus.OK)
            .json({
                code: httpStatus.OK,
                message: 'Updating employee information successfully',
                result: result.value,
            })
            .end();
    } catch (error) {
        next(error);
    }
}

module.exports.removeEmpFromCoop = async (req, res, next) => {
    try {
        const {
            empID,
            coopID,
        } = req.params;

        const {
            employee,
        } = req.app.models;

        console.log(employee);

        const result = await employee.removeFromCoop(new ObjectID(empID), new ObjectID(coopID));
        if (!result) {
            return res.status(httpStatus.NOT_FOUND)
                .json({
                    code: httpStatus.NOT_FOUND,
                    message: 'Employee is not found'
                })
                .end();
        }

        return res.status(httpStatus.OK)
            .json({
                code: httpStatus.OK,
                message: 'Remove employee from cooperative successfully',
                result: result,
            })
            .end();

    } catch (error) {
        next(error);
    }
}

module.exports.searchEmployee = async (req, res, next) => {
    try {
        const {
            employee,
        } = req.app.models;

        const {
            pageSize,
            pageNumber,
            name,
        } = req.query;

        const pagination = {
            pageSize: pageSize ? parseInt(pageSize) : 10,
            pageNumber: pageNumber ? parseInt(pageNumber) - 1 : 0,
        }
        const searchResult = await employee.searchByName(name, pagination, { password: 0 });
        if (!searchResult || searchResult.records.length <= 0) {
            return res.status(httpStatus.NOT_FOUND)
                .json({
                    code: httpStatus.NOT_FOUND,
                    message: 'Employee are not found',
                })
                .end();
        }
        return res.status(httpStatus.OK)
            .json({
                code: httpStatus.OK,
                message: 'Search employe by name successfully',
                pagination: {
                    pageSize: pagination.pageSize,
                    pageNumber: pagination.pageNumber + 1,
                },
                result: searchResult,
            })
            .end();
    } catch (error) {
        next(error);
    }
}