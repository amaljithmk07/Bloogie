import React, { useState } from "react";
import "./BlogUpload.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import BASE_URI from "../Constant/Constant";
import { useNavigate } from "react-router-dom";
const BlogPage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  ////Loader
  const [loader, setLoader] = useState(false);

  const [blogForm, setBlogForm] = useState({});

  //////////
  const formDataHandler = (e) => {
    const { name, value } = e.target;
    setBlogForm({ ...blogForm, [name]: value });
  };

  /////////
  const [blogFormPhotoPreview, setBlogFormPhotoPreview] = useState();
  const formImagePreview = (e) => {
    setBlogFormPhotoPreview(URL.createObjectURL(e.target.files[0]));
  };
  ////////////
  const formDataImage = (e) => {
    const { name } = e.target;
    setBlogForm({ ...blogForm, [name]: e.target.files[0] });
  };

  const blogSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    const formData = new FormData();
    formData.append("image", blogForm.image);
    formData.append("content", blogForm.content);
    formData.append("title", blogForm.title);
    formData.append("time_stamp", blogForm.time_stamp);
    formData.append("author", blogForm.author);

    axios
      .post(`${BASE_URI}/api/blog/add-blog`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        navigate("/home");
        setLoader(false);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  console.log(blogForm);
  return (
    <div>
      {loader == true ? (
        <Loader />
      ) : (
        <div className="blog-upload-main-body">
          <div className="blog-upload-sub-body">
            <div className="blog-upload-title">
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
          </div>
          <form
            action=""
            className="blog-upload-form-sec"
            encType="multipart/form-data"
          >
            <input
              type="file"
              id="image"
              hidden
              name="image"
              onChange={(e) => {
                formDataImage(e), formImagePreview(e);
              }}
            />
            {blogFormPhotoPreview ? (
              <img
                src={blogFormPhotoPreview}
                alt=""
                className="blog-upload-form-upload-preview"
              />
            ) : (
              <label className="blog-upload-form-upload" htmlFor="image">
                <img
                  src="upload.png"
                  alt=""
                  className="blog-upload-form-upload-img"
                />
                Upload
              </label>
            )}
            <input
              type="text"
              placeholder="Title"
              className="blog-upload-form-data"
              name="title"
              onChange={formDataHandler}
            />
            <textarea
              type="text"
              placeholder="Content"
              name="content"
              className="blog-upload-form-data"
              onChange={formDataHandler}
            />
            <input
              type="text"
              placeholder="Author"
              name="author"
              className="blog-upload-form-data"
              onChange={formDataHandler}
            />
            <button className="blog-upload-form-btn" onClick={blogSubmit}>
              SUBMIT
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
