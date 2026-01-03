import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
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

    const handleLogOut = async()=>{
        try {
            await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials : true})
            dispatch(setUserData(null))
            dispatch(setSelectedUser(null))
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className={`lg:w-[30%] ${selectedUser ? "hidden w-0" : "block"} w-full lg:block h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 transition-all duration-300`}>
      <div className='h-[25%] w-full bg-gradient-to-r from-cyan-600 to-blue-600 relative rounded-b-3xl shadow-lg border-b-2 border-cyan-400'>
        <div className='text-white font-bold pl-6 pt-6 text-[2rem] drop-shadow-lg'>Chatify</div>
        <div className='text-white font-semibold pl-6 pt-2 text-[1.2rem]'>{userData.name}</div>

        <div className='flex w-full h-[35%] items-center'>
          <div className={`relative h-[45px] ml-4 flex items-center ${searchBox ? "w-[65%]" : "w-[45px]"} rounded-full transition-all duration-200`}>
            <div onClick={()=>setSearchBox(true)} className='h-full w-[45px] flex items-center justify-center absolute text-cyan-600 text-[1.5rem] p-2 bg-white rounded-full cursor-pointer hover:scale-110 transition-transform duration-200'>
              <FaSearch/>
            </div>

            {/* SearchBox  */}

            {searchBox && 
            <div className='w-full h-full'>
              <input type="text" className='focus:outline-none h-full pl-14 text-[1.1rem] p-2 rounded-full w-full bg-gray-700 text-white placeholder:text-gray-400 border-2 border-cyan-400 focus:ring-2 focus:ring-cyan-300' placeholder='Search chat' />
              <div onClick={()=>setSearchBox(false)} className='absolute right-5 top-2 cursor-pointer font-semibold text-[1.8rem] text-cyan-300 hover:text-cyan-100'>
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
              <div key={user._id} onClick={()=>dispatch(setSelectedUser(user))} className='shrink-0 h-[60px] w-[60px] cursor-pointer rounded-full border-3 border-green-400 shadow-lg shadow-green-500/50 hover:scale-110 transition-transform duration-200 relative'>
                <img src={user.profile.path} className='shrink-0 h-[60px] w-[60px] object-cover rounded-full' alt="" />
                <div className='absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border border-white'></div>
              </div>
            ))}
          </div>
          }
        </div>

        {/* profile DP  */}

        <div onClick={()=>navigate("/profile")} className='cursor-pointer h-[60px] w-[60px] absolute right-6 top-6 rounded-full border-3 border-cyan-300 shadow-lg hover:scale-110 transition-transform duration-200'>
          <img src={userData.profile.path}
          draggable={false}
           className='h-[60px] w-[60px] object-cover rounded-full' alt="" />
        </div>
      </div>

      <div className='overflow-y-auto scrollbar-hide relative h-[75%] pt-4 px-2 flex flex-col gap-3 bg-slate-800/50'>
        {otherUsers.map((user)=>
          user.name && 
          <div key={user._id} 
          onClick={()=> {
            dispatch(setSelectedUser(user))
          }} 
          className='cursor-pointer rounded-2xl shadow-lg hover:bg-slate-700/80 hover:shadow-cyan-500/30 ml-2 mr-2 p-3 flex items-center gap-3 bg-slate-700/50 transition-all duration-200 group border border-slate-600 hover:border-cyan-500'>
            <div className='h-[54px] w-[54px] rounded-full flex-shrink-0 border-2 border-slate-500 group-hover:border-cyan-400 transition-colors duration-200'>
              <img src={user.profile.path}
              draggable={false}
              className='h-[54px] w-[54px] object-cover rounded-full' alt="" />
            </div>
            <div className='flex-1 overflow-hidden'>
              <div className='text-white font-semibold text-[1.1rem] group-hover:text-cyan-300 transition-colors duration-200'>
                {user.name}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* logout  */}

      <div onClick={handleLogOut} className='absolute bottom-4 left-4 text-3xl bg-gradient-to-r from-red-600 to-red-700 rounded-full p-3 text-white cursor-pointer shadow-lg hover:scale-110 transition-transform duration-200 hover:shadow-red-500/50'>
        <RiLogoutCircleLine />
      </div>
    </div>
  )
}

export default Sidebar
