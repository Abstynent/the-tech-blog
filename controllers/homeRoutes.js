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
        console.log(posts)
        res.render('homepage', {
            posts
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ["name"]
                }
            },
            {
                model: User,
                attributes: ["id", "name"]
            }
        ]
    })
    .then(data => {
        if(!data) {
            res.status(404).json({ message: "A post with this ID could not be found."});
            return;
        };

        const post = data.get({ plain: true });
        console.log(post.comments)
        res.render("post", { post, logged_in: req.session.logged_in });
    })
    .catch( err => res.status(500).json(err));
});

router.get('/dashboard', withAuth, (req,res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id,
        }
    }).then(postData => {
        if(!postData) {
            console.log("no posts")
            res.status(404).json({ message: "No post assigned to this user."});
            return;
        };

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        })
    }).catch(error => res.status(500).json(error))
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/sign-up', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('sign-up')
});

router.get('logout', (req, res) => {
    res.redirect('/');
});

module.exports = router;