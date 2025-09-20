const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseCode: { type: String, required: true },
  scheduledAt: { type: Date, required: true },   // date/time of lecture
  durationMinutes: { type: Number, default: 60 },
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] // students expected
}, { timestamps: true });

module.exports = mongoose.model('Lecture', lectureSchema);
