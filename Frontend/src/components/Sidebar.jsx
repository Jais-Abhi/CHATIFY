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
    const [searchBox , setSearchBox] = useState(false)

    const handleLogOut = async()=>{
        try {
            await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials : true})
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className={`lg:w-[30%] ${selectedUser ? "hidden w-0" : "block"} w-full lg:block h-screen`}>
        <div className=' h-[25%] w-full bg-[rgb(168,79,192)] relative'  >
            <div className='text-white font-bold pl-4 text-[1.6rem]' >Chatify</div>
            <div className='text-white font-semibold pl-4 pt-2 text-[1.3rem]' > {userData.name} </div>


            <div className='flex w-full h-[55%] items-center' >
            <div className={` relative h-[45px] ml-4 flex items-center ${searchBox ? "w-[65%]" : "w-[45px]"} rounded-full`}>
                <div onClick={()=>setSearchBox(true)} className=' h-full w-[45px] flex items-center justify-center absolute text-black text-[1.5rem] p-2 bg-white rounded-full cursor-pointer' >
                    <FaSearch/>
                </div>

                {/* SearchBox  */}

                {searchBox && 
                <div className='w-full h-full '>
                    <input type="text" className=' h-full pl-14 text-[1.2rem] p-2 rounded-full w-full' placeholder='Search chat' />
                    <div onClick={()=>setSearchBox(false)} className=' absolute right-5  top-2 cursor-pointer font-semibold text-[1.8rem]'>
                    <RxCross2/>
                    </div>
                </div>
                }
            </div>

            {/* Active users  */}

            { !searchBox && 
            <div className='ml-6 w-full h-full flex gap-4 items-center ' > 
                <div className='h-[60px] w-[60px]  cursor-pointer rounded-full ' >
                    <img src={userData.profile.path} className=' h-[60px] w-[60px] object-cover rounded-full' alt="" />
                </div>
                <div className='h-[60px] w-[60px]  rounded-full' >
                    <img src={userData.profile.path} className=' h-[60px] w-[60px] object-cover rounded-full' alt="" />
                </div>
                <div className='h-[60px] w-[60px] rounded-full ' >
                    <img src={userData.profile.path} className=' h-[60px] w-[60px] object-cover rounded-full' alt="" />
                </div>
            </div>
            }
            </div>

            {/* profile DP  */}

            <div onClick={()=>navigate("/profile")} className=' cursor-pointer h-[60px] w-[60px] absolute right-5 top-6 rounded-full'>
                <img src={userData.profile.path} className='h-[60px] w-[60px] object-cover rounded-full' alt="" />
            </div>
        </div>


        <div className=' relative h-[75%] pt-2 border-collapse flex flex-col gap-2 bg-gray-100'>

            {otherUsers.map((user)=>
                <div key={user._id} onClick={()=> dispatch(setSelectedUser(user))} className='cursor-pointer rounded-l-full rounded-r-full  shadow-lg shadow-gray-500 hover:bg-[rgb(167,173,183)] ml-4 mr-4 p-1 flex items-center'>
                <div className='h-[60px] w-[60px] rounded-full ' >
                    <img src={user.profile.path} className=' h-[60px] w-[60px] object-cover rounded-full' alt="" />
                </div>
                <div className='pl-3 text-black font-semibold text-[1.2rem]'>
                    {user.name}
                </div>
            </div>
            )}
            
            {/* logout  */}


            <div onClick={handleLogOut} className=' absolute bottom-4 left-4 text-3xl bg-[rgb(175,104,195)] rounded-full p-2 text-gray-100 cursor-pointer' >
                <RiLogoutCircleLine />
            </div>
        </div>


        
    </div>
  )
}

export default Sidebar