// Middleware function for authentication
const withAuth = (req, res, next) => {
    // Check if the user is logged in based on the 'logged_in' property in the session
    if (!req.session.logged_in) {
      // If not logged in, redirect the user to the login page
      res.redirect('/login');
    } else {
      // If logged in, continue to the next middleware or route handler
      next();
    }
  };
  
  // Export the 'withAuth' middleware function
  module.exports = withAuth;
  