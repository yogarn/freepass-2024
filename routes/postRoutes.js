const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const postMiddleware = require('../middleware/postMiddleware');
const userMiddleware = require('../middleware/userMiddleware');

router.get('/', authMiddleware.authenticateUser, postMiddleware.checkPostExistence, userMiddleware.checkUserExistence, postController.viewPost);
router.post('/', authMiddleware.authenticateUser, authMiddleware.getUserInfo, userMiddleware.checkUserStatus(["candidate"]), postController.addPost);
router.put('/:id', authMiddleware.authenticateUser, authMiddleware.getUserInfo, userMiddleware.checkUserStatus(["candidate"]), postMiddleware.checkPostExistence, postMiddleware.checkPostOwnership, postController.editPost);
router.delete('/:id', authMiddleware.authenticateUser, authMiddleware.getUserInfo, userMiddleware.checkUserStatus(["candidate", "admin"]), postMiddleware.checkPostExistence, postMiddleware.checkPostOwnership, postController.deletePost);

module.exports = router;
