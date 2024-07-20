const mongoose = require("mongoose");
const express = require("express");
const blogroutes = express.Router();
const Blog_DB = require("../model/BlogSchema");
const Comment_DB = require("../model/CommentSchema");
const Register_DB = require("../model/RegisterSchema");
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
        message: "Edit Blog  successful",
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Edit Blog failed",
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

///delete single blog

blogroutes.put("/delete-one-blog/:id", CheckAuth, async (req, res) => {
  try {
    const Data = await Blog_DB.deleteOne({
      _id: req.params.id,
      login_id: req.userData.userId,
    });
    if (Data) {
      return res.status(200).json({
        success: true,
        error: false,
        data: Data,
        message: "Delete Blog  successful",
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Delete Blog failed",
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
//////view seperate blog in detail

blogroutes.get("/view-blog-in-detail/:id", CheckAuth, async (req, res) => {
  try {
    const BlogwithComments = await Blog_DB.aggregate([
      {
        $lookup: {
          from: "comments_dbs",
          localField: "_id",
          foreignField: "blog_id",
          as: "results",
        },
      },

      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $group: {
          _id: "$_id",
          login_id: {
            $first: "$login_id",
          },
          title: {
            $first: "$title",
          },
          author: {
            $first: "$author",
          },
          content: {
            $first: "$content",
          },
          image: {
            $first: "$image",
          },
          rating: {
            $first: "$rating",
          },
          login_id: {
            $first: "$login_id",
          },
          user_id: {
            $first: "$results.user_id",
          },
          user_name: {
            $first: "$results.user_name",
          },
          comment: {
            $first: "$results.comment",
          },
        },
      },
    ]);
    console.log(BlogwithComments);

    if (BlogwithComments) {
      return res.status(200).json({
        success: true,
        error: false,
        data: BlogwithComments,
        message: "Blog View successful",
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

//////Comment upload for the selected blog

blogroutes.post("/comment-upload/:id", CheckAuth, async (req, res) => {
  console.log(req.body.comment);
  try {
    const user = await Register_DB.findOne({
      login_id: req.userData.userId,
    });
    const Data = await Comment_DB({
      user_id: req.userData.userId,
      user_name: user.name,
      comment: req.body.comment,
      blog_id: req.params.id,
    });
    Data.save();
    if (Data) {
      return res.status(200).json({
        success: true,
        error: false,
        data: Data,
        message: "Comment Uploaded Successful",
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

////Rating Adding

blogroutes.post("/rating-add", CheckAuth, async (req, res) => {
  console.log(req.body);
  try {
    const Data = await Blog_DB.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          rating: req.body.number,
        },
      }
    );
    Data.save();
    if (Data) {
      return res.status(200).json({
        success: true,
        error: false,
        data: Data,
        message: "Rating added Successful",
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
