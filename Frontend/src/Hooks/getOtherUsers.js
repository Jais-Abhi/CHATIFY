import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers } from "../Redux/Slices/userSlice.js"

const getOtherUsers = ()=>{
    const dispatch = useDispatch()
    const {userData} = useSelector((state)=>state.user)
    useEffect (()=>{
        const fetchOtherUsers = async ()=>{
           try {
            if(userData){
                const otherUsers = await axios.get(`${serverUrl}/api/user/others`,{withCredentials : true})
                dispatch(setOtherUsers(otherUsers.data))
            }
               
           } catch (error) {
            console.log(error)
           }
        }
        fetchOtherUsers()
    },[userData])
}

export default getOtherUsers