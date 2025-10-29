const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

// Index for habits router
router.get('/', (req, res) => {
  res.json({
    message: 'Habits API',
    endpoints: [
      'GET /user/:userId',
      'GET /:id',
      'POST /',
      'PUT /:id',
      'DELETE /:id'
    ]
  });
});

// GET all habits for a user
// URL: GET /api/habits/user/:userId
router.get('/user/:userId', habitController.getAllHabits);

// GET a specific habit by ID
// URL: GET /api/habits/:id
router.get('/:id', habitController.getHabitById);

// POST create a new habit
// URL: POST /api/habits
router.post('/', habitController.createHabit);

// PUT update a habit
// URL: PUT /api/habits/:id
router.put('/:id', habitController.updateHabit);

// DELETE a habit
// URL: DELETE /api/habits/:id
router.delete('/:id', habitController.deleteHabit);

module.exports = router;