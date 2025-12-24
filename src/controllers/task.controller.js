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


module.exports = {
  createTask,
  getAllTasks,
};
