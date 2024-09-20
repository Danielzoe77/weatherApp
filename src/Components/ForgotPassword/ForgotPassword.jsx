import React, { useEffect, useState } from "react";

import "../../App.scss";
import video from "../../LoginAsset/Blue_Sky_-_Nature_background_-_Free_to_use_-_Non_copyright_background_video_-_Sky_Background(1080p).mp4";
import logo from "./../../LoginAsset/weather-2021-12-07.png";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineSwapRight } from "react-icons/ai";
import { HiOutlineLockClosed } from "react-icons/hi";
import axios from "axios";
import Valid from "./Valid";

const ForgotPassword = () => {
  const [femail, setEmail] = useState({ email: "" });

  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});
  // const [email, setEmail] = useState("");

  function handleInput(event) {
    const newObj = { ...femail, [event.target.name]: event.target.value };
    setEmail(newObj);
  }

  const navigateTo = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    setErrors(Valid(femail));
    try {
      // const response = await axios.post(
      //  // "http://localhost:3001/api/users/forgotPassword",
      //   {
         const response = await axios.post("https://admin-dash-mauve.onrender.com/api/users/forgotPassword", {

          // email:email,
          email: femail.email,
        }
      );

      //   alert(response.data);
      console.log(response);
      //  navigateTo('/login')

      if (response.data.status) {
        // User created successfully
        alert("Password reset link sent to your email address.");
        navigateTo("/login");
        setEmail("");
      } else if (response.status === 400) {
        // Bad request error
        setMessage("Invalid request. Please check your input.");
      }
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
            <h2>Welcome Back!</h2>
          </div>

          <form className="form grid ">
            <span className="showMessage">{message}</span>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdOutlineMail className="icon" />
                <input
                  type="email"
                  id="useremail"
                  name="email"
                  placeholder=" Enter Email"
                  
                  onChange={handleInput}
                />
              </div>
              {errors.email && (
                <span style={{ color: "white", fontSize: "13px" }}>
                  {errors.email}
                </span>
              )}
            </div>

            <button type="submit" onClick={loginUser} className="btn flex">
              <span> Reset</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              <Link to="/forgotPassword">Forgot Password? </Link>
              {/* Forgot your Password? <a href="">Click Here</a> */}
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
