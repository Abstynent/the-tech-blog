const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');

// POST route for creating a new comment, with authentication middleware
router.post('/', withAuth, (req, res) => {

    // Check if the user is logged in
    if (req.session.logged_in) {
        // If the user is logged in, create a new comment using the Comment model
        Comment.create({
            content: req.body.content,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        .then(commentData => {
            // If the comment is created successfully, log the comment data and send it as a response
            console.log(commentData);
            res.json(commentData);
        })
        .catch(err => {
            // If there is an error creating the comment, log the error and send a 400 (Bad Request) response
            console.log(err);
            res.status(400).json(err);
        });
    }

});

// Export the router
module.exports = router;
