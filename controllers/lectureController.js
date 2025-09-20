const asyncHandler = require('express-async-handler');
const Lecture = require('../models/Lecture');
const Student = require('../models/Student');

// POST /api/lectures - create lecture (protected)
const createLecture = asyncHandler(async (req, res) => {
  const { title, courseCode, scheduledAt, durationMinutes, students = [] } = req.body;
  const lecture = await Lecture.create({
    title, courseCode, scheduledAt, durationMinutes,
    lecturer: req.user._id,
    students
  });
  res.status(201).json(lecture);
});

// GET /api/lectures - list (with optional lecturer filter)
const getLectures = asyncHandler(async (req, res) => {
  const query = {};
  if (req.user.role !== 'admin') query.lecturer = req.user._id;
  const lectures = await Lecture.find(query).populate('lecturer', 'name email').populate('students', 'studentId name email');
  res.json(lectures);
});

// GET /api/lectures/:id
const getLectureById = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id).populate('lecturer', 'name email').populate('students', 'studentId name email');
  if (!lecture) { res.status(404); throw new Error('Lecture not found'); }
  res.json(lecture);
});

// PUT /api/lectures/:id - update
const updateLecture = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  if (!lecture) { res.status(404); throw new Error('Lecture not found'); }
  // only lecturer or admin
  if (!(req.user.role === 'admin' || lecture.lecturer.equals(req.user._id))) {
    res.status(403); throw new Error('Not allowed to edit this lecture');
  }
  const fields = ['title','courseCode','scheduledAt','durationMinutes','students'];
  fields.forEach(f => { if (req.body[f] !== undefined) lecture[f] = req.body[f]; });
  const updated = await lecture.save();
  res.json(updated);
});

// DELETE /api/lectures/:id
const deleteLecture = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  if (!lecture) { res.status(404); throw new Error('Lecture not found'); }
  if (!(req.user.role === 'admin' || lecture.lecturer.equals(req.user._id))) {
    res.status(403); throw new Error('Not allowed to delete this lecture');
  }
  await lecture.remove();
  res.json({ message: 'Lecture removed' });
});

module.exports = { createLecture, getLectures, getLectureById, updateLecture, deleteLecture };
