import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../Slices/userSlice.js";
import messageReducer from "../Slices/messageSlice.js"

const store = configureStore({
    reducer : {
        user : userReducer,
        message :messageReducer
    }
})

export default store