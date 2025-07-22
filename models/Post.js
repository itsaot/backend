const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  type: { type: String, enum: ["physical","verbal","cyber"], required: true },
  content: { type: String, required: true },
  adviceRequested: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
});

module.exports = mongoose.model("Post", PostSchema);
