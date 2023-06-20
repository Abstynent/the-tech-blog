const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');

router.post("/", withAuth, (req, res) => {
  Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
  })
      .then((postData) => res.json(postData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.put("/:id", withAuth, (req, res) => {
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
          res
            .status(404)
            .json({ message: "A post with this ID could not be found" });
          return;
        }
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.delete("/:id", withAuth, (req, res) => {
    console.log(req.params.id)
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((postData) => {
        if (!postData) {
          res
            .status(404)
            .json({ message: "A post with this ID could not be found" });
          return;
        }
        res.json({ message: "Post successfully deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;