const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');


router.post('/', withAuth, (req, res) => {

    if(req.session.logged_in) { 
        Comment.create({
            content: req.body.content,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        .then(commentData => {
            console.log(commentData)
            res.json(commentData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }

});

module.exports = router;