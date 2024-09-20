import React, { useEffect, useState } from "react";

import "../../App.scss";
import video from "../../LoginAsset/Weather_forecast_X_-_After_Effects_Template(1080p).mp4";
import logo from "./../../LoginAsset/weather-2021-12-07.png";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineSwapRight } from "react-icons/ai";
import { HiOutlineLockClosed } from "react-icons/hi";
import axios from "axios";
import Validation from "./Validation";

const ResetPassword = () => {
  const [fpassword, setPassword] = useState({ password: "" });
  const { token } = useParams();

  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  function handleInputPassword(event) {
    const newObj = { ...fpassword, [event.target.name]: event.target.value };
    setPassword(newObj);
  }

  const navigateTo = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setErrors(Validation(fpassword));

    try {
      const response = await axios.post(
        "https://admin-dash-mauve.onrender.com/api/users/resetPassword/" +
          token,
        {
          // email:email,
          password: fpassword.password,
        }
      );

      console.log(response.data);

      if (response.status === 201) {
        // User created successfully

        navigateTo("/login");
        setPassword("");
      } else if (response.status === 400) {
        setMessage("Invalid request. Please check your input.");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setMessage("User creation failed.");
      setTimeout(() => {
        setMessage();
      }, 4000);
    }
  };

  return (
    <div className="loginPage flex ">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoplay muted loop></video>
          <div className="textDiv">
            <h2 className="title">Create and sell Extraordinary Products</h2>
            <p>Adopt the peace of nature!</p>
          </div>
          <div className="footerDiv flex">
            <span className="text">Don't have an account?</span>
            <Link to="/register">
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="" />
            <h2>Reset Password</h2>
          </div>

          <form className="form grid ">
            <span className="showMessage">{message}</span>
            <div className="inputDiv">
              <label htmlFor="password">New Password</label>
              <div className="input flex">
                <HiOutlineLockClosed className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder=" Enter Password"
                  name="password"
                  onChange={handleInputPassword}
                />
              </div>
              {errors.password && (
                <span style={{ color: "white", fontSize: "13px" }}>
                  {errors.password}
                </span>
              )}
            </div>

            <button type="submit" onClick={loginUser} className="btn flex">
              <span> Reset </span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
