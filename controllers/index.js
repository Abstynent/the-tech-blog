const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Use the homeRoutes middleware for the root URL '/'
router.use('/', homeRoutes);

// Use the apiRoutes middleware for the '/api' URL
router.use('/api', apiRoutes);

module.exports = router;
