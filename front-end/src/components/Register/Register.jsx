import React, { useState } from "react";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const [registerFormData, setRegisterFormData] = useState({});
  /////
  const registerformDataHandler = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  ///////////
  const registerFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:2222/api/register/`, registerFormData)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form action="">
        <input type="text" name="name" onChange={registerformDataHandler} />
        <input type="text" name="email" onChange={registerformDataHandler} />
        <input type="text" name="password" onChange={registerformDataHandler} />
        <input type="text" name="phone" onChange={registerformDataHandler} />
        <button onClick={registerFormSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Register;
