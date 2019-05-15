var multer = require("multer");
var crypto = require('crypto');
var path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return cb(err);
            cb(null, Math.floor(Math.random() * 900000000) + 100000000 + path.extname(file.originalname))
        })
    }
})

var upload = multer({ storage: storage });

module.exports = upload;