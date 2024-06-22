import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <div className="navbar-main-body">
        <div className="navbar-logo-sec">
          <img src="/logo.png" alt="" className="navbar-logo-img" />
        </div>
        <div className="navbar-menu-sec">
          {" "}
          <Link to={"/"} className="navbar-menu-data">
            Explore
          </Link>
          <Link to={"/blog"} className="navbar-menu-data">
            Blog
          </Link>
          <Link className="navbar-menu-data">Home</Link>
          <Link className="navbar-menu-data">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
