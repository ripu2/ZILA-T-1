const express = require('express');
const router = new express.Router();
const User = require('../models/userData');
router.get('/userData', async (req, res) => {
  const user = await User.find();
  //res.send(user);
  res.render('list', {
    Users: user,
  });
});
module.exports = router;
