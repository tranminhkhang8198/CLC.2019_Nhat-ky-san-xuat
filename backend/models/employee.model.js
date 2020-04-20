const { APIError } = require('../utils/APIError')
const httpStatus = require('http-status');
class Employee {

    constructor(app) {
        this.app = app;
    }

    /**
    *============================================================
    *=                Modification functions                    =
    *=        Put all the modification functions below          =
    *============================================================
    */

    async updateByEmpID(_id, updateData) {
        try {
            const result = await this.app.collections('user').findOneAndUpdate(
                {
                    _id: _id,
                },
                {
                    $set: {
                        updateData,
                    }
                }, {
                returnOriginal: false,
            }
            );
            return result;

        } catch (error) {
            throw new APIError({
                message: 'Failed on updating employee information',
                status: httpStatus.INTERNAL_SERVER_ERROR,
                stack: error.stack,
                isPublic: false,
                errors: error.errors,
            })
        }
    }

}

module.exports = Employee;