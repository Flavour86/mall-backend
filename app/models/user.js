import {username, email} from '../utils/pattern'
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date, default: Date.now },

  username: {
    type: String,
    trim: true,
    unique: true,
    match: username,
    index: true,
  },
  salt: String,
  password: String,
  email: {
    type: String,
    match: email,
    trim: true,
    unique: true
  },
  avatar: {
    type: String,
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
