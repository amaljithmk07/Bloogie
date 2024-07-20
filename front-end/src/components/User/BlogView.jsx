import React, { useEffect, useState } from "react";
import "./BlogView.css";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URI from "../Constant/Constant";
import axios from "axios";
const BlogView = () => {
  const { id } = useParams();

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  ////Loader
  const [loader, setLoader] = useState(false);

  const [blog, setBlogs] = useState({ comment: [], user_name: [] });
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${BASE_URI}/api/blog/view-blog-in-detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setLoader(false);
        setBlogs(data.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, []);
  console.log(blog);

  ///////////////Comment Upload Section

  const [commentHandler, setCommentHandler] = useState({});
  console.log(commentHandler);

  const commentUpload = (e) => {
    axios
      .post(`${BASE_URI}/api/blog/comment-upload/${id}`, commentHandler, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        // const commentsArray = Array.isArray(blog.comment) ? blog.comment : [];
        // const userIdsArray = Array.isArray(blog.user_id) ? blog.user_id : [];
        // console.log(commentsArray);
        // const updatedBlog = {
        //   ...blog,
        //   comment: [...commentsArray, data.data.data.comment],
        //   user_name: [...userIdsArray, data.data.data.user_name],
        // };
        // setBlogs(updatedBlog);
        const updatedBlog = {
          ...blog,
          comment: [...blog.comment, data.data.data.comment],
          user_name: [...blog.user_name, data.data.data.user_name],
        };
        setBlogs(updatedBlog);
        document.getElementById("comment").value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //////////rating
  const [ratingstate, setRatingstate] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const addRating = (number) => {
    const newRatingState = { ...ratingstate };
    for (let i = 1; i <= 5; i++) {
      newRatingState[i] = i <= number;
    }
    setRatingstate(newRatingState);
  };
  const ratingCancel = (number) => {
    const newRatingState = { ...ratingstate };
    for (let i = 0; i >= number; i++) {
      newRatingState[i] = i = false;
    }
    setRatingstate(newRatingState);
  };

  const ratingSubmit = (number) => {
    axios
      .post(
        `${BASE_URI}/api/blog/rating-add`,
        { id, number },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // params: { id: { id }, number: { number } },
        }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="blog-view-main-body">
        <div className="blog-view-sub-body">
          {/* /////// */}
          <div className="blog-view-img-body">
            {/* <img src="/blog-background.jpg" alt="" className="blog-view-img" /> */}
            <img
              src={`/upload/${blog.image}`}
              alt=""
              className="blog-view-img"
            />
            <div className="blog-view-title-sec">
              <div className="blog-view-title">{blog.title} title</div>
              <div className="blog-view-title">by</div>
              <div className="blog-view-title">
                {blog.author}
                Author
              </div>
            </div>
          </div>

          {/* ////// */}
          <div className="blog-view-content-sec">{blog.content}</div>
          {/* ///////// */}
          <div className="blog-view-rating-sec">
            Rating
            <img
              src={
                ratingstate[1] == true ? "/rating-filled.png" : "/rating.png"
              }
              alt=""
              className="blog-view-rating-img"
              onMouseEnter={() => addRating(1)}
              onClick={() => ratingSubmit(1)}
              onMouseLeave={() => ratingCancel(1)}
            />
            <img
              src={
                ratingstate[2] == true ? "/rating-filled.png" : "/rating.png"
              }
              alt=""
              className="blog-view-rating-img"
              onMouseEnter={() => addRating(2)}
              onClick={() => ratingSubmit(2)}
              onMouseLeave={() => ratingCancel(2)}
            />
            <img
              src={
                ratingstate[3] == true ? "/rating-filled.png" : "/rating.png"
              }
              alt=""
              className="blog-view-rating-img"
              onMouseEnter={() => addRating(3)}
              onClick={() => ratingSubmit(3)}
              onMouseLeave={() => ratingCancel(3)}
            />
            <img
              src={
                ratingstate[4] == true ? "/rating-filled.png" : "/rating.png"
              }
              alt=""
              className="blog-view-rating-img"
              onMouseEnter={() => addRating(4)}
              onClick={() => ratingSubmit(4)}
              onMouseLeave={() => ratingCancel(4)}
            />
            <img
              src={
                ratingstate[5] == true ? "/rating-filled.png" : "/rating.png"
              }
              alt=""
              className="blog-view-rating-img"
              onMouseEnter={() => addRating(5)}
              onClick={() => ratingSubmit(5)}
              onMouseLeave={() => ratingCancel(5)}
            />
            {blog.rating}
          </div>

          {/* /////////// */}
          <div className="blog-view-comments-sec">
            Comments
            <div className="blog-view-comments-area">
              {blog.comment?.map((data, index) => (
                <div className="blog-view-comment-body" key={index}>
                  <div className="blog-view-comment-username">
                    {blog.user_name[index].slice(0, 1)}
                  </div>
                  <div className="blog-view-comment">{data}</div>
                </div>
              ))}
            </div>
            {/* //////// */}
            <form className="blog-view-comments-upload">
              <textarea
                name="comment"
                id="comment"
                onChange={(e) =>
                  setCommentHandler({
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Write something about the blog"
                className="blog-view-comments-input"
              ></textarea>
              <img
                src="/send-icon.png"
                alt=""
                onClick={commentUpload}
                className="blog-view-comments-send-btn"
              />{" "}
            </form>
            <div className="blog-view-comments-respect">
              <span style={{ color: "red", fontSize: "1.3rem" }}>*</span>
              Please ensure your comments are respectful, relevant,
              constructive, and polite. Avoid personal attacks, profanity, and
              sharing personal information. Follow legal and ethical standards
              to maintain a positive discussion environment. Thank you for your
              cooperation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
