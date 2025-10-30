// routes/articleRoutes.js
const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// ✅ Lấy tất cả bài viết
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Thêm bài viết mới
router.post("/", async (req, res) => {
  try {
    const { title, content, tags, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Thiếu tiêu đề hoặc nội dung" });
    }

    const newArticle = new Article({
      title,
      description: content.slice(0, 150) + "...",
      content,
      tags,
      author: { name: author || "Admin" },
      thumbnail:
        "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1080&q=80",
      likes: 0,
      comments: 0,
      readTime: "5 phút đọc",
      date: new Date().toLocaleDateString("vi-VN"),
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    console.error("❌ Lỗi thêm bài viết:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
