exports.routers = (app) => {

    /**
     * Error Handle In Response
     * @param {*} res 
     * @param {*} errorMessage 
     * @param {*} code
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
                return responseHandle(res, {access: true}, 200)
            }
        })
    })
};