import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setMessage } from "../Redux/Slices/messageSlice.js"

const getMessages = ()=>{
    const {selectedUser} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchMessages = async()=>{
            try {
                dispatch(setMessage([]))
                if(selectedUser){
                    const result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`,{withCredentials:true})
                    console.log(result.data)
                    dispatch(setMessage(result.data.messages))
                }
            } catch (error) {
              console.log(error)  
            }
        }
        fetchMessages()
    },[selectedUser])
}

export default getMessages