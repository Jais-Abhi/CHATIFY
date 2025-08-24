import { useEffect } from "react"
import axios from "axios"
import { serverUrl } from "../main.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../Redux/Slices/userSlice.js"

const getCurrentUser = ()=>{
    const dispatch= useDispatch()
    const {userData} = useSelector((state)=>state.user)
    
    useEffect (()=>{
        const fetchUser = async ()=>{
            try {
                const user = await axios.get(`${serverUrl}/api/user/current`,{withCredentials :true})
                // console.log(user)
                dispatch(setUserData(user.data))
            } catch (error) {
                console.log("error while getting current user data")
            }
        }
        fetchUser()
    },[])
}

export default getCurrentUser