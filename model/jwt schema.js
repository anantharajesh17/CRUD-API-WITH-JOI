const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create a User model
var User2 =  new mongoose.model('User2', userSchema);

module.exports = User2