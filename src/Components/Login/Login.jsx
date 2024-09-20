import React, { useEffect, useState } from "react";
import "./Login.css";
import "../../App.scss";
import video from "../../LoginAsset/Weather_forecast_X_-_After_Effects_Template(1080p).mp4";
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
import axios, { Axios } from "axios";
import Validate from "./Validate";

const Login = () => {
  const [femail, setEmail] = useState({ email: "" });
  const [fpassword, setPassword] = useState({ password: "" });
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  function handleInput(event) {
    const newObj = { ...femail, [event.target.name]: event.target.value };
    setEmail(newObj);
  }

  function handleInputPassword(event) {
    const newObj = { ...fpassword, [event.target.name]: event.target.value };
    setPassword(newObj);
  }

  const navigateTo = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setErrors(Validate(femail, fpassword));
    try {
      const response = await axios.post(
         "https://admin-dash-mauve.onrender.com/api/users/login",
        // "http://localhost:3001/api/users/login",

        {
          email: femail.email,
          password: fpassword.password,
        }
      );

      if (response.status === 201) {
        // login successfully
        const token = response.data.token;

        localStorage.setItem("token", token);
        navigateTo("/weather");
        setEmail("");
        setPassword("");
      } else if (response.status === 400) {
        // Bad request error
        setMessage("Invalid request. Please check your input.");
      }
    } catch (error) {
      if (error.response.status === "please enter your email") {
        setMessage("please enter your email");
      }
      if (error.response.data.error === "please enter your password") {
        setMessage("please enter your password");
      }

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
            <h2 className="title">Get Complete weather Information</h2>

            <p class="blue-background">Enjoy the beauty of your city</p>
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
                  // onChange={(event)=>
                  //  console.log( setLoginEmail(event.target.value))
                  // }
                  onChange={handleInput}
                />
              </div>
              {errors.email && (
                <span style={{ color: "white", fontSize: "13px" }}>
                  {errors.email}
                </span>
              )}
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <HiOutlineLockClosed className="icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder=" Enter Password"
                  // onChange={(e)=>{
                  //   setloginPassword(e.target.value)
                  // }}
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
              <span> Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              <Link to="/forgotPassword">Forgot Password? </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
