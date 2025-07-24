const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
  softDeletePost,
} = require("../controllers/postController");

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);

// Likes
router.patch("/:id/like", likePost);
router.patch("/:id/unlike", unlikePost);

// Comments
router.post("/:id/comments", addComment);
router.delete("/:id/comments/:commentId", deleteComment);

module.exports = router;
