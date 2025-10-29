const Habit = require('../models/Habit');

exports.getAllHabits = async (req, res) => {
  try {
    const userId = req.params.userId;
    const habits = await Habit.find({ userId: userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: habits.length,
      data: habits
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching habits',
      error: error.message
    });
  }
};

exports.getHabitById = async (req, res) => {
  try {
    const habitId = req.params.id;
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }
    res.status(200).json({
      success: true,
      data: habit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching habit',
      error: error.message
    });
  }
};

exports.createHabit = async (req, res) => {
  try {
    const { userId, name, description, reminder, frequency, category } = req.body;
    if (!userId || !name) {
      return res.status(400).json({
        success: false,
        message: 'userId and name are required'
      });
    }
    const newHabit = new Habit({
      userId,
      name,
      description,
      reminder,
      frequency,
      category
    });
    const savedHabit = await newHabit.save();
    res.status(201).json({
      success: true,
      message: 'Habit created successfully',
      data: savedHabit
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating habit',
      error: error.message
    });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    const updateData = req.body;
    const updatedHabit = await Habit.findByIdAndUpdate(
      habitId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedHabit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Habit updated successfully',
      data: updatedHabit
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating habit',
      error: error.message
    });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    const deletedHabit = await Habit.findByIdAndDelete(habitId);
    if (!deletedHabit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Habit deleted successfully',
      data: deletedHabit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting habit',
      error: error.message
    });
  }
};