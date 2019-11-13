const _ = require('lodash');


class Resource{


    constructor(app){
        this.app = app;
    }

    /**
     * Create new resource
     * @param {string} resource 
     * @param {callback fucntion} cb 
     */
    create(resource, cb = () => {}){

        const collection = this.app.db.collection('resource');

        const obj = {
            name: _.get(resource, 'name'),
            role: _.get(resource, 'role'),
            created: new Date()
        };

        collection.insertOne(obj, (err, result) =>{
            if(err){
                return cb({error: "error inserting new resource"}, null);
            }
            else{
                return cb(null, result);
            }
        });

    }

    /**
     * Get role of resource
     * @param {string} name 
     * @param {callback function} cb 
     */
    role(name, cb = () =>{}){
        const collection = this.app.db.collection('resource');
        
        const query = {
            name: `${name}`
        }
        const options = {
            name: true,
            role:true
        }
        collection.find(query, options).limit(1).toArray((err, result) => {
            if(err || !_.get(result, '[0]')){
                return cb({errorMessage: "Role is not found"}, null);
            }
            else{
                const role = _.get(result,'[0]').role;
                return cb(null, role);
            }
        })
    }
}

module.exports = Resource;