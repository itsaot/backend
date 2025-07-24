const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  getPostById,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
  softDeletePost,
  flagPost,
  replyToComment // Make sure to implement this in controller
} = require("../controllers/postController");

const { auth, isAdmin } = require("../middleware/auth");

// Public routes
router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostById);
router.post("/:id/like", likePost);
router.post("/:id/unlike", unlikePost);
router.post("/:id/comments", addComment);

// Authenticated route for replying to comments
router.post('/:postId/comments/:commentId/replies', auth, replyToComment);

// Authenticated user can delete their own comment
router.delete("/:id/comments/:commentId", auth, deleteComment);

// Admin-only actions
router.delete("/:id", auth, isAdmin, softDeletePost);
router.post("/:id/flag", auth, isAdmin, flagPost);

module.exports = router;
