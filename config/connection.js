const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Check if a JAWSDB_URL environment variable is available
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is present, create a new Sequelize instance using the URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not present, create a new Sequelize instance using the environment variables for local development
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306
    }
  );
}

// Export the sequelize instance
module.exports = sequelize;
