import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BASE_URI from "../Constant/Constant";
import Loader from "../Loader/Loader";
import Terms from "./Terms";

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

  //////////////

  const [checkmark, setCheckmark] = useState(false);
  const toggleSubmitButton = () => {
    setCheckmark((prev) => !prev);
  };

  ///////////

  const registerFormSubmit = (e) => {
    e.preventDefault();
    const fields = ["name", "email", "phone", "password"];
    const messages = ["Name ", "Email ", "phone ", "password "];

    for (let i = 0; i < fields.length; i++) {
      let value = document.forms["register-form"][fields[i]].value;
      if (value === "") {
        alert(`Please fill in the ${messages[i]}`);
        return false;
      }
    }
    setLoader(true);

    axios
      .post(`${BASE_URI}/api/register/`, registerFormData)
      .then((data) => {
        console.log(data);
        navigate("/");
        setLoader(false);
        setCheckmark(false);
      })
      .catch((err) => {
        console.log(err);
        setCheckmark(false);

        setLoader(false);
      });
  };
  const registerAlert = (e) => {
    e.preventDefault();

    alert("Please accept our terms and conditions to continue.");
  };

  //////////////////////
  const [termsandcondition, setTermsandcondition] = useState(false);
  const TermsHandler = () => {
    setTermsandcondition(true);
  };

  console.log(checkmark);
  return (
    <div>
      {loader == true ? (
        <Loader />
      ) : (
        <>
          {termsandcondition == false ? (
            <div className="register-main-body">
              <form
                action=""
                className="register-form-body"
                name="register-form"
              >
                {/* <div className="register-form-title">REGISTER</div> */}
                <img src="register.png" className="register-form-title" />
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
                  type="password"
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
                <div>
                  <span style={{ color: "red" }}>*</span>{" "}
                  <input
                    type="checkbox"
                    id="formcheck"
                    onClick={toggleSubmitButton}
                  />{" "}
                  I agree to the{" "}
                  <Link onClick={TermsHandler}>terms and conditions.</Link>
                </div>
                <button
                  onClick={(e) =>
                    checkmark == true ? registerFormSubmit(e) : registerAlert(e)
                  }
                  className={
                    checkmark == true
                      ? "register-form-btn"
                      : "register-form-btn-disabled"
                  }
                >
                  Submit
                  <div className="register-form-btn-back"></div>
                </button>
                <div>
                  Already registered on Bloogie? <Link to={"/"}>Sign in</Link>
                </div>
              </form>
            </div>
          ) : (
            <>
              <Terms setTermsandcondition={setTermsandcondition} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Register;
