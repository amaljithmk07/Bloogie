import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <div>
      <div className="loader-main-body">
        <div className="loader-sub-body">
          <div className="loader-border"></div>
          <img src="/b.png" alt="" className="loader-img" />
          <div className="loader-border"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
