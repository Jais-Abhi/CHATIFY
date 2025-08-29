import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft } from "react-icons/fa";
import { setSelectedUser } from '../Redux/Slices/userSlice';

const MessageBox = () => {

  const {selectedUser} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  return (
    <>
    <div className={` lg:w-[70%] w-full ${selectedUser ? "block" : "hidden w-0"} h-screen  bg-blue-100 `} >
      <div className=' flex items-center w-full h-[10%] bg-[rgb(168,79,192)] border-l-2 border-gray-300 rounded-b-[50px]' >
        <div onClick={()=>dispatch(setSelectedUser(null))} className=' cursor-pointer text-[1.2rem] ml-4' >
          <FaArrowLeft/>
        </div>
        <div className=' flex items-center w-full  ml-8'>
          <img src={selectedUser?.profile?.path} className='h-[50px] w-[50px] rounded-full object-cover' alt="" />
          <span className=' ml-4 text-2xl font-semibold text-gray-100'>
            {selectedUser?.name}
          </span>
        </div>
      </div>
    </div>
    {!selectedUser && 
    <div className='lg:w-[70%] hidden lg:h-screen bg-blue-100 lg:flex flex-col justify-center items-center font-semibold' >
      <div className='text-[2rem] '  >Welcome to Chatify,</div>
      <div className='text-xl' >Start conversation now </div>
    </div>
    }

    </>


  )
}

export default MessageBox