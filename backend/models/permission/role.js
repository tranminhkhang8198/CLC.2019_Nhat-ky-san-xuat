const _ = require('lodash');
/**
 * Permission roles
 * G: GET
 * P: POST 
 * U: PATCH
 * D: DELETE
 * 
 */
class Role{

    constructor(app){
        this.app = app;
    }

    /**
     * Create new role
     * @param {string} role 
     * @param {callback fucntion} cb 
     */
    create(role, cb = () => {}){
        const collection = this.app.db.collection('role');
    
        const obj = {
            _id: _.get(role,'_id'),
            permission: _.get(role, 'permission'),
            created: new Date()
        }
        console.log("new role is : ",obj);


        collection.insertOne(obj, (err, result) =>{

            if(err){
                return cb({error: "error iserting role"}, null);
            }
            else{
                return cb(null, result);
            }
        })

        
    }

    /**
     * Compare user method with allow method on resource
     * @param {string} method 
     * @param {string} allowRole 
     * @param {callback function} cb 
     */
    compare(method, allowRole, cb = () =>{}){

        console.log("protocol ==", method);
        console.log("allowProtocol==", allowRole);
        // Get protocol id
        const collection = this.app.db.collection('role');
        const query = {
            permission: `${method}`
        }
        const options = {
            _id: 1
        }
        collection.find(query, options).limit(1).toArray((err, result) => {
            if(err || !_.get(result, '[0]')){
                console.log("result compare error", result);
                return cb(err, null);
            }
            else{
                console.log("result compare", result)
                const compare = allowRole.indexOf(result[0]._id.toString())
                console.log("compare eeee",compare);
                if(compare>-1){
                    return cb(null, true);
                }
                else{
                    return cb({err: "Access dinied"});
                }
            }
        })


    }
}

module.exports = Role