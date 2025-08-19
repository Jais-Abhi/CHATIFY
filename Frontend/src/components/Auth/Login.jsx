import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {

  const [show , setShow] = useState(false)
  const [email , setemail] = useState("")
  const [password , setpassword] = useState("")

  const navigate = useNavigate()

  const submitHandler = (e)=>{
    e.preventDefault()
    console.log(email,password)
  }

  return (
    <div className='w-full h-screen bg-slate-300 flex justify-center items-center' >
      <div className=' h-[550px] w-[500px] bg-blue-200 rounded-[30px]'>
        <div className='h-[150px] flex justify-center items-center bg-[rgb(170,58,201)] rounded-t-[30px]' >
        <p className='text-2xl font-bold text-gray-300' >Welcome to <span className='text-white' >Chatify</span> </p>
        </div>
      <div className='flex flex-col justify-center items-center '>
        <form  className='flex flex-col justify-center items-center w-full' onSubmit={(e)=>submitHandler(e)} >

          <input className='m-4 px-4 py-2 w-4/5 border-[rgb(170,58,201)] border-2 rounded-[20px]' type="email" name="email" placeholder='email'
           required onChange={(e)=>setemail(e.target.value)} value={email} />

          <div className=' w-4/5 relative' >
            <input className=' px-4 py-2 w-full border-[rgb(170,58,201)] border-2 rounded-[20px]' type={show ? "text" : "password"} name="password" placeholder='password'  onChange={(e)=>setpassword(e.target.value)} value={password}  />
            <span className=' absolute right-4 mt-[0.5rem] cursor-pointer font-medium' onClick={()=>setShow(!show)} > {show ? "hide" : "show"} </span>
          </div>

          <button type="submit" className='mt-8 px-4 py-2 w-2/5 text-[1.3rem] font-semibold text-white  bg-[rgb(170,58,201)] rounded-[25px]' 
          required  >Signup</button>
         
        </form>
        <p onClick={()=>navigate("/signup")} className=' mt-[20px] text-[1.1rem] font-medium cursor-pointer'  >Create a new account ? <span className='text-blue-800' >signup</span></p>
      </div>
      </div>
    </div>
  )
}

export default Login