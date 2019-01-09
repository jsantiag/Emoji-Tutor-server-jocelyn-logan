'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  list: [{
    emoji: { type: mongoose.Schema.Types.ObjectId, ref: 'Emoji' },
    weight: { type: Number, required: true, default: 1 },
    next: Number
  }],
  head: { type: Number, required: true, default: 0 }
});

UserSchema.methods.serialize = function () {
  return {
    username: this.username || '',
  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', UserSchema);