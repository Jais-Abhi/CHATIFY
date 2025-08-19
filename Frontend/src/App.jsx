import React from 'react'
import { useNavigate } from 'react-router'
import Signup from './components/Auth/Signup'
const App = () => {
  const navigate = useNavigate()
  return (
  <>
  <h1 className='text-3xl font-bold underline' >hello</h1>
    <button onClick={()=>navigate("/signup")} >signup</button>
  </>
    
    )
}

export default App