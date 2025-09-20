const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createLecture, getLectures, getLectureById, updateLecture, deleteLecture } = require('../controllers/lectureController');

router.route('/')
  .post(protect, createLecture)
  .get(protect, getLectures);

router.route('/:id')
  .get(protect, getLectureById)
  .put(protect, updateLecture)
  .delete(protect, deleteLecture);

module.exports = router;
