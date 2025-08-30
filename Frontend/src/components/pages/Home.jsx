import React from 'react'
import { useNavigate } from 'react-router'
import Sidebar from '../Sidebar'
import MessageBox from '../MessageBox'
import getMessages from '../../Hooks/getMessages.js'

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