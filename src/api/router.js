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
    app.post('/api/users/', (req, res, next) => {

        const body = req.body;


        app.models.user.create(body, (err, info) => {

            return err ? errorHandle(res, err, 503): responseHandle(res, info);

        });
    });

};