const _ = require('lodash');


class Permission{

    constructor(app){
        this.app = app;
    }

    /**
     * Check user permission to taget resource
     * @param {string} userId 
     * @param {string} resource 
     * @param {string} method 
     * @param {callback function} cb 
     */
    checkPermission(userId, resource, method, cb = () => {}){
        console.log("userId", userId)
        // Get user workgroup
        this.app.models.user.workgroup(userId, (err, workgroup) =>{
            if(err){
                return cb({err:"Workgroup is not found"}, null);
            }
            else{
                console.log("workgroup  dsdfsdf", workgroup)
                // Check resource role
                this.app.models.resource.role(resource, (err, role) => {

                    console.log("resource role =", role);
                    if(err){
                        return cb(err, null)
                    }
                    else{
                        const allowMethod = _.get(role, workgroup);
                        console.log('manager:', allowMethod);
                        console.log('manager workgroup:', workgroup);

                        if(!allowMethod){
                            return cb({err: "Permission denied"}, null);
                        }
                        else{
                            console.log(`method: ${method} , allowMethod: ${allowMethod}`);
                            this.app.models.role.compare(method, allowMethod, (err, result) =>{
                                if(err){
                                    return cb(err, null);
                                }
                                else{
                                
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