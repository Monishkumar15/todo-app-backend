const express = require("express");
const router = express.Router();

const authenticateToken = require("../middlewares/auth.middleware");
const { validateCreateTask } = require("../middlewares/task.middleware");
const taskController = require("../controllers/task.controller");

// POST /api/tasks
router.post(
  "/",
  authenticateToken,
  validateCreateTask,
  taskController.createTask
);

// Get all tasks for logged-in user
router.get("/", authenticateToken, taskController.getAllTasks);

// GET /api/tasks/:id
router.get('/:id', authenticateToken, taskController.getTaskById);


router.put('/:id', authenticateToken, taskController.updateTask);

module.exports = router;
