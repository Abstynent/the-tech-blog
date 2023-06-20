const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/withAuth');

// Homepage route
router.get('/', async (req, res) => {
    try {
        // Retrieve all posts from the database, including the associated user
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        });

        // Map the retrieved post data to plain objects
        const posts = postData.map((post) => post.get({ plain: true }));

        // Render the homepage template and pass the posts data
        res.render('homepage', {
            posts
        });
    } catch (error) {
        // If there is an error retrieving the posts, send a 500 (Internal Server Error) response with the error object
        res.status(500).json(error);
    }
});

// Add post route
router.get('/add-post', withAuth, (req, res) => {
    // Render the add-post template
    res.render('add-post');
})

// Single post route
router.get('/post/:id', withAuth, async (req, res) => {
    // Find a post with the specified ID, including associated comments and the user who made the comment
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
            // If no post is found, send a 404 (Not Found) response with a message
            res.status(404).json({ message: "A post with this ID could not be found."});
            return;
        };

        // Get the plain object representation of the post data
        const post = data.get({ plain: true });

        // Render the post template and pass the post data and logged_in status
        res.render("post", { post, logged_in: req.session.logged_in });
    })
    .catch( err => res.status(500).json(err));
});

// Dashboard route
router.get('/dashboard', withAuth, (req,res) => {
    // Retrieve all posts associated with the logged-in user
    Post.findAll({
        where: {
            user_id: req.session.user_id,
        }
    }).then(postData => {
        if(!postData) {
            // If no posts are found, send a 404 (Not Found) response with a message
            console.log("no posts")
            res.status(404).json({ message: "No post assigned to this user."});
            return;
        };

        // Map the retrieved post data to plain objects
        const posts = postData.map((post) => post.get({ plain: true }));

        // Render the dashboard template and pass the posts data, logged_in status, and user_id
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        })
    }).catch(error => res.status(500).json(error))
});

// Login route
router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        // If the user is already logged in, redirect to the homepage
        res.redirect('/');
        return;
    }

    // Render the login template
    res.render('login');
});

// Sign-up route
router.get('/sign-up', (req, res) => {
    if(req.session.logged_in) {
        // If the user is already logged in, redirect to the homepage
        res.redirect('/');
        return;
    }

    // Render the sign-up template
    res.render('sign-up')
});

// Logout route
router.get('logout', (req, res) => {
    // Redirect to the homepage
    res.redirect('/');
});

module.exports = router;
