const mongoose = require('mongoose');

const crimeReportSchema = new mongoose.Schema({
  crimeType: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  dateTime: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['reported', 'resolved' , 'closed'], 
    default: 'reported'
  }
}, { timestamps: true });

module.exports = mongoose.model('CrimeReport', crimeReportSchema);
