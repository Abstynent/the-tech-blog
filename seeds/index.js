// Import necessary modules and files
const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedPost = require('./postData');
const seedComment = require('./commentData');

// Function to seed the database with initial data
const seedDatabase = async () => {
  // Sync the database and force a table recreation
  await sequelize.sync({ force: true });

  // Seed users data
  await seedUser();

  // Seed posts data
  await seedPost();

  // Seed comments data
  await seedComment();

  // Exit the process after seeding is complete
  process.exit(0);
};

// Call the seedDatabase function to initiate the seeding process
seedDatabase();
