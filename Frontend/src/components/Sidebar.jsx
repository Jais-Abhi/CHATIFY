import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { serverUrl } from '../main';
import { setSelectedUser, setUserData } from '../Redux/Slices/userSlice';


const Sidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {otherUsers} = useSelector((state)=>state.user)
    const {selectedUser} = useSelector((state)=>state.user)
    const {userData} = useSelector((state)=>state.user)
    const onlineUsers = useSelector((state) => state.user.onlineUsers)
    const [searchBox , setSearchBox] = useState(false)



  return (
    <div className={`lg:w-[30%] ${selectedUser ? "hidden w-0" : "block"} w-full lg:block h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 transition-all duration-300`}>
      <div className='h-[15%] w-full bg-gradient-to-r from-purple-300 via-blue-200 to-pink-200 relative rounded-b-3xl shadow-lg border-b-2 border-purple-300'>
        <div className='text-gray-800 font-bold pl-6 pb-2 text-[2rem] drop-shadow-lg'>Chatify</div>
        {/* <div className='text-gray-700 font-semibold pl-6 pt-2 text-[1.2rem]'>{userData.name}</div> */}

        <div className='flex w-full h-[35%] items-center'>
          <div className={`relative h-[45px] ml-4 flex items-center ${searchBox ? "w-[65%]" : "w-[45px]"} rounded-full transition-all duration-200`}>
            <div onClick={()=>setSearchBox(true)} className='h-full w-[45px] flex items-center justify-center absolute text-purple-600 text-[1.5rem] p-2 bg-white/70 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200'>
              <FaSearch/>
            </div>

            {/* SearchBox  */}

            {searchBox && 
            <div className='w-full h-full'>
              <input type="text" className='focus:outline-none h-full pl-14 text-[1.1rem] p-2 rounded-full w-full bg-white/80 text-gray-800 placeholder:text-gray-500 border-2 border-purple-300 focus:ring-2 focus:ring-purple-400' placeholder='Search chat' />
              <div onClick={()=>setSearchBox(false)} className='absolute right-5 top-2 cursor-pointer font-semibold text-[1.8rem] text-purple-600 hover:text-purple-500'>
                <RxCross2/>
              </div>
            </div>
            }
          </div>

          {/* Active users  */}

          {!searchBox &&
          <div className='ml-6 w-full h-full flex gap-4 items-center overflow-x-auto scrollbar-hide'>
            {otherUsers.map((user)=>(
              onlineUsers && onlineUsers.includes(user._id) &&
              <div key={user._id} onClick={()=>dispatch(setSelectedUser(user))} className='shrink-0 h-[60px] w-[60px] cursor-pointer rounded-full border-3 border-pink-400 shadow-lg shadow-pink-300/40 hover:scale-110 transition-transform duration-200 relative'>
                <img src={user.profile.path} className='shrink-0 h-[60px] w-[60px] object-cover rounded-full' alt="" />
                <div className='absolute bottom-0 right-0 h-3 w-3 bg-pink-400 rounded-full border border-white'></div>
              </div>
            ))}
          </div>
          }
        </div>

        {/* profile DP  */}

        <div onClick={()=>navigate("/profile")} className='cursor-pointer h-[60px] w-[60px] absolute right-6 top-6 rounded-full border-3 border-purple-600 shadow-lg hover:scale-110 transition-transform duration-200'>
          <img src={userData.profile.path}
          draggable={false}
           className='h-[60px] w-[60px] object-cover rounded-full' alt="" />
        </div>
      </div>

      <div className='overflow-y-auto scrollbar-hide relative h-[85%] pt-4 px-2 flex flex-col gap-3 bg-white/30'>
        {otherUsers.map((user)=>
          user.name && 
          <div key={user._id} 
          onClick={()=> {
            dispatch(setSelectedUser(user))
          }} 
          className='cursor-pointer rounded-2xl shadow-lg hover:bg-white/50 hover:shadow-purple-300/30 ml-2 mr-2 p-3 flex items-center gap-3 bg-white/40 transition-all duration-200 group border border-purple-200 hover:border-purple-400'>
            <div className='h-[54px] w-[54px] rounded-full flex-shrink-0 border-2 border-purple-300 group-hover:border-purple-400 transition-colors duration-200'>
              <img src={user.profile.path}
              draggable={false}
              className='h-[54px] w-[54px] object-cover rounded-full' alt="" />
            </div>
            <div className='flex-1 overflow-hidden'>
              <div className='text-gray-800 font-semibold text-[1.1rem] group-hover:text-purple-600 transition-colors duration-200'>
                {user.name}
              </div>
            </div>
          </div>
        )}
      </div>


      
    </div>
  )
}

export default Sidebar
