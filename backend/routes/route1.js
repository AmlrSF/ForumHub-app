const express = require('express');
const router = express.Router();

const {
    addPost,
    getPosts,
    getSinglePost,
    like,
    unlike,
    comment,
    getRelatedPosts
} = require('../controllers/index2.js');

router.route('/CreatePost').post(addPost);
router.route('/').get(getPosts);
router.route('/post/:user').get(getRelatedPosts);
router.route('/:id').get(getSinglePost);


router.route('/:postId/like').post(like);
router.route('/:postId/unlike').post(unlike);
router.route('/:postId/comment').post(comment);

module.exports = router;