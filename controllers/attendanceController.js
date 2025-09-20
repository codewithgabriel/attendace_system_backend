const asyncHandler = require('express-async-handler');
const Attendance = require('../models/Attendance');
const Lecture = require('../models/Lecture');
const Student = require('../models/Student');

// POST /api/attendance/mark
// { lectureId, studentId, status }
const markAttendance = asyncHandler(async (req, res) => {
  const { lectureId, studentId, status } = req.body;
  const lecture = await Lecture.findById(lectureId);
  if (!lecture) { res.status(404); throw new Error('Lecture not found'); }
  const student = await Student.findById(studentId);
  if (!student) { res.status(404); throw new Error('Student not found'); }

  const update = { lecture: lectureId, student: studentId, status, markedBy: req.user._id, timestamp: new Date() };
  const record = await Attendance.findOneAndUpdate(
    { lecture: lectureId, student: studentId },
    update,
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  res.json(record);
});

// GET /api/attendance/lecture/:lectureId
const getAttendanceForLecture = asyncHandler(async (req, res) => {
  const records = await Attendance.find({ lecture: req.params.lectureId })
    .populate('student', 'studentId name email')
    .populate('markedBy', 'name email');
  res.json(records);
});

// GET /api/attendance/student/:studentId/report
const getStudentReport = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const reports = await Attendance.find({ student: studentId })
    .populate('lecture', 'title courseCode scheduledAt')
    .sort({ timestamp: -1 });
  res.json(reports);
});

module.exports = { markAttendance, getAttendanceForLecture, getStudentReport };
