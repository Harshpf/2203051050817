const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  timestamp: Date,
  referrer: String,
  geo: String
});

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortCode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiry: Date,
  clicks: [clickSchema],
  clickCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Url', urlSchema);