import React from "react";
import "./BlogPage.css";
const BlogPage = () => {
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
          <form action="" className="blog-form-sec">
            <input type="file" id="image" hidden />{" "}
            <label className="blog-form-upload" htmlFor="image">
              <img src="upload.png" alt="" className="blog-form-upload-img" />
              Upload
            </label>
            <input type="text" placeholder="Title" className="blog-form-data" />
            <input
              type="text"
              placeholder="Content"
              className="blog-form-data"
            />
            <input
              type="text"
              placeholder="Timestamp"
              className="blog-form-data"
            />
            <input
              type="text"
              placeholder="Author"
              className="blog-form-data"
            />
            <button className="blog-form-btn">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
