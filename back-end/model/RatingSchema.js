const mongoose = require("mongoose");
const RatingSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
});
const Data = mongoose.model("rating_db", RatingSchema);
module.exports = Data;
