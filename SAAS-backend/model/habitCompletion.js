const mongoose = require('mongoose');

const habitCompletionSchema = new mongoose.Schema({
  completionId: {
    type: String,
    required: true,
    unique: true
  },
  habitId: {
    type: String,
    required: true,
    ref: 'Habit'
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  completionDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  isManual: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HabitCompletion', habitCompletionSchema);