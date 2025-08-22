import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import getCurrentUser from './Hooks/getCurrentUser.js'
const App = () => {
  getCurrentUser()

  return (
  <>
  <Outlet/>
  </>
    
    )
}

export default App