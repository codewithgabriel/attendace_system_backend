const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { markAttendance, getAttendanceForLecture, getStudentReport } = require('../controllers/attendanceController');

router.post('/mark', protect, markAttendance);
router.get('/lecture/:lectureId', protect, getAttendanceForLecture);
router.get('/student/:studentId/report', protect, getStudentReport);

module.exports = router;
