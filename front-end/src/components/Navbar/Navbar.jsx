import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URI from "../Constant/Constant";
const Navbar = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    sessionStorage.clear();
  };

  //////////////

  //////All blog of the user
  const [allBlogs, setAllblogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URI}/api/blog/seperate-blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log(data);
        setAllblogs(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
              {allBlogs.length !== 0 ? (
                <Link to={"/blog-edit"} className="navbar-menu-data">
                  Edit
                </Link>
              ) : (
                <></>
              )}
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
