import React from 'react'
import { useNavigate } from 'react-router'

const Home = () => {

  const navigate = useNavigate()

  return (
<button  onClick={ ()=> navigate("/login")} >login</button>  )
}

export default Home