import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <div className="home-main-body">
        <div className="home-img-body">
          <div className="home-img-body-texts">
            {/* Bloogie: A Haven for Passionate Bloggers and Website Enthusiasts. */}
            Bloogie: Your Hub for Blogs and Websites{" "}
            <div>
              Your go-to for blogging and web creation tips, resources, and
              inspiration. Build and grow your online presence with Bloogie!
            </div>
            <button className="home-img-body-btn">View Articles</button>
          </div>
        </div>
        <div className="home-article-body">
          <div className="home-article-card-sec">
            <div className="home-article-card-img"></div>
            <div className="home-article-card-content"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
