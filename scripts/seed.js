// simple script to add sample students and an admin user
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('../config/db');
const Student = require('../models/Student');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const run = async () => {
  await connectDB();
  await Student.deleteMany({});
  await User.deleteMany({});
  const students = [
    { studentId: 'S001', name: 'Ada Lovelace', email: 'ada@example.com', course: 'CS101' },
    { studentId: 'S002', name: 'Alan Turing', email: 'alan@example.com', course: 'CS101' }
  ];
  await Student.insertMany(students);
  const salt = await bcrypt.genSalt(10);
  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: await bcrypt.hash('password123', salt), role: 'admin' });
  console.log('Seeded', admin.email);
  process.exit();
};

run().catch(err => { console.error(err); process.exit(1); });
