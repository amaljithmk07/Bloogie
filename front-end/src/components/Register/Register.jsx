import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BASE_URI from "../Constant/Constant";
import Loader from "../Loader/Loader";

const Register = () => {
  const navigate = useNavigate();
  ////Loader
  const [loader, setLoader] = useState(false);

  const [registerFormData, setRegisterFormData] = useState({});
  /////
  const registerformDataHandler = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  ///////////
  const registerFormSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    axios
      .post(`${BASE_URI}/api/register/`, registerFormData)
      .then((data) => {
        console.log(data);
        navigate("/");
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  return (
    <div>
      {loader == true ? (
        <Loader />
      ) : (
        <div className="register-main-body">
          <form action="" className="register-form-body">
            <div className="register-form-title">Register</div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={registerformDataHandler}
              className="register-form-input"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={registerformDataHandler}
              className="register-form-input"
            />
            <input
              type="passwoord"
              name="password"
              placeholder="Password"
              className="register-form-input"
              onChange={registerformDataHandler}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={registerformDataHandler}
              className="register-form-input"
            />
            <button onClick={registerFormSubmit} className="register-form-btn">
              Submit
            </button>
            <div>
              Already registered on Bloogie? <Link to={"/"}>Sign in</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
