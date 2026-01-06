import axios from 'axios';
import React, { useState } from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import { serverUrl } from '../../main.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedUser, setUserData } from '../../Redux/Slices/userSlice.js';
import LogoutPopup from '../../components/LogoutPopup.jsx';


const Logout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPopup, setShowPopup] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogOut = async()=>{
        setLoading(true)
        try {
            await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials : true})
            dispatch(setUserData(null))
            dispatch(setSelectedUser(null))
            setShowPopup(false)
            setLoading(false)
            navigate('/login')
        } catch (error) {
            console.log(error)
            setShowPopup(false)
            setLoading(false)
        }
    }

    const handleLogoutClick = () => {
        setShowPopup(true)
    }

    const handleCancel = () => {
        setShowPopup(false)
    }

  return (
    <>
      <div onClick={handleLogoutClick} className='absolute bottom-4 left-4 text-3xl bg-gradient-to-r from-red-600 to-red-700 rounded-full p-3 text-white cursor-pointer shadow-lg hover:scale-110 transition-transform duration-200 hover:shadow-red-500/50'>
          <RiLogoutCircleLine />
        </div>
      {showPopup && <LogoutPopup onConfirm={handleLogOut} onCancel={handleCancel} loading={loading} />}
    </>
  )
}

export default Logout