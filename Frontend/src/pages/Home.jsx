import React from 'react'
import { useNavigate } from 'react-router'
import Sidebar from '../components/Sidebar.jsx'
import MessageBox from '../components/MessageBox.jsx'
import getMessages from '../Hooks/getMessages.js'

const Home = () => {

  const navigate = useNavigate()
  getMessages()
  return ( 
  <>
  <div className='flex' >
    <Sidebar/>
    <MessageBox/>
  </div>
  
  </> )
}

export default Home