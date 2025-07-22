const express = require("express");
const router = express.Router();
const { createPost, getPosts } = require("../controllers/postController");

/** PUBLIC ROUTES */
router.post("/", createPost); // POST /api/posts
router.get("/", getPosts);    // GET /api/posts

module.exports = router;
