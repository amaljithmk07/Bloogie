const mongoose = require("mongoose");
const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const Data = mongoose.model("login_db", LoginSchema);
module.exports = Data;
