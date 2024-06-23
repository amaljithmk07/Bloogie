import React, { useState } from "react";
import "./BlogPage.css";
import axios from "axios";
const BlogPage = () => {
  const token = sessionStorage.getItem("token");

  const [blogForm, setBlogForm] = useState({});

  //////////
  const formDataHandler = (e) => {
    const { name, value } = e.target;
    setBlogForm({ ...blogForm, [name]: value });
  };

  /////////

  const formDataImage = (e) => {
    const { name } = e.target;
    setBlogForm({ ...blogForm, [name]: e.target.files[0] });
  };

  const blogSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", blogForm.image);
    formData.append("content", blogForm.content);
    formData.append("title", blogForm.title);
    formData.append("time_stamp", blogForm.time_stamp);
    formData.append("author", blogForm.author);

    axios
      .post(`http://localhost:2222/api/blog/add-blog`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(blogForm);
  return (
    <div>
      <div className="blog-main-body">
        <div className="blog-sub-body">
          <div className="blog-title">
            {" "}
            INSIGHT HUB
            <div>
              {" "}
              {/* Explore a world of ideas and inspiration with our diverse
              collection of insightful blogs. */}
              Explore a world of ideas and inspiration with our diverse
              collection of insightful blogs. Discover expert advice, personal
              stories, and creative content that will ignite your passion and
              curiosity.
            </div>
          </div>
          <form
            action=""
            className="blog-form-sec"
            encType="multipart/form-data"
          >
            <input
              type="file"
              id="image"
              hidden
              name="image"
              onChange={formDataImage}
            />{" "}
            <label className="blog-form-upload" htmlFor="image">
              <img src="upload.png" alt="" className="blog-form-upload-img" />
              Upload
            </label>
            <input
              type="text"
              placeholder="Title"
              className="blog-form-data"
              name="title"
              onChange={formDataHandler}
            />
            <input
              type="text"
              placeholder="Content"
              name="content"
              className="blog-form-data"
              onChange={formDataHandler}
            />
            <input
              type="text"
              placeholder="Timestamp"
              name="time_stamp"
              className="blog-form-data"
              onChange={formDataHandler}
            />
            <input
              type="text"
              placeholder="Author"
              name="author"
              className="blog-form-data"
              onChange={formDataHandler}
            />
            <button className="blog-form-btn" onClick={blogSubmit}>
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
