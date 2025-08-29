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
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const port = process.env.PORT || 8000
const atlasUrl = process.env.ATLAS_URL


const main = async ()=>{
    await mongoose.connect(atlasUrl)
}

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
    main()
    .then(()=>{
    console.log("Connected to DB")
    })
    .catch((err)=>{
    console.log(`FAiled to connect with DB`,err)
})
})



app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/message",messageRoute)