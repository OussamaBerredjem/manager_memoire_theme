const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Sequelize instance and connect to the MySQL database
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name from .env
  process.env.DB_USER, // Database user from .env
  process.env.DB_PASSWORD, // Database password from .env
  {
    host: process.env.DB_HOST, // Database host from .env
    dialect: 'mysql', // Using MySQL dialect
    logging: false, // Optional: Set to true if you want to see SQL queries
  }
);

// Test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = {
  connectDB,
  sequelize, // Export the sequelize instance if needed in other parts of the app
};
