import React from 'react'
import { useNavigate } from 'react-router'
import Sidebar from '../Sidebar'
import MessageBox from '../MessageBox'

const Home = () => {

  const navigate = useNavigate()

  return ( 
  <>
  <div className='flex' >
    <Sidebar/>
    <MessageBox/>
  </div>
  
  </> )
}

export default Home