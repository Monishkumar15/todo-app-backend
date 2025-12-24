const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// ! Explicit connection
// pool.on('connect', () => {
//   console.log('PostgreSQL connected ✅');
// });


// ! Forces connection
(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('PostgreSQL connected ✅');
  } catch (error) {
    console.error('PostgreSQL connection failed ❌');
    console.error(error.message);
  }
})();

module.exports = pool;
