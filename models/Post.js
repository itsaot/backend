const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["physical", "verbal", "cyber"], // abuse type
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  category: {
    type: String,
  },
  adviceRequested: {
    type: Boolean,
    default: false,
  },
  escalated: {
    type: Boolean,
    default: false,
  },
  escalationDetails: {
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reportedAt: { type: Date },
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
