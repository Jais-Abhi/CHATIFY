import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from "axios"
import { serverUrl } from '../../main.jsx'
import { setUserData } from '../../Redux/Slices/userSlice.js'
import { useDispatch } from 'react-redux'

const Signup = () => {

  const [show , setShow] = useState(false)
  const [username , setusername] = useState("")
  const [email , setemail] = useState("")
  const [password , setpassword] = useState("")
  const [loading,setloading] = useState(false)
  const [error,setError]= useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const submitHandler = async (e)=>{
    e.preventDefault()
    try {
      setloading(true)
      const result = await axios.post(`${serverUrl}/api/auth/signup`,{
      username,email,password} , {withCredentials:true} )
      console.log(result.data)
      dispatch(setUserData(result.data))
      setemail("")
      setpassword("")
      setloading(false)
      setError("")

    } catch (err) {
       console.log(err)
    // console.log(err.message)

    if(err.response){
      console.log(err.response?.data?.message)
      setError(err.response?.data?.message || "something went wrong")
    }else{
      console.log(err.message)
      setError(err.message || "something went wrong")

    }
      setloading(false)

    }
  }

  return (
    <div className='w-full h-screen bg-slate-300 flex justify-center items-center' >
      <div className=' h-screen w-full md:h-[580px] md:w-[500px] bg-blue-200 md:rounded-[30px]'>
        <div className='h-[150px] flex justify-center items-center bg-[rgb(170,58,201)] md:rounded-t-[30px]' >
        <p className='text-2xl font-bold text-gray-300' >Welcome to <span className='text-white' >Chatify</span> </p>
        </div>
      <div className='flex flex-col justify-center items-center '>
        <form  className='flex flex-col justify-center items-center w-full' onSubmit={(e)=>submitHandler(e)} >

          <input className='mt-8 px-4 py-2 w-4/5 border-[rgb(170,58,201)] border-2 rounded-[20px]' type="text" name="username" placeholder='username' required onChange={(e)=>setusername(e.target.value)} value={username} />

          <input className='m-8 px-4 py-2 w-4/5 border-[rgb(170,58,201)] border-2 rounded-[20px]' type="email" name="email" placeholder='email'
           required onChange={(e)=>setemail(e.target.value)} value={email} />

          <div className=' w-4/5 relative ' >
            <input required minLength="6"  className=' px-4 py-2 w-full border-[rgb(170,58,201)] border-2 rounded-[20px]' type={show ? "text" : "password"} name="password" placeholder='password'  onChange={(e)=>setpassword(e.target.value)} value={password}
              />

            <span className=' absolute right-4 mt-[0.5rem] cursor-pointer font-medium text-[rgb(170,58,201)]' onClick={()=>setShow(!show)} > {show ? "hide" : "show"} </span>
          </div>

          <button type="submit" className=' disabled:bg-[rgb(162,122,173)] mt-6 px-4 py-2 w-2/5 text-[1.3rem] font-semibold text-white  bg-[rgb(170,58,201)] rounded-[25px]' 
          required disabled = {loading}  > {loading ? "loading..." : "signup"} </button>
         
        </form>
        <p onClick={()=>navigate("/login")} className=' mt-[20px] text-[1.1rem] font-medium cursor-pointer'  >Already signup ? <span className='text-blue-800' >login</span></p>
       <div className='w-[300px] text-center'  >{error ? <p className='text-red-700 mt-2 font-semibold' > {error}</p> : ""  }</div>
        
        </div>
      </div>
    </div>
  )
}

export default Signup