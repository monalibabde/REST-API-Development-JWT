require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// DB Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/ipos', require('./routes/ipoRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
