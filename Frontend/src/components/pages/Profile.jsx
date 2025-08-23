import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import userDp from "../../assets/userDp.png"
import { RiCamera3Line } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { serverUrl } from '../../main.jsx';


const Profile = () => {
  const navigate =  useNavigate()
const {userData} = useSelector((state)=>state.user)
const image = useRef()
const [name ,setName]= useState("")
const [frontImage ,setFrontImage] = useState(userDp)
const [backImage ,setBackImage] = useState()

useEffect(() => {
  console.log("frontImage updated:", frontImage);
}, [frontImage]);

useEffect(() => {
  console.log("backImage updated:", backImage);
}, [backImage]);

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
  const formData = new FormData()
  formData.append("name",name)
  if(backImage){
    formData.append("image",backImage)
  }
  try {
//     for (let [key, value] of formData.entries()) {
//   console.log(key, value);
//   if (value instanceof File) {
//     console.log(key, value.name, value.size, value.type); 
//   } else {
//     console.log(key, value);
//   }
// }
    const result = await axios.post(`${serverUrl}/api/user/profile`,formData,{withCredentials : true})
    console.log(result)
  } catch (error) {
    console.log(error)
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
          <div className='h-[200px] w-full bg-slate-600 flex justify-center items-center md:rounded-t-[30px] '>
          <div onClick={()=>image.current.click()} className='relative h-[150px] w-[150px] border-[rgb(170,58,201)] border-2 rounded-full' >
            <img className=' object-cover h-[150px] w-[150px] border-[rgb(170,58,201)] border-2 rounded-full overflow-hidden ' src={ frontImage} alt="" />
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