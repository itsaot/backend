const Post = require("../models/Post");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ ADD THIS FUNCTION
const createPost = async (req, res) => {
  try {
    const { content, author, type, isAnonymous } = req.body;

    if (!content || !author) {
      return res.status(400).json({ message: "Content and author are required" });
    }

    const newPost = new Post({
      content,
      author: isAnonymous ? "Anonymous" : author,
      type: type || "general",
      isAnonymous: isAnonymous || false,
      createdAt: new Date()
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Failed to create post:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
};


// ✅ ADD THIS FUNCTION
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  getPostById, // ✅ export it here too
};
