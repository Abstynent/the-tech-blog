const { Post } = require('../models');

const postData = [
    {
        title: "Aliens attack",
        content: "3rd day of aliens invasion",
        user_id: 2
    },
    {
        title: "Man must explore",
        content: "Problems look mighty small from 150 miles up",
        user_id: 3
    },
    {
        title: "Random Post title",
        content: "Random Post content",
        user_id: 1
    },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;