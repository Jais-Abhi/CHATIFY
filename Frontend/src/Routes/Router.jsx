import React, { useEffect } from 'react'
import Home from '../components/pages/Home.jsx';
// import App from "../App.jsx"s
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Signup from '../components/Auth/Signup.jsx';
import Login from '../components/Auth/Login.jsx';
import getCurrentUser from '../Hooks/getCurrentUser.js';
import { useSelector } from 'react-redux';
import Profile from '../components/pages/Profile.jsx';
import getOtherUsers from '../Hooks/getOtherUsers.js';
import {io} from "socket.io-client"
import { serverUrl } from '../main.jsx';


const Router = ()=>{
    getCurrentUser()
    getOtherUsers()
    const {userData} = useSelector((state)=> state.user)

    useEffect(()=>{
      console.log("herer we go")
      if(userData){
        console.log("herer we go")
        const socketIo = io(`${serverUrl}`,
          {
            query : 
              { userId : userData?._id}
          }
        )

      }
      
    },[userData])
    const router = createBrowserRouter([

  {
    path: "/",
    element : userData  ? userData.name && userData.profile.path ? <Home/> : <Navigate to="/profile" /> : <Navigate to="/login" />,
  },
  {
    path: "/profile",
    element : userData  ? <Profile/> : <Navigate to="/login" />,
  },
  {
    path : "/signup",
    element : !userData  ? <Signup/> : <Navigate to="/profile" />,
  },
  {
    path : "/login",
    element : !userData  ? <Login/> : userData.name && userData.profile.path ? <Navigate to="/" /> : <Navigate to="/profile" />,
  }
  ]
  )
    return <RouterProvider router={router} /> 
}
export default Router