const taskModel = require('../models/task.model');

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.id;

    const task = await taskModel.createTask({
      title,
      description: description || null,
      status: status || 'todo',
      userId,
    });

    return res.status(201).json(task);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to create task',
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await taskModel.getTasksByUserId(userId);

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to fetch tasks',
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const userId = req.user.id;

    console.log('Task ID:', taskId);
    console.log('User ID:', userId);

    if (isNaN(taskId)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const task = await taskModel.getTaskById(taskId);

    console.log('Task from DB:', task);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user_id !== userId) {
      return res.status(403).json({
        message: 'You are not allowed to access this task',
      });
    }

    return res.status(200).json(task);

  } catch (error) {
    console.error('GET TASK ERROR:', error);
    return res.status(500).json({
      message: 'Failed to fetch task',
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
};
