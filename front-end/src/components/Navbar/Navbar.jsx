import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
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
          <Link to={"/blog-edit"} className="navbar-menu-data">
            edit
          </Link>
          {token ? (
            <Link onClick={logout} className="navbar-menu-data">
              Logout
            </Link>
          ) : (
            <Link to={"/login"} className="navbar-menu-data">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
