const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  incidentType: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  yourRole: {
    type: String,
    required: true
  },
  evidence: {
    type: String,
  },
  anonymous: {
    type: Boolean,
    default: true
  },
  flagged: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);
