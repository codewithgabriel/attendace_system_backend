const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String },
  course: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
