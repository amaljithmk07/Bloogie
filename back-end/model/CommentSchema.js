const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  blog_id: {
    ref: "blog_db",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user_id: {
    ref: "login_db",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});
const Data = mongoose.model("comments_db", CommentSchema);
module.exports = Data;
