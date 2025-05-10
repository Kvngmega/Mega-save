
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
  balance: { type: Number, default: 0 },
  totalSaved: { type: Number, default: 0 },
  joinedAt: { type: Date, default: Date.now },
  lastSavedAt: Date,
  active: { type: Boolean, default: true },
  canWithdraw: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
