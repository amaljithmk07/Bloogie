const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
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
  time_stamp: {
    type: String,
    required: true,
  },
});
const Data = mongoose.model("blog_db", BlogSchema);
module.exports = Data;
