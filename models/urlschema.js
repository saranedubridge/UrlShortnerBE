// models/Url.js
const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0, // Initialize count to 0 for new URLs
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model('Url', UrlSchema);

module.exports = Url;
