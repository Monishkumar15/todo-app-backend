const VALID_STATUS = ['todo', 'in-progress', 'done'];

const validateCreateTask = (req, res, next) => {
  const { title, status } = req.body;

  // Title validation
  if (!title || title.trim() === '') {
    return res.status(400).json({
      message: 'Title is required',
    });
  }

  // Status validation
  if (status && !VALID_STATUS.includes(status)) {
    return res.status(400).json({
      message: 'Invalid task status',
    });
  }

  next(); // ✅ validation passed
};

module.exports = {
  validateCreateTask,
};
