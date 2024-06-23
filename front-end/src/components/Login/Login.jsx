import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  //////////
  const loginFormDataHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  ///////////
  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:2222/api/login/`, formData)
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("token", data.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form action="">
        <input type="text" name="email" onChange={loginFormDataHandler} />
        <input type="text" name="password" onChange={loginFormDataHandler} />
        <button onClick={formSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Login;
