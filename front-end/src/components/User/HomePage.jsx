import React, { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import Loader from "../Loader/Loader";

const HomePage = () => {
  const token = sessionStorage.getItem("token");
  ////Loader
  const [loader, setLoader] = useState(false);

  const [allBlogs, setAllblogs] = useState([]);
  useEffect(() => {
    setLoader(true);
    axios
      .get(`http://localhost:2222/api/blog/view-all-blog`, {
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
              <button className="home-img-body-btn">View Articles</button>
            </div>
          </div>
          <div className="home-article-body">
            {allBlogs.map((data) => (
              <div className="home-article-card-sec">
                <img
                  src={`/upload/${data.image}`}
                  alt=""
                  className="home-article-card-img"
                />
                <div className="home-article-card-content">{data.author}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
