const express = require('express');
const router = express.Router();

const {
    addPost,
    getPosts,
    getSinglePost
} = require('../controllers/index2.js');

router.route('/CreatePost').post(addPost);
router.route('/').get(getPosts)
router.route('/:id').get(getSinglePost)

module.exports = router;