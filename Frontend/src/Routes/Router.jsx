import React from 'react'
import Home from '../components/pages/Home.jsx';
// import App from "../App.jsx"s
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Signup from '../components/Auth/Signup.jsx';
import Login from '../components/Auth/Login.jsx';
import getCurrentUser from '../Hooks/getCurrentUser.js';
import { useSelector } from 'react-redux';
import Profile from '../components/pages/Profile.jsx';

const Router = ()=>{
    getCurrentUser()
    const {userData} = useSelector((state)=> state.user)
    console.log(userData)
    const router = createBrowserRouter([

  {
    path: "/",
    element : userData  ? <Home/> : <Navigate to="/login" />,
  },
  {
    path: "/profile",
    element : userData  ? <Profile/> : <Navigate to="/login" />,
  },
  {
    path : "signup",
    element : !userData  ? <Signup/> : <Navigate to="/" />,
  },
  {
    path : "login",
    element : !userData  ? <Login/> : <Navigate to="/" />,
  }
  ]
  )
    return <RouterProvider router={router} /> 
}
export default Router