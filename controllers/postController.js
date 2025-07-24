const Post = require("../models/Post");

// Get all posts
const getPosts = async (req, res) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const filter = isAdmin ? {} : { deletedForUser: false };
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { content, author, type, isAnonymous, tags, category, adviceRequested } = req.body;
    if (!content || (!author && !isAnonymous)) {
      return res.status(400).json({ message: "Content and author are required" });
    }

    const newPost = new Post({
      content,
      type: type || "general",
      tags: tags || [],
      category: category || null,
      adviceRequested: adviceRequested || false,
      isAnonymous: isAnonymous || false,
      createdBy: isAnonymous ? null : author,
      createdAt: new Date(),
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

// Get post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Like a post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }

    res.json({ message: "Post liked", likes: post.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Unlike a post
const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    post.likes = post.likes.filter(id => id.toString() !== userId);
    await post.save();

    res.json({ message: "Post unliked", likes: post.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a comment
const addComment = async (req, res) => {
  try {
    const { userId, text } = req.body;
    if (!userId || !text) return res.status(400).json({ message: "User ID and text are required" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = { userId, text, createdAt: new Date() };
    post.comments.push(comment);
    await post.save();

    res.status(201).json({ message: "Comment added", comments: post.comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a comment (user can delete their own, admin can delete any)
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (userRole !== 'admin' && comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You can only delete your own comment" });
    }

    comment.remove();
    await post.save();
    res.json({ message: "Comment deleted", comments: post.comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin soft delete post (hide from users)
const softDeletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.deletedForUser = true;
    await post.save();

    res.json({ message: "Post hidden from users but visible to admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin flags a post
const flagPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.flagged = true;
    await post.save();

    res.json({ message: "Post flagged for admin review" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  getPostById,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
  softDeletePost,
  flagPost
};
