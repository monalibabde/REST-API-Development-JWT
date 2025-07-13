const mongoose = require('mongoose');

const ipoSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  title: String,
  openDate: Date,
  closeDate: Date,
  document: String  // PDF file path
});

module.exports = mongoose.model('Ipo', ipoSchema);
