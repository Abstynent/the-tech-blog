const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts
        });
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/sign-up', (req, res) => {
    res.render('sign-up')
});

router.get('logout', (req, res) => {
    res.redirect('/');
});

module.exports = router;