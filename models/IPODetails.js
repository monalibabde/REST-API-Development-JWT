const mongoose = require('mongoose');

const ipoSchema = new mongoose.Schema({
  name: String,
  openDate: String,
  closeDate: String,
  document: {
    type: String, // to store PDF filename
    default: null
  }
  // Add other fields as needed
});

module.exports = mongoose.model('IPO', ipoSchema);
