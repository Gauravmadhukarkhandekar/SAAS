
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
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