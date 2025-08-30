import { useEffect } from "react"
import { serverUrl } from "../main"
import { useSelector } from "react-redux"
import axios from "axios"

const getMessages = ()=>{
    const {selectedUser} = useSelector((state)=>state.user)
    useEffect(()=>{
        const fetchMessages = async()=>{
            try {
                if(selectedUser){
                    const result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`,{withCredentials:true})
                    console.log(result.data)
                }
            } catch (error) {
              console.log(error)  
            }
        }
        fetchMessages()
    },[selectedUser])
}

export default getMessages