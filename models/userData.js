const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model('User', userSchema);

module.exports = User;
