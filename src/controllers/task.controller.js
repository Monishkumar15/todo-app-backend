const taskModel = require('../models/task.model');

const ALLOWED_STATUS = ['todo', 'in-progress', 'done'];

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

const updateTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const userId = req.user.id;
    const { title, description, status } = req.body;

    // 🔴 Validate task id
    if (isNaN(taskId)) {
      return res.status(400).json({ message: 'Invalid task id please enter the valid task id' });
    }
    // 1 Validate status
    if (status && !ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({
        message: 'Invalid status value'
      });
    }

    // 2️ Fetch task
    const task = await taskModel.getTaskById(taskId);

    // 3️ Task not found
    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    // 4️ Ownership check
    if (task.user_id !== userId) {
      return res.status(403).json({
        message: 'You are not allowed to update this task'
      });
    }

    // 5️ Use existing values if not provided
    const updatedTask = await taskModel.updateTask(
      taskId,
      title ?? task.title,
      description ?? task.description,
      status ?? task.status
    );

    // 6️ Success
    return res.status(200).json(updatedTask);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to update task'
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
};
