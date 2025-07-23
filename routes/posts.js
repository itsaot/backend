const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
} = require("../controllers/postController");
const { auth } = require("../middleware/auth");

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);

module.exports = router;
