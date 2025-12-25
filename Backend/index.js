import dotenv from "dotenv"
dotenv.config()
console.log("Runs after all impoted");
import express from "express"
import mongoose from "mongoose"
import authRoute from "./Routes/authRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoute from "./Routes/userRoute.js"
import hello from "./config/hello.js";
import messageRoute from "./Routes/messageRoute.js";
import { app, server } from "./Socket/socket.js";
import User from "./models/userModel.js";
import Message from "./models/messageModel.js";
import Conversation from "./models/conversationModel.js";
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const port = process.env.PORT || 8000
const atlasUrl = process.env.ATLAS_URL


const main = async ()=>{
    await mongoose.connect(atlasUrl)
}

app.use(cors({
    origin : "https://chatify-5hwp.onrender.com",
    credentials : true
}))

server.listen(port,()=>{
    console.log(`app is running on port ${port}`)
    main()
    .then(async ()=>{
        console.log("Connected to DB")
        // await User.deleteMany({});
        // console.log("✅ All messages deleted (collection kept).");
    })
    .catch((err)=>{
    console.log(`FAiled to connect with DB`,err)
})
})



app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/message",messageRoute)
