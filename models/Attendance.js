const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  status: { type: String, enum: ['present', 'absent', 'late'], default: 'absent' },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // who marked
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

// Ensure one record per lecture+student
attendanceSchema.index({ lecture: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
