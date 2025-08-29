import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";



const Sidebar = () => {

    const {userData} = useSelector((state)=>state.user)
    const [searchBox , setSearchBox] = useState(false)
  return (
    <div className='w-[35%] bg-slate-600 h-screen'>
        <div className=' h-[200px] w-full bg-[rgb(168,79,192)] relative'  >
            <div className='text-white font-bold pl-4 text-[2rem]' >Chatify</div>
            <div className='text-white font-semibold pl-4 pt-4 text-2xl' > {userData.name} </div>


            <div className='flex w-full h-[100px] items-center' >
            <div className={` relative h-[45px] ml-4 flex items-center ${searchBox ? "w-[65%]" : "w-[45px]"} rounded-full`}>
                <div onClick={()=>setSearchBox(true)} className=' h-full w-[45px] flex items-center justify-center absolute text-black text-[1.5rem] p-2 bg-white rounded-full cursor-pointer' >
                    <FaSearch/>
                </div>
                {searchBox && 
                <div className='w-full h-full '>
                    <input type="text" className=' h-full pl-14 text-[1.2rem] p-2 rounded-full w-full' placeholder='Search chat' />
                    <div onClick={()=>setSearchBox(false)} className=' absolute right-5  top-2 cursor-pointer font-semibold text-[1.8rem]'>
                    <RxCross2/>
                    </div>
                </div>
                }
            </div>
            { !searchBox && 
            <div className='ml-6 w-full h-full flex gap-4 items-center ' > 
                <div className='h-[60px] w-[60px]  rounded-full ' >
                    <img src={userData.profile.path} className=' rounded-full' alt="" />
                </div>
                <div className='h-[60px] w-[60px]  rounded-full' >
                    <img src={userData.profile.path} className=' rounded-full' alt="" />
                </div>
                <div className='h-[60px] w-[60px] rounded-full ' >
                    <img src={userData.profile.path} className=' rounded-full' alt="" />
                </div>
            </div>
            }
            </div>
            


            <div className='h-[60px] w-[60px] absolute right-5 top-10 rounded-full'>
                <img src={userData.profile.path} className='  rounded-full' alt="" />
            </div>
        </div>
    </div>
  )
}

export default Sidebar