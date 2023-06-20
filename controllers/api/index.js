const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Mount user routes under the '/users' endpoint
router.use('/users', userRoutes);

// Mount post routes under the '/post' endpoint
router.use('/post', postRoutes);

// Mount comment routes under the '/comment' endpoint
router.use('/comment', commentRoutes);

// Export the router
module.exports = router;
