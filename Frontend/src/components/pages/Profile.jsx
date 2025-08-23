import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import userDp from "../../assets/userDp.png"
import { RiCamera3Line } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';


const Profile = () => {
  const navigate =  useNavigate()
const {userData} = useSelector((state)=>state.user)
const image = useRef()
const [name ,setName]= useState("")
const [frontImage ,setFrontImage] = useState("")


const imageHandler = (e)=>{
  const file = e.target.files[0]
  const profile = URL.createObjectURL(file)
  console.log(profile)
  setFrontImage(profile)

}

const submitHandler = ()=>{
  e.preventDefault()
}

  return (
    <>
    
    <div className=' relative w-full h-screen bg-slate-300 flex justify-center items-center' >
      <div onClick={()=>navigate("/")} className=' cursor-pointer absolute text-[1.2rem] left-[10px] top-[15px]' >
        <FaArrowLeft />
      </div>
      <div className=' h-screen w-full  md:h-[580px] md:w-[500px] bg-blue-200 md:rounded-[30px] '>

        <form onSubmit={submitHandler} >
          <div className='h-[200px] w-full bg-slate-600 flex justify-center items-center md:rounded-t-[30px] '>
          <div onClick={()=>image.current.click()} className='relative h-[150px] w-[150px] border-[rgb(170,58,201)] border-2 rounded-full' >
            <img className=' object-cover h-[150px] w-[150px] border-[rgb(170,58,201)] border-2 rounded-full overflow-hidden ' src={ frontImage ||userDp} alt="" />
            <RiCamera3Line className=' text-2xl absolute right-[28px] bottom-[10px]' />
          </div>
          
        </div>
        <input type='file' ref={image} accept='image/*' hidden onChange={(e)=>imageHandler(e)} />
        <div className='flex justify-center items-center flex-col' >
          <input className='mt-8 px-4 py-2 w-4/5 border-[rgb(170,58,201)] border-2 rounded-[20px]' type='text' name="name" placeholder='name'
           required onChange={(e)=>setName(e.target.value)} value={name} />
          <input className='mt-8 px-4 py-2 w-4/5 border-[rgb(170,58,201)] border-2 rounded-[20px]' type="text" name="username"
           disabled value={userData.username} />
          <input className='mt-8 px-4 py-2 w-4/5 border-[rgb(170,58,201)] border-2 rounded-[20px]' type="email" name="email"
            disabled value={userData.email} />
            <button type="submit" className=' disabled:bg-[rgb(162,122,173)] mt-8 px-4 py-2 w-2/5 text-[1.3rem] font-semibold text-white  bg-[rgb(170,58,201)] rounded-[25px]' 
          > Update </button>
        </div>

        </form>
      </div>
    </div>
    
    </>
  )
}

export default Profile