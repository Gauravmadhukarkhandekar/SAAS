const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  habitId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  frequency: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly']
  },
  reminderTime: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['health', 'fitness', 'productivity', 'learning', 'personal', 'other']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Habit', habitSchema);