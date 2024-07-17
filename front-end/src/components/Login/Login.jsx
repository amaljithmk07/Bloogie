import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BASE_URI from "../Constant/Constant";
import Loader from "../Loader/Loader";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  ////Loader
  const [loader, setLoader] = useState(false);

  //////////
  const loginFormDataHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  ///////////
  const formSubmit = (e) => {
    e.preventDefault();

    let field = ["email", "password"];
    let message = ["Email", "Password"];

    for (let i = 0; i < field.length; i++) {
      let X = document.forms["login-form"][field[i]].value;
      if (X == "") {
        alert(`Please fill out ${message[i]}`);
        return false;
      }
    }
    setLoader(true);
    axios
      .post(`${BASE_URI}/api/login/`, formData)
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("token", data.data.token);
        navigate("/home");
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  {
  }
  return (
    <div>
      {loader == true ? (
        <Loader />
      ) : (
        <div className="login-main-body">
          <form action="" className="login-form-body" name="login-form">
            {/* <div className="login-form-title">LOGIN</div> */}
            <img src="/login.png" className="login-form-title" />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={loginFormDataHandler}
              className="login-form-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={loginFormDataHandler}
              className="login-form-input"
            />
            <button onClick={formSubmit} className="login-form-btn">
              Submit
              <div className="login-form-btn-back"></div>
            </button>
            <div>
              New to Bloogie? <Link to={"/register"}>Sign up</Link>
            </div>
          </form>{" "}
        </div>
      )}
    </div>
  );
};

export default Login;
