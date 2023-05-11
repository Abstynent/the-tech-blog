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
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'name'],
                },
            ]
        });

        const post = postData.get({ plain: true });
        console.log(post);

        res.render('post', {
            post,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/dashboard', withAuth, (req,res) => {
    res.render('dashboard');
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