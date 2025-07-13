const mongoose = require('mongoose');

const adminLogSchema = new mongoose.Schema({
  email: String,
  action: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AdminLog', adminLogSchema);
