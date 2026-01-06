import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userDp from "../../assets/userDp.png"
import { RiCamera3Line } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import { serverUrl } from '../../main.jsx';
import { setOnlineUsers, setUserData } from '../../Redux/Slices/userSlice.js';
import Logout from '../Auth/Logout.jsx';


const Profile = () => {
const navigate =  useNavigate()
const {userData} = useSelector((state)=>state.user)
const {onlineUsers} = useSelector((state)=>state.user)
const image = useRef()
const [name ,setName]= useState(userData.name || "")
const [frontImage ,setFrontImage] = useState(userData.profile.path || userDp)
const [backImage ,setBackImage] = useState(null)
const [update,setUpdate] = useState(false)
const dispatch = useDispatch()


const imageHandler = (e)=>{
  const file = e.target.files[0]
  if(file){
    const profile = URL.createObjectURL(file)
    setFrontImage(profile)
    setBackImage(file)
  }

}

const submitHandler = async(e)=>{
  e.preventDefault()
  setUpdate(true)
  const formData = new FormData()
  formData.append("name",name)
  if(backImage){
    formData.append("image",backImage)
  }
  try {
    const result = await axios.post(`${serverUrl}/api/user/profile`,formData,{withCredentials : true})
    dispatch(setUserData(result.data))
    setUpdate(false)
    if(result.status === 201){
      navigate("/")

    }


  } catch (error) {
    console.log(error)
    setUpdate(false)
  }
}

  return (
    <>
    <div className='relative w-full h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 
    flex justify-center items-center p-0 md:p-2'>
      
      <div className='w-full h-full min-h-screen md:min-h-0 md:h-auto md:w-[28rem] bg-white/90 shadow-2xl rounded-none md:rounded-3xl px-8 py-[1.5rem] flex flex-col items-center justify-center md:justify-start relative'>

      <div onClick={()=>navigate("/")} className='cursor-pointer absolute text-[1.5rem] left-4 top-4 z-10 text-black hover:text-cyan-800 transition-colors duration-200'>
        <FaArrowLeft />
      </div>

      <div className='absolute top-[5rem] right-[5rem]' >
        <Logout/>
      </div>

        <form onSubmit={(e)=>submitHandler(e)} className='w-full flex flex-col items-center gap-6'>
          <div className='w-full flex flex-col items-center pt-4'>
            <div onClick={()=>image.current.click()} className='relative h-[140px] w-[140px] border-4 border-cyan-400 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-200 cursor-pointer group'>
              <img 
                className='object-cover h-[140px] w-[140px] rounded-full'
                src={frontImage} 
                alt="" 
              />
              <div className='absolute inset-0 bg-black/20 rounded-full group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center'>
                <RiCamera3Line className='text-3xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
              </div>
            </div>
            <h2 className='text-3xl font-extrabold text-gray-800 mt-6 mb-2 tracking-tight'>Edit Profile</h2>
            <p className='text-sm text-gray-500'>Update your profile information</p>
          </div>
          
          <input type='file' ref={image} accept='image/*' hidden onChange={(e)=>imageHandler(e)} />
          
          <div className='w-full flex flex-col gap-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Full Name</label>
              <input 
                className='transition-all duration-200 px-5 py-3 w-full border-2 border-cyan-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white text-gray-800 placeholder-gray-400 shadow-sm'
                type='text'
                name="name"
                placeholder='Enter your name'
                required
                onChange={(e)=>setName(e.target.value)}
                value={name}
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Username</label>
              <input 
                className='transition-all duration-200 px-5 py-3 w-full border-2 border-gray-300 rounded-2xl bg-gray-100 text-gray-600 shadow-sm cursor-not-allowed'
                type="text"
                name="username"
                disabled
                value={` ${userData.username}`}
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Email</label>
              <input 
                className='transition-all duration-200 px-5 py-3 w-full border-2 border-gray-300 rounded-2xl bg-gray-100 text-gray-600 shadow-sm cursor-not-allowed'
                type="email"
                name="email"
                disabled
                value={userData.email}
              />
            </div>

            <button 
              type="submit"
              disabled={update}
              className='mt-4 w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-bold shadow-md hover:scale-[1.03] transition-transform duration-150 disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {update ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Profile