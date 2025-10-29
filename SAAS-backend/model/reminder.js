const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  reminderId: {
    type: String,
    required: true,
    unique: true
  },
  habitId: {
    type: String,
    required: true,
    ref: 'Habit'
  },
  timeOfDay: {
    type: String,
    required: true
  },
  isEnabled: {
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

module.exports = mongoose.model('Reminder', reminderSchema);