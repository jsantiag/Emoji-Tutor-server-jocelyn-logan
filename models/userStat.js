'use strict';

const mongoose = require('mongoose');

const UserStatSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  correct: { type: Number, default: 0 },
  incorrect: { type: Number, default: 0 },
  score: { type: Number, default: 0 }
});

module.exports = mongoose.model('UserStat', UserStatSchema); 