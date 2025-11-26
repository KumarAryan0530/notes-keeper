const { Pool } = require('pg');
require('dotenv').config();

const config = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'notes_app',
};

// Only add password if it's not empty or null/undefined
if (process.env.DB_PASSWORD && process.env.DB_PASSWORD.trim()) {
  config.password = process.env.DB_PASSWORD;
}

console.log('📦 PostgreSQL Pool Config:', { user: config.user, host: config.host, database: config.database, hasPassword: !!config.password });
// Restart trigger v2
const pool = new Pool(config);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;
