import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import authRoute from "./Routes/authRoute.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const port = process.env.PORT || 8000
const atlasUrl = process.env.ATLAS_URL

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})

const main = async ()=>{
    await mongoose.connect(atlasUrl)
}

main()
.then(()=>{
    console.log("Connected to DB")
})
.catch((err)=>{
    console.log(`FAiled to connect with DB`,err)
})



app.use("/",authRoute)