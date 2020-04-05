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