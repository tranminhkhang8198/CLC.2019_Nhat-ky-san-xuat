var multer = require('multer');
var userAvatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/avatar');
    },
    filename: (req, file, cb) => {
        console.log(file);
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var cooperativeLogoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/logo');
    },
    filename: (req, file, cb) => {
        console.log(file);
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
const uploadUserAvatar = multer({ storage: userAvatarStorage });
const uploadCooperativeLogo = multer({ storage: cooperativeLogoStorage });
module.exports = uploadUserAvatar;
module.exports = uploadCooperativeLogo;