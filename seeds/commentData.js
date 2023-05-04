const { Comment } = require('../models');

const commentData = [
    {
        content: "amazing!",
        user_id: 2,
        post_id: 1,
    },
    {
        content: "great!",
        user_id: 3,
        post_id: 3,
    },
    {
        content: "excellent!",
        user_id: 1,
        post_id: 2,
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;