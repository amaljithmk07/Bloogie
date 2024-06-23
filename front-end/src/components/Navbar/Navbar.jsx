import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    sessionStorage.clear();
  };
  return (
    <div>
      <div className="navbar-main-body">
        <div className="navbar-logo-sec">
          <img src="/logo.png" alt="" className="navbar-logo-img" />
        </div>
        <div className="navbar-menu-sec">
          {token !== null ? (
            <>
              <Link to={"/home"} className="navbar-menu-data">
                Explore
              </Link>
              <Link to={"/blog"} className="navbar-menu-data">
                Blog
              </Link>
              <Link to={"/blog-edit"} className="navbar-menu-data">
                Edit
              </Link>
            </>
          ) : (
            <></>
          )}
          {token ? (
            <div onClick={logout} className="navbar-menu-data">
              Logout
            </div>
          ) : (
            <Link to={"/"} className="navbar-menu-data">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
