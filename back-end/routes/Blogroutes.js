const mongoose = require("mongoose");
const express = require("express");
const blogroutes = express.Router();
const Blog_DB = require("../model/BlogSchema");
const CheckAuth = require("../middleware/CheckAuth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front-end/public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//////Uploading blogs

blogroutes.post(
  "/add-blog",
  upload.single("image"),
  CheckAuth,
  async (req, res) => {
    console.log(req.body);
    try {
      const Data = await new Blog_DB({
        login_id: req.userData.userId,
        image: req.file.filename,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        time_stamp: req.body.time_stamp,
      });
      const result = await Data.save();
      if (result) {
        return res.status(200).json({
          success: true,
          error: false,
          message: "Blog Added successful",
        });
      } else
        (err) => {
          return res.status(400).json({
            success: false,
            error: true,
            message: "Blog Added failed",
            errorMessage: err.message,
          });
        };
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: true,
        message: "Network error",
        errorMessage: err.message,
      });
    }
  }
);

/////Viewing all blogs on homepage

blogroutes.get("/view-all-blog", CheckAuth, async (req, res) => {
  try {
    const Data = await Blog_DB.find();
    if (Data) {
      return res.status(200).json({
        success: true,
        error: false,
        data: Data,
        message: "Blog view successful",
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: " All Blog view failed",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network error",
      errorMessage: err.message,
    });
  }
});

////Seperate blog for viewing their blogs

blogroutes.get("/seperate-blog", CheckAuth, async (req, res) => {
  try {
    const Data = await Blog_DB.find({
      login_id: req.userData.userId,
    });
    if (Data) {
      return res.status(200).json({
        success: true,
        error: false,
        data: Data,
        message: "seperate Blog view successful",
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Blog view failed",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network error",
      errorMessage: err.message,
    });
  }
});

///Viewing single blog for editing

blogroutes.get("/view-one-blog/:id", CheckAuth, async (req, res) => {
  try {
    const Data = await Blog_DB.findOne({
      _id: req.params.id,
      login_id: req.userData.userId,
    });
    if (Data) {
      return res.status(200).json({
        success: true,
        error: false,
        data: Data,
        message: "edit Blog  successful",
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "edit Blog failed",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network error",
      errorMessage: err.message,
    });
  }
});

//////Updating blog

blogroutes.put("/edit-blog/:id", CheckAuth, async (req, res) => {
  try {
    const Data = await Blog_DB.updateOne(
      {
        _id: req.params.id,
        login_id: req.userData.userId,
      },
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          content: req.body.content,
          time_stamp: req.body.time_stamp,
        },
      }
    );
    if (Data) {
      return res.status(200).json({
        success: true,
        error: false,
        data: Data,
        message: "Blog Updated successful",
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: " failed",
          errorMessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network error",
      errorMessage: err.message,
    });
  }
});

module.exports = blogroutes;
