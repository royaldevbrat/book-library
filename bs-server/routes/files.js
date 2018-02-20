const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        const taskid = req.query.taskid;
        cb(null, path.join(__dirname, '../public/images/'));
    },
    filename: function (req, file, cb) {
        const datetimestamp = Date.now();
        cb(null, file.originalname);
    }
});

const upload = multer({ //multer settings
    storage: storage
}).single('file');

router.post('/upload', function(req, res) {
    upload(req, res, function (err) {
        if (err) {
            res.json({"success": false});
        } else {
            res.json({"success": true});
        }
    });
});

module.exports = router;
