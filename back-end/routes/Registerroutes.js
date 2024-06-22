const mongoose = require("mongoose");
const express = require("express");
const Registerroutes = express.Router();
const Login_DB = require("../model/LoginSchema");
const Register_DB = require("../model/RegisterSchema");
const bcrypt = require("bcryptjs");

Registerroutes.post("/", async (req, res) => {
  console.log(re.body);
  const old_user = await Login_DB.find({
    email: req.body.email,
  });
  if (old_user) {
    return res.status(400).json({
      Error: false,
      success: true,
      message: "User Already Exist",
    });
  }
  const Hashedpass = await bcrypt.hash(req.body.password, 12);

  const log = {
    email: req.body.email,
    password: Hashedpass,
  };
  const log_result = await Login_DB(log).save();
  const reg = {
    login_id: log_result._id,
    name: req.body.name,
    phone: req.body.phone,
  };
  const reg_result = await Register_DB(reg).save();

  if (reg_result) {
    return res.status(200).json({
      success: true,
      error: false,
      message: "Register Successful",
    });
  } else
    (err) => {
      return res.status(200).json({
        success: false,
        error: true,
        message: "Register failed",
        errormessage: err,
      });
    };
});

module.exports = Registerroutes;
