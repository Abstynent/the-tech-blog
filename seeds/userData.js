const { User } = require('../models');

const userData = [
    {
        name: "wookash",
        email: "wookash@outlook.com",
        password: "qwertyui",
    },
    {
        name: "Lukasz",
        email: "lukasz@outlook.com",
        password: "qwertyui",
    },
    {
        name: "Abstynent",
        email: "abstynent@outlook.com",
        password: "qwertyui",
    }
];

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUser;