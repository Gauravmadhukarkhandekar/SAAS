const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const habitRoutes = require('./routes/habit');
const habitLogRoutes = require('./routes/habitLog');
const reminderRoutes = require('./routes/reminder');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:4200',       // Angular dev server
  credentials: true,                     // because your client uses withCredentials: true
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOptions));
app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/habitLogs', habitLogRoutes);
app.use('/api/reminders', reminderRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'API root', endpoints: ['/api/health', '/api/habits', '/api/habitLogs'] });
});
app.get('/', (_req, res) => res.send('API is running'));

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
app.use('/api/reminders', require('./routes/reminder.js'));

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});