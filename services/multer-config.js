const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + uniqueSuffix + ".png");
    }
});

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/images'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, req.user.email + uniqueSuffix + ".png");
    }
});

const upload = multer({ storage: storage })
const userUpload = multer({ storage: userStorage })

module.exports = {
    upload,
    userUpload
}