import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protect = () => {

    const isLoggedIn = window.localStorage.getItem("token");
 
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
};

export default Protect


//    const isLoggedIn = window.localStorage.getItem("token");
//   const isLoggedIn = document.cookie.split(';').find(cookie => cookie.includes('token=')) !== undefined;