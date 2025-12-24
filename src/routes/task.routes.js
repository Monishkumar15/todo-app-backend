const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth.middleware');
const { validateCreateTask } = require('../middlewares/task.middleware');
const taskController = require('../controllers/task.controller');

// POST /api/tasks
router.post(
  '/',
  authenticateToken,
  validateCreateTask,
  taskController.createTask
);


// Get all tasks for logged-in user
router.get('/', authenticateToken, taskController.getAllTasks);

module.exports = router;
