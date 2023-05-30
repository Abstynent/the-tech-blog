const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');

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
// router.get('/:id', async (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: ['id', 'name'],
//                 },
//             ]
//         });

//         const post = postData.get({ plain: true });
//         console.log(post);

//         res.render('post', {
//             post,
//             logged_in: req.session.logged_in,
//         });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });
// router.get('/:id', async (req, res) => {
//     console.log(req.params.id)
//     try {
//         const postData = await Post.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: ['id', 'name'],
//                 },
//             ]
//         });

//         const post = postData.get({ plain: true });
//         console.log(post);

//         res.render('post', {
//             ...post,
//             logged_in: req.session.logged_in,
//         });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })
module.exports = router;