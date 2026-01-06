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
  const[sending,setSending] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setSending(true)
    try {
      const result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,{message},{withCredentials:true})
      dispatch(setMessages([...messages,result.data]))
      setMessage("")
      setSending(false)

    } catch (error) {
      console.log(error)
    }
  }

useEffect(()=>{
    socket.on("newMessage",(msg)=>{
      if(msg.sender === selectedUser._id){
        dispatch(setMessages([...messages,msg]))

      }
  })
  return ()=> socket.off("newMessage")
},[messages])

  return (
    <>
    <div style={{ height: "100dvh" }} className={`flex flex-col relative lg:w-[70%] w-full ${selectedUser ? "block" : "hidden w-0"} bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800`}>
      <div className='flex items-center w-full pt-4 pb-4 bg-gradient-to-r from-purple-800 to-purple-900 shadow-lg rounded-b-3xl border-b-2 border-purple-700'>
        <div onClick={()=>dispatch(setSelectedUser(null))} className='cursor-pointer text-[1.5rem] ml-4 text-white hover:text-purple-300 transition-colors duration-200'>
          <FaArrowLeft/>
        </div>
        <div className='flex items-center w-full ml-8 gap-4'>
          <img src={selectedUser?.profile?.path}
          draggable={false}
          className='h-[50px] w-[50px] rounded-full object-cover border-2 border-purple-600 shadow-lg' alt="" />
          <div className='flex flex-col gap-1'>
            <span className='text-2xl font-bold text-white drop-shadow'>
              {selectedUser?.name}
            </span>
            <span className='text-xs text-purple-300'>Online</span>
          </div>
        </div>
      </div>

        {/* message box  */}

      <div className='flex-1 overflow-y-auto will-change-transform scrollbar-hide pb-24 pt-4 px-4 space-y-3'>
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
      </div>

      <div className='absolute bottom-0 right-0 flex w-full h-[12%] items-center justify-center bg-gradient-to-t from-slate-800 via-purple-900 to-transparent rounded-t-3xl shadow-2xl px-4 py-4'>
        <form onSubmit={(e)=>handleSubmit(e)} className='h-full w-full flex justify-center items-center'>
          <div className='relative h-[70%] flex w-[90%] items-center justify-center'>
            <input autoComplete='off' type="text" onChange={(e)=>setMessage(e.target.value)} value={message} name="message" className='rounded-full pl-12 pr-14 border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white w-full h-full bg-slate-700 placeholder:text-gray-400 placeholder-opacity-100 text-[1.1rem] font-semibold shadow-md transition-all duration-200' placeholder='Write message' />
            <button disabled={sending} type='submit' className='absolute right-4 text-3xl text-purple-500 hover:text-purple-400 transition-colors duration-200'>
              <IoMdSend />
            </button>
          </div>
        </form>
      </div>
    </div>
    {!selectedUser && 
    <div className='lg:w-[70%] hidden lg:h-screen bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800 lg:flex flex-col justify-center items-center font-semibold'>
      <div className='text-[2.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 drop-shadow-lg'>Welcome to Chatify</div>
      <div className='text-xl text-gray-400'>Start a conversation now</div>
    </div>
    }

    </>


  )
}

export default MessageBox
