const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');

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