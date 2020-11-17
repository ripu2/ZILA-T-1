const express = require('express');
const router = new express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const crypto = require('crypto');
const User = require('../models/userData');
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

router.post('/upload', upload.single('files'), async (req, res, next) => {
  const loc = path.join(__dirname, '../uploads');
  const jsonObj = await csv().fromFile(`${loc}/upload${result + 1}.csv`);
  const saved = true;
  var today = new Date();
  jsonObj.forEach(element => {
    var obj = new User({
      name: element.Name,
      age: today.getFullYear() - Number(element.DOB.substr(6, 4)),
      salary: element.Salary,
      tax: 0.15 * Number(element.Salary),
    });
    try {
      obj.save();
      next();
    } catch (error) {
      saved = false;
      console.log(error);
    }
  });
  if (saved) res.redirect('/userData');
});

module.exports = router;
