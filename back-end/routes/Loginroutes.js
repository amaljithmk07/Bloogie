const mongoose = require("mongoose");
const express = require("express");
const loginroutes = express.Router();
const Login_DB = require("../model/LoginSchema");
const Register_DB = require("../model/RegisterSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

loginroutes.post("/", async (req, res) => {
  console.log(req.body);
  const lower_email = req.body.email.toLowerCase();
  console.log(lower_email);
  const old_user = await Login_DB.findOne({
    email: lower_email
  });
  if (!old_user) {
    return res.status(400).json({
      Error: true,
      success: false,
      message: "User does not Exist",
    });
  }
  const passwordCompare = await bcrypt.compare(
    req.body.password,
    old_user.password
  );
  if (!passwordCompare) {
    return res.status(400).json({
      Error: true,
      success: false,
      message: "Password Mis Match",
    });
  }

  const token = await jwt.sign(
    {
      UserEmail: old_user.email,
      UserId: old_user._id,
    },

    "Secret_key",
    { expiresIn: "1h" }
  );
  return res.status(200).json({
    Error: false,
    success: true,
    token: token,
    UserEmail: old_user.email,
    UserId: old_user._id,
  });
});

module.exports = loginroutes;
