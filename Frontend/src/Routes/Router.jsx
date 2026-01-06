import React, { useEffect } from 'react'
import Home from '../pages/Home.jsx';
// import App from "../App.jsx"s
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Signup from '../pages/Auth/Signup.jsx';
import Login from '../pages/Auth/Login.jsx';
import getCurrentUser from '../Hooks/getCurrentUser.js';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../pages/Profile.jsx';
import getOtherUsers from '../Hooks/getOtherUsers.js';
import {io} from "socket.io-client"
import { serverUrl } from '../main.jsx';
import { setOnlineUsers, setSocket } from '../Redux/Slices/userSlice.js';


const Router = ()=>{
    getCurrentUser()
    getOtherUsers()
    const {userData} = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    useEffect(()=>{
      if(userData){

        const socketIo = io(`${serverUrl}`,
          {
            query : 
              { userId : userData?._id}
          }
        )
         dispatch(setSocket(socketIo))
        socketIo.on("getOnlineUsers",(msg)=>{
          dispatch(setOnlineUsers(msg))
        })

         return ()=> socketIo.close()

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