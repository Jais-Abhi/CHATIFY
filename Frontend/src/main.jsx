import React ,{ Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router/dom"
import {Provider} from "react-redux"
import store from './Redux/Stores/store.js';
import Router from './Routes/Router.jsx';
export const serverUrl = "http://localhost:5000"



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <Router/>
    </Provider>
 
  </StrictMode>,
)
