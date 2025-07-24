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
  replyToComment
} = require("../controllers/postController");

const { auth, isAdmin } = require("../middleware/auth");

// Public routes
router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostById);
router.post("/:id/like", likePost);
router.post("/:id/unlike", unlikePost);
router.post("/:id/comments", addComment);
// routes/postRoutes.js
router.post('/:postId/like', toggleLikePost); // No verifyToken
router.post('/:postId/comments', addComment); // No verifyToken

// Authenticated route for replying to comments
router.post('/:postId/comments/:commentId/replies', replyToComment);
router.post('/:postId/like', toggleLikePost);

// Authenticated user can delete their own comment
router.delete("/:id/comments/:commentId", auth, deleteComment);
router.delete('/:postId/comments/:commentId', verifyToken, deleteComment);
router.delete('/:postId', verifyToken, verifyAdmin, deletePost);

// Admin-only actions
router.delete("/:id", auth, isAdmin, softDeletePost);
router.post("/:id/flag", auth, isAdmin, flagPost);

module.exports = router;
