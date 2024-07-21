import React, { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import BASE_URI from "../Constant/Constant";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const articleSection = useRef();
  ////Loader
  const [loader, setLoader] = useState(false);

  const [allBlogs, setAllblogs] = useState([]);
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${BASE_URI}/api/blog/view-all-blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setLoader(false);
        setAllblogs(data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, []);

  const viewAriclesScroll = () => {
    document
      .getElementById("home-article-sec")
      .scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      {loader == true ? (
        <Loader />
      ) : (
        <div className="home-main-body">
          <div className="home-img-body">
            <div className="home-img-body-texts">
              Bloogie: Your Hub for Blogs and Websites{" "}
              <div>
                Your go-to for blogging and web creation tips, resources, and
                inspiration. Build and grow your online presence with Bloogie!
              </div>
              <button className="home-img-body-btn" onClick={viewAriclesScroll}>
                View Articles
              </button>
            </div>
          </div>

          <div className="home-article-title" id="home-article-sec">
            Explore All Our Articles
          </div>
          <div className="home-article-body">
            {allBlogs.map((data) => (
              <div className="home-article-card-sec" key={data._id}>
                <div className="home-article-card-img-sec">
                  <img
                    src={`/upload/${data.image}`}
                    // src={`/blog-background.jpg`}
                    alt=""
                    className="home-article-card-img"
                  />
                  <div className="home-article-card-title">{data.title}</div>
                  <button
                    className="home-article-card-btn"
                    onClick={() => navigate(`/blog-view/${data._id}`)}
                  >
                    VISIT
                  </button>
                </div>
                <div className="home-article-card-content">
                  <div className="home-article-card-content-data">
                    {data.title}
                  </div>
                  <div className="home-article-card-content-data">
                    Rating : 
                    {/* {data.rating.toString().slice(0, 3)}/5 */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
