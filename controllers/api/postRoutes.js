const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/withAuth');

// Create a new post
router.post("/", withAuth, (req, res) => {
  // Use the Post model to create a new post
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      // If there is an error creating the post, log the error and send a 500 (Internal Server Error) response
      console.log(err);
      res.status(500).json(err);
    });
});

// Update an existing post
router.put("/:id", withAuth, (req, res) => {
  // Use the Post model to update the post with the specified ID
  Post.update(
    {
      title: req.body.post_title,
      content: req.body.post_content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((postData) => {
      if (!postData) {
        // If no post is updated (postData is 0), send a 404 (Not Found) response with a message
        res.status(404).json({ message: "A post with this ID could not be found" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      // If there is an error updating the post, log the error and send a 500 (Internal Server Error) response
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a post
router.delete("/:id", withAuth, (req, res) => {
  // Use the Post model to delete the post with the specified ID
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      if (!postData) {
        // If no post is deleted (postData is 0), send a 404 (Not Found) response with a message
        res.status(404).json({ message: "A post with this ID could not be found" });
        return;
      }
      res.json({ message: "Post successfully deleted" });
    })
    .catch((err) => {
      // If there is an error deleting the post, log the error and send a 500 (Internal Server Error) response
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
