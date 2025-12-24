const express = require('express');
require('./config/db');
const authRoutes = require('./routes/auth.routes');
const app = express();
const taskRoutes = require('./routes/task.routes');

// Middleware to parse JSON
app.use(express.json());

app.use('/api/auth', authRoutes);


app.use('/api/tasks', taskRoutes);

// Health check route
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'API is running 🚀' });
});

module.exports = app;
