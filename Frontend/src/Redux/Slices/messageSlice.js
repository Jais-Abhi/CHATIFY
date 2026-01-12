import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name : "message",
    initialState :{
        messages :[],
        chatLoading : true,
    },
    reducers : {
        setMessages : (state,action)=>{
            state.messages = action.payload
        },
        setChatLoading : (state,action)=>{
            state.chatLoading = action.payload
        }
    }
})

export const {setMessages,setChatLoading} = messageSlice.actions
export default messageSlice.reducer