const pool = require('../config/db');

const createTask = async ({ title, description, status, userId }) => {
  const result = await pool.query(
    `INSERT INTO todos (title, description, status, user_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id, title, description, status, user_id, created_at`,
    [title, description, status, userId]
  );

  return result.rows[0];
};

const getTasksByUserId = async (userId) => {
  const query = `
    SELECT id, title, description, status, created_at
    FROM todos
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;

  const { rows } = await pool.query(query, [userId]);
  return rows;
};

module.exports = {
  createTask,
  getTasksByUserId,
};
