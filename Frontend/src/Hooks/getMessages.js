import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setChatLoading, setMessages } from "../Redux/Slices/messageSlice.js"

const getMessages = ()=>{
    const {selectedUser} = useSelector((state)=>state.user)
    const {messages} = useSelector((state)=>state.message)
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchMessages = async()=>{
            try {
                dispatch(setMessages([]))
                dispatch(setChatLoading(true))
                if(selectedUser){
                    const result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`,{withCredentials:true})
                    dispatch(setMessages(result.data.messages))
                    dispatch(setChatLoading(true))
                }
            } catch (error) {
              console.log(error)  
            }
        }
        fetchMessages()
    },[selectedUser])
}

export default getMessages