import React ,{ Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import {RouterProvider} from "react-router/dom"
import App from './App.jsx'
import Signup from './components/Auth/Signup.jsx';
import Login from './components/Auth/Login.jsx';
import {Provider} from "react-redux"
import store from './Redux/Stores/store.js';
import Home from './components/home.jsx';

export const serverUrl = "http://localhost:5000"


const router = createBrowserRouter([
  {
    path: "/",
    element : <App/>,
    children :
    [{
      index :true,
      element : <Home/>
    },
      {
      path : "signup",
      element : <Signup/>
      },
      {
      path : "login",
      element : <Login/>
      }
    ]
  },
  
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} /> 
    </Provider>
 

    
  </StrictMode>,
)
