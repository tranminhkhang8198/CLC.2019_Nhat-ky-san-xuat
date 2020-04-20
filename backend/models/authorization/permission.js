const _ = require('lodash');


class Permission {

    constructor(app) {
        this.app = app;
    }

    /**
     * Check user permission to taget resource
     * @param {string} userId 
     * @param {string} resource 
     * @param {string} method 
     * @param {callback function} cb 
     */
    check(userId, resource, method, cb = () => { }) {
        // Get user workgroup
        this.app.models.user.workgroup(userId, (err, workgroup) => {
            if (err) {
                return cb({ errorMessage: "Loại người dùng không hợp lệ", errorCode: 404 }, null);
            }
            else {
                // Check resource role
                this.app.models.resource.role(resource, (err, role) => {

                    if (err) {
                        return cb(err, null)
                    }
                    else {
                        const allowMethod = _.get(role, workgroup);
                        if (!allowMethod) {
                            return cb({ errorMessage: "Bạn không có quyền try cập vào tài nguyên này", errorCode: 400 }, null);
                        }
                        else {
                            this.app.models.role.compare(method, allowMethod, (err, result) => {
                                if (err) {
                                    return cb(err, null);
                                }
                                else {

                                    return cb(null, result);
                                }
                            });
                        }

                    }
                });
            }
        })
    }
}

module.exports = Permission;