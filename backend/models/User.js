const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // 👈 thêm dòng này
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }] // nếu bạn có blog
});

module.exports = mongoose.model("User", userSchema);
atob