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
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/habitLogs', habitLogRoutes);
app.use('/api/reminders', reminderRoutes);

app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/api/health', (_req, res) => res.json({ message: 'Server is running' }));
app.get('/', (_req, res) => res.send('API is running'));

// Only connect to DB and start server if NOT in test mode
if (process.env.NODE_ENV !== 'test') {
  const MONGODB_URI = process.env.MONGODB_URI;
  const PORT = process.env.PORT || 3001;
  const HOST = '0.0.0.0';   // ⭐ REQUIRED FOR AZURE

  if (!MONGODB_URI) {
    console.error("❌ ERROR: MONGODB_URI is not set in Azure App Settings.");
  }

  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, HOST, () => {
        console.log(`Server running on http://${HOST}:${PORT}`);
      });
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
    });
}

module.exports = app;
