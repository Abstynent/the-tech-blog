const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    console.log('userRoutes.js');

    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;