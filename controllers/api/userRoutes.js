const router = require('express').Router();
const { User } = require('../../models');

// Sign-up route
router.post('/', async (req, res) => {
    try {
        // Create a new user using the User model
        const userData = await User.create(req.body);

        // Save the user's ID and logged_in status in the session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            // Send a 200 (OK) response with the user data
            res.status(200).json(userData);
        });
    } catch (error) {
        // If there is an error creating the user, send a 400 (Bad Request) response with the error object
        res.status(400).json(error);
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        // Find the user with the provided email using the User model
        const userData = await User.findOne({
            where: { email: req.body.email }
        });

        if(!userData) {
            // If no user is found, send a 400 (Bad Request) response with a message
            res.status(400).json({ message: 'Incorrect email or password, please try again.'});
            return;
        };

        // Check if the provided password matches the user's password
        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            // If the password is invalid, send a 400 (Bad Request) response with a message
            res.status(400).json({ message: 'Incorrect email or password, please try again.'});
            return;
        };

        // Save the user's ID and logged_in status in the session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            // Send a JSON response with the user data and a success message
            res.json({ user: userData, message: "You are logged in!"});
        })
    } catch (error) {
        // If there is an error during login, send a 400 (Bad Request) response with the error object
        alert("Incorrect email or password, please try again.")
        res.status(400).json(err);
    }
});

// Logout route
router.post('/logout', (req, res) => {
    if(req.session.logged_in) {
        // Destroy the session and send a 204 (No Content) response
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        // If the user is not logged in, send a 404 (Not Found) response
        res.status(404).end();
    }
})

module.exports = router;
