
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = new Set([
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:4200',
      'http://127.0.0.1:4200'
    ]);

    const localhostPattern = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

    if (allowedOrigins.has(origin) || localhostPattern.test(origin)) {
      return callback(null, true);
    }

    console.warn('Blocked CORS origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/saas';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Make sure MongoDB is running locally or check your MONGODB_URI in .env file');
  });

// Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/habits', require('./routes/habit.js'));
app.use('/api/habitLogs', require('./routes/habitLog.js'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// API root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'API root',
    endpoints: ['/api/health', '/api/habits', '/api/habitLogs']
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});