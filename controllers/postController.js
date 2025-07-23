const Post = require("../models/Post");

const createPost = async (req, res) => {
  console.log("Incoming post request body:", req.body);
 
};

exports.createPost = async (req, res) => {
  try {
    const { type, content, adviceRequested } = req.body;
    const post = new Post({
      type,
      content,
      adviceRequested,
      createdBy: req.user?.id || null,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error("Create post error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Fetch posts error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
