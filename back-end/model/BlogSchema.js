const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
  login_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "login_db",
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // time_stamp: {
  //   type: String,
  //   required: true,
  // },
  comment_sec: [
    {
      type: String,
      required: true,
    },
  ],
  rating: {
    type: String,
    required: true,
  },
});
const Data = mongoose.model("blog_db", BlogSchema);
module.exports = Data;
