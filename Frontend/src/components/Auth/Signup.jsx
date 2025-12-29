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
      dispatch(setUserData(result.data))
      setemail("")
      setpassword("")
      setloading(false)
      setError("")

    } catch (err) {
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-300 via-blue-200 to-pink-200 p-0 md:p-2">
      <div className="w-full h-full min-h-screen md:min-h-0 md:h-auto md:w-full max-w-md bg-white/90 shadow-2xl rounded-none md:rounded-3xl px-4 py-8 md:px-8 md:py-12 flex flex-col items-center justify-center md:justify-start">
        <div className="w-full flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 flex items-center justify-center mb-4 shadow-lg">
            <span className="text-4xl font-bold text-white">📝</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-1 tracking-tight">Create Account</h2>
          <p className="text-md text-gray-500">Sign up for <span className="text-purple-700 font-semibold">Chatify</span></p>
        </div>
        <form className="w-full flex flex-col gap-6" onSubmit={submitHandler}>
          <input
            className="transition-all duration-200 px-5 py-3 w-full border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-gray-800 placeholder-gray-400 shadow-sm"
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={(e) => setusername(e.target.value)}
            value={username}
            autoComplete="username"
          />
          <input
            className="transition-all duration-200 px-5 py-3 w-full border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-gray-800 placeholder-gray-400 shadow-sm"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setemail(e.target.value)}
            value={email}
            autoComplete="email"
          />
          <div className="relative w-full">
            <input
              required
              minLength="6"
              className="transition-all duration-200 px-5 py-3 w-full border-2 border-purple-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-gray-800 placeholder-gray-400 shadow-sm pr-16"
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              autoComplete="new-password"
            />
            <span
              className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer font-medium text-purple-500 select-none text-sm"
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-bold shadow-md hover:scale-[1.03] transition-transform duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            required
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="w-full flex flex-col items-center mt-6">
          <p className="text-gray-600 text-base">
            Already have an account?{' '}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-700 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
          {error && (
            <div className="w-full text-center">
              <p className="text-red-600 mt-4 font-semibold text-sm bg-red-100 rounded-xl py-2 px-4 inline-block shadow-sm animate-pulse">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Signup