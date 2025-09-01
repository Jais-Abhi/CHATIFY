import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft } from "react-icons/fa";
import { setSelectedUser } from '../Redux/Slices/userSlice';
import { IoMdSend } from "react-icons/io";
import { serverUrl } from '../main.jsx';
import axios from 'axios';
import Sender from './messageBox/Sender.jsx';
import Receiver from './messageBox/Receiver.jsx';
import { setMessages } from '../Redux/Slices/messageSlice.js';

const MessageBox = () => {
  const [message,setMessage] = useState("")
  const {messages} = useSelector((state)=>state.message)
  const {selectedUser} = useSelector((state)=>state.user)
  const {socket} = useSelector((state)=>state.user)
  const {userData} = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,{message},{withCredentials:true})
      dispatch(setMessages([...messages,result.data]))
      setMessage("")
    } catch (error) {
      console.log(error)
    }
  }

useEffect(()=>{
  console.log("effect run")
    socket.on("newMessage",(msg)=>{
      console.log(msg)
      dispatch(setMessages([...messages,msg]))
  })
  return ()=> socket.off("newMessage")
},[messages])

  return (
    <>
    <div className={` relative lg:w-[70%] w-full ${selectedUser ? "block" : "hidden w-0"} h-screen bg-blue-100 `} >
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
      <div className=' overflow-y-auto will-change-transform scrollbar-hide h-[80%]'>
        {messages.map((msg)=>
        {
          if(msg.sender == userData._id){
            return <Sender key={msg._id} message={msg.message} />
          }
          else{
            return <Receiver key={msg._id} message={msg.message} />
          }
        }
        )}
        {/* message box  */}
      </div>

      <div className=' absolute bottom-0 right-0 flex w-full h-[10%] items-center justify-center '>
        <form onSubmit={(e)=>handleSubmit(e)} className='h-full w-full flex justify-center items-center' >
          <div className='relative h-[70%] flex w-[80%] items-center justify-center' >
          <input autoComplete='off' type="text" onChange={(e)=>setMessage(e.target.value)} value={message} name="message"  className=' rounded-full pl-12 border-none focus:outline-none text-white w-full h-full bg-[rgb(163,54,193)] placeholder:text-gray-200 placeholder-opacity-100 text-[1.2rem] font-semibold' placeholder='Write message' />
          <button type='submit' className=' absolute right-8 text-3xl text-gray-200'>
            <IoMdSend />
          </button>
        </div>
        </form>
      </div>
    </div>
    {!selectedUser && 
    <div className='lg:w-[70%] hidden lg:h-screen bg-blue-100 lg:flex flex-col justify-center items-center font-semibold' >
      <div className='text-[2rem] '>Welcome to Chatify,</div>
      <div className='text-xl' >Start conversation now </div>
    </div>
    }

    </>


  )
}

export default MessageBox