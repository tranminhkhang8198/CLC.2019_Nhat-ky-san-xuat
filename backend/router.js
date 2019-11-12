const _ = require('lodash');

exports.routers = (app) => {

    /**
     * Error Handle In Response
     * @param {request object} res 
     * @param {string} errorMessage 
     * @param {int} code
     * @returns {*|JSON|Promise<any>}
     */
    const errorHandle = (res, errorMessage, code = 500) =>{


        return res.status(code).json({
            error: {
                message: errorMessage
            }
        });
    };

    /**
     * Response Handle In Response
     * @param {*} res 
     * @param {*} data 
     * @param {*} code
     * @returns {*|JSON|Promise<any>}
     */
    const responseHandle = (res, data, code = 200) => {

        return res.status(code).json({data});
    };

    /**
     * 
     * @param {requset object} req 
     * @param {string} resource 
     * @param {callback function} cb 
     * @returns {cb(err, permission<true|false>)}
     */
    const verifyUser = (req, resource, cb = () => {} ) => {
        //Verify token
        let tokenId = req.get('authorization');
        console.log("request method", req.method)
        if(!tokenId){
            tokenId = req.query.token;
        }

        if(!tokenId){
            return cb({errorMessage: "Access denied"}, null);
        }

        app.models.token.verify(tokenId, (err, token) =>{
            
            if(err){
                return cb({errorMessage: "Access denied"}, null);
            }
            else{
                _.unset(token.user, 'password')
                // Check permission
                app.models.permission.checkPermission(token.user._id, resource, req.method, (err, permission) => {

                    if(err){
                        return cb({errorMessage: "Access denied"}, null);
                    }
                    else{
                        console.log(permission);
                        if(permission){
                            
                            return cb(null, permission);
                        }
                        else{
                            return cb({errorMessage: "Access denied"}, null);
                        }
                    }
                })
            }
        })
    }





    /**
     * @method GET
     * @endpoint /
     * @description Root api
     * 
     */
    app.get('/', (req, res) => {
        return res.json({version: '1.0'});
    });


    /**
     * @method POST
     * @endpoint /api/users
     * @description Create new user
     * 
     */
    app.post('/api/users/register', (req, res, next) => {

        const body = req.body;


        app.models.user.create(body, (err, info) => {

            return err ? errorHandle(res, err, 503): responseHandle(res, info);

        });
    });

    /**
     * @method POST
     * @endpoint /api/users/login
     * @description Log in user account and response Token
     * 
     */
    app.post('/api/users/login', (req, res, next) => {
        console.log("login");
        const body = req.body;

        app.models.user.login(body, (err, result) => {

            return err ? errorHandle(res, err, 504): responseHandle(res, result);
        });
    });

    /**
     * @method GET
     * @endpoint /api/users/me
     * @description Get owner info
     * 
     */
    app.get('/api/users/me', (req, res, next) => {

        let tokenId = req.get('authorization');
        if(!tokenId){
            tokenId = req.query.token;
        }

        if(!tokenId){
            return errorHandle(res, "Access denied", 505);
        }

        app.models.token.verify(tokenId, (err, result) =>{
            if(err){
                return errorHandle(res, "Access denied");
            }
            else{
                _.unset(result.user, 'password')
                return responseHandle(res, result, 200)
            }
        })
    })

    /**
     * @method GET
     * @endpoint /api/users/get
     * @description Get all users
     * 
     */
    app.get('/api/users/get', (req, res, next) => {

        const resource = "user"
        verifyUser(req, resource, (err, permission) => {
            if(err){
                errorHandle(res, "Permission denied");
            }
            else{
                app.models.user.get((err, data) => {
                    return err ? errorHandle(res, "Users are not found", 503) : responseHandle(res, data);
                })
            }
        })

    })

    /**
     * @method POST
     * @endpoint /api/roles/create
     * @description Create new role
     * 
     */
     app.post('/api/roles/create', (req, res, next) => {
         const body = req.body;
         console.log("role body is : ",body);
         app.models.role.create(body, (err, role) => {
             return err ? errorHandle(res, "error creating new role", 501) : responseHandle(res, role)
         })
     })

    /**
     * @method POST
     * @endpoint /api/resources/create
     * @description Create new resources
     * 
     */
    app.post('/api/resources/create', (req, res, next) => {
        body = req.body;
        console.log("resource body is : ",body);
        app.models.resource.create(body, (err, role) => {
            return err ? errorHandle(res, "error creating new resource", 501) : responseHandle(res, role)
        })
    })



};