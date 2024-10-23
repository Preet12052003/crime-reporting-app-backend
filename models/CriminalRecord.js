const mongoose = require('mongoose');

const criminalRecordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  crimeDetails: { type: String, required: true },
  arrestDate: { type: Date },
  status: { type: String, required: true },  // e.g., 'arrested', 'at-large'
}, { timestamps: true });

module.exports = mongoose.model('CriminalRecord', criminalRecordSchema);