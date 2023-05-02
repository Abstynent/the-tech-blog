const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
    // try {
    //     res.render('homepage');
    // } catch (error) {
    //     res.status(500).json(error);
    // }
})

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/sign-up', (req, res) => {
    res.render('sign-up')
});

router.get('logout', (req, res) => {
    res.redirect('/');
});

module.exports = router;