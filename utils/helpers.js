// helpers.js

// Import the 'handlebars' module
const handlebars = require('handlebars');

// Register a helper function to format dates
handlebars.registerHelper('format_date', (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Convert the input 'date' to a formatted date string using the specified options
  return new Date(date).toLocaleDateString('en-US', options);
});

// Register a helper function to format times
handlebars.registerHelper('format_time', (date) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  // Convert the input 'date' to a formatted time string using the specified options
  return new Date(date).toLocaleTimeString('en-US', options);
});

// Export the 'handlebars' module, including the registered helper functions
module.exports = handlebars;
