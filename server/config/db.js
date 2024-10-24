const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

// Function to connect to the database
const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

// Exporting query and connect function
module.exports = {
  query: (text, params) => pool.query(text, params),
  connectDB,
};