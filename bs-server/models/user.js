const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.userCount = function(callback){
  User.count(callback);
}

module.exports.getCount = function (callback) {
  User.count(callback);
}

module.exports.getUsers = function(callback){
  const query = {}
  User.find(query, callback);
}
module.exports.deleteUser = function(id, callback){
  const query = {_id : id}
  User.remove(query, callback);
}

module.exports.getUserByEmail = function(email, callback){
  const query = {email: email}
  User.findOne(query, callback);
}
module.exports.getEmail = function(callback){
  const query = {};
  // User.find(query, callback);
  User.find().distinct('email', callback);
}
module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

//for task module for getting users
module.exports.getUser = function(callback){
  User.find().distinct("email", callback);
}