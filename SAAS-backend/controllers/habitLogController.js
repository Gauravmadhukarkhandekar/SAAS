const HabitLog = require('../models/habitLog');

exports.getHabitLogs = async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const logs = await HabitLog.find({ habitId: habitId }).sort({ completedDate: -1 });
    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching habit logs',
      error: error.message
    });
  }
};

exports.getHabitLogById = async (req, res) => {
  try {
    const logId = req.params.id;
    const log = await HabitLog.findById(logId);
    if (!log) {
      return res.status(404).json({
        success: false,
        message: 'Habit log not found'
      });
    }
    res.status(200).json({
      success: true,
      data: log
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching habit log',
      error: error.message
    });
  }
};

exports.createHabitLog = async (req, res) => {
  try {
    const { habitId, userId, completedDate, isCompleted, duration, difficulty, mood, energyLevel, notes } = req.body;
    if (!habitId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'habitId and userId are required'
      });
    }
    if (isCompleted && !duration) {
      return res.status(400).json({
        success: false,
        message: 'Duration is required when marking as complete'
      });
    }
    const newLog = new HabitLog({
      habitId,
      userId,
      completedDate: completedDate || new Date(),
      isCompleted: isCompleted || false,
      duration: isCompleted ? duration : 0,
      difficulty: difficulty || null,
      mood: mood || null,
      energyLevel: energyLevel || null,
      notes: notes || null
    });
    const savedLog = await newLog.save();
    res.status(201).json({
      success: true,
      message: 'Habit log created successfully',
      data: savedLog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating habit log',
      error: error.message
    });
  }
};

exports.updateHabitLog = async (req, res) => {
  try {
    const logId = req.params.id;
    const updateData = req.body;
    const updatedLog = await HabitLog.findByIdAndUpdate(
      logId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedLog) {
      return res.status(404).json({
        success: false,
        message: 'Habit log not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Habit log updated successfully',
      data: updatedLog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating habit log',
      error: error.message
    });
  }
};

exports.deleteHabitLog = async (req, res) => {
  try {
    const logId = req.params.id;
    const deletedLog = await HabitLog.findByIdAndDelete(logId);
    if (!deletedLog) {
      return res.status(404).json({
        success: false,
        message: 'Habit log not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Habit log deleted successfully',
      data: deletedLog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting habit log',
      error: error.message
    });
  }
};