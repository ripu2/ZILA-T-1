const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fs = require('fs');

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('uploads');
}

app.set('view engine', 'ejs');
app.use(express.static(`Public`));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const upload = require('./Routes/UploadRoute');
const viewData = require('./Routes/viewRoute');
app.use(upload);
app.use(viewData);
require('./models/mongo.js');
app.listen(3000, () => {
  console.log('server is up');
});
