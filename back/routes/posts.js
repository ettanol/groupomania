const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const { addPost,
        updatePost,
        deletePost,
        getOnePost,
        getAllPosts,
        likeOnePost} = require('../controllers/posts')

// Post management
router.route('/').get(auth, getAllPosts)
                 .post(auth, multer, addPost)
router.route('/:id').put(auth, multer, updatePost)
                    .get(auth, getOnePost)
                    .delete(auth, multer, deletePost)
router.route('/:id/like').post(auth, likeOnePost)

module.exports = router
