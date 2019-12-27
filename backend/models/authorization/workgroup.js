const _ = require('lodash');

class{

    constructor(app){
        this.app = app;
    }

    create(workgroup, cb = () =>{}){
        const collection = this.app.db.collection('workgroup');

        const obj = {

            name: _.get(workgroup, 'name'),
            
        }
    }
}