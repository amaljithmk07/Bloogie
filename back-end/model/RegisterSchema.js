const mongoose = require("mongoose");
const RegisterSchema = new mongoose.Schema({
  login_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "login_db",
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});
const Data = mongoose.model("register_db", RegisterSchema);
module.exports = Data;
