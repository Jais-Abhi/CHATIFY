import express from "express"
import {signupController,loginController} from "../Controllers/authController.js"
import User from "../models/userModel.js"

const authRoute = express.Router()

// authRoute.get("/",(req,res)=>{
//     res.redirect("/signup")
// })
authRoute.post("/signup",signupController)
authRoute.post("/login",loginController)

export default authRoute