const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
} = require("../controllers/postController");
const { auth } = require("../middleware/auth");

router.get("/:id", getPostById);

module.exports = router;
