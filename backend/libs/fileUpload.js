const multer = require('multer');
const path = require('path');

const {
    createFolderIfNotExists,
} = require('../helpers/fileSystem');

const pathToUploadFolder = path.join(__dirname, '../uploads');
createFolderIfNotExists(pathToUploadFolder);

const storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, pathToUploadFolder);
    },
    filename: (req, file, done) => {
        const { _id } = req.user;
        const {
            fieldname,
            originalname,
        } = file;
        done(null, `${fieldname}-${_id}-${originalname}`);
    },
});

module.exports.upload = multer({ storage: storage });
