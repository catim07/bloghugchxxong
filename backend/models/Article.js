const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    author: {
      name: String,
      avatar: String,
    },
    thumbnail: String,
    likes: Number,
    comments: Number,
    tags: [String],
    readTime: String,
    date: String,
  },
  { collection: "articles" } // ⚠️ Đảm bảo đúng tên collection
);

module.exports = mongoose.model("Article", articleSchema);
