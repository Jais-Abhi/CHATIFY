import express from "express"
import {signupController,loginController} from "../Controllers/authController.js"
import User from "../models/userModel.js"

const router = express.Router()

router.get("/",(req,res)=>{
    res.send("homepage")
})
router.post("/signup",signupController)
router.post("/login",loginController)

export default router