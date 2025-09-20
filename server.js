const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const lectureRoutes = require('./routes/lectures');
const attendanceRoutes = require('./routes/attendance');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/attendance', attendanceRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
