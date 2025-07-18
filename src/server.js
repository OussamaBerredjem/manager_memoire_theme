const dotenv = require('dotenv');
const app = require('../src/app');


// Import the dbController to handle the database connection
const { connectDB } = require('./controllers/dbController');

// Load environment variables
dotenv.config();

// Initialize the database connection
const init = async () => {
  await connectDB(); // Connect to the database
  startServer(); // Start the Express server
};

// Start the server
const startServer = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

init();
