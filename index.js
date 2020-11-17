const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { request } = require('express');

app.set('view engine', 'ejs');
app.use(express.static(`Public`));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const upload = require('./Routes/UploadRoute');

app.use(upload);
require('./models/mongo.js');
app.listen(3000, () => {
  console.log('server is up');
});
