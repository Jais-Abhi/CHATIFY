import React ,{ Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import {RouterProvider} from "react-router/dom"
import App from './App.jsx'
import Signup from './components/Auth/Signup.jsx';
import Login from './components/Auth/Login.jsx';
export const serverUrl = "http://localhost:5000"


const router = createBrowserRouter([
  {
    path: "/",
    Component : App,
  },
  {
      path : "signup",
      Component : Signup
    },
    {
      path : "login",
      Component : Login
    }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />  
  </StrictMode>,
)
