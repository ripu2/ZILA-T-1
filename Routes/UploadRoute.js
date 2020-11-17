const express = require('express');
const router = new express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const crypto = require('crypto');
const getAllDirFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllDirFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(file);
    }
  });

  return arrayOfFiles;
};
const result = getAllDirFiles('D:/Projects/ZILA/uploads').length;
// console.log(result);

var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, `upload${result + 1}` + `.csv`);
    });
  },
});

var upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  res.render('index');
});

router.post('/upload', upload.single('files'), (req, res, next) => {
  csv()
    .fromFile(`d:/Projects/ZILA/uploads/upload${result + 1}.csv`)
    .then(jsonObj => {
      console.log(jsonObj);
      /**
       * [
       * 	{a:"1", b:"2", c:"3"},
       * 	{a:"4", b:"5". c:"6"}
       * ]
       */
    });
});
module.exports = router;
