import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userDp from "../../assets/userDp.png"
import { RiCamera3Line } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import { serverUrl } from '../../main.jsx';
import { setOnlineUsers, setUserData } from '../../Redux/Slices/userSlice.js';


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
    
    <div className=' relative w-full h-screen bg-slate-300 flex justify-center items-center' >
      <div onClick={()=>navigate("/")} className=' cursor-pointer absolute text-[1.2rem] left-[10px] top-[15px]' >
        <FaArrowLeft />
      </div>
      <div className=' h-screen w-full  md:h-[580px] md:w-[500px] bg-blue-200 md:rounded-[30px] '>

        <form onSubmit={(e)=>submitHandler(e)} >
          <div className='h-[200px] w-full  flex justify-center items-center md:rounded-t-[30px] '>
          <div onClick={()=>image.current.click()} className='relative h-[150px] w-[150px] border-[rgb(170,58,201)] border-2 rounded-full' >
            <img className=' object-cover h-[150px] w-[150px] border-[rgb(170,58,201)] border-2 rounded-full overflow-hidden ' 
            src={ frontImage} alt="" />
            <RiCamera3Line className=' text-2xl absolute right-[28px] bottom-[10px]' />
          </div>
          
        </div>
        <input type='file' ref={image} accept='image/*' hidden onChange={(e)=>imageHandler(e)} />
        <div className='flex justify-center items-center flex-col' >
          <input className='mt-8 px-4 py-2 w-4/5 border-[rgb(170,58,201)] border-2 rounded-[20px]' type='text' name="name" placeholder='name'
           required onChange={(e)=>setName(e.target.value)} value={name} />
          <input className='mt-8 px-4 py-2 w-4/5 border-[rgb(170,58,201)] border-2 rounded-[20px]' type="text" name="username"
           disabled contentEditable={false} value={` ${userData.username}`} />
          <input className='mt-8 px-4 py-2 w-4/5 border-[rgb(170,58,201)] border-2 rounded-[20px]' type="email" name="email"
            disabled contentEditable={false} value={userData.email} />

            <button type="submit" disabled={update} className=' disabled:bg-[rgb(162,122,173)] mt-8 px-4 py-2 w-2/5 text-[1.3rem] font-semibold text-white  bg-[rgb(170,58,201)] rounded-[25px]' 
          > {update ? "updating...." : "Update Profile"} </button>
        </div>

        </form>
      </div>
    </div>
    
    </>
  )
}

export default Profile