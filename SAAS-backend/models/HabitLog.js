const mongoose = require('mongoose');

const habitLogSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completedDate: {
    type: Date,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index to ensure one log per habit per day
habitLogSchema.index({ habitId: 1, completedDate: 1 }, { unique: true });

module.exports = mongoose.model('HabitLog', habitLogSchema);