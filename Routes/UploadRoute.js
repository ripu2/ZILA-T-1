const express = require('express');
const router = new express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  },
});

var upload = multer({ storage: storage });
router.get('/', async (req, res) => {
  res.render('index');
});

router.post('/upload', upload.single('files'), (req, res, next) => {
  res.send('Upload succesfull');
});
module.exports = router;
