import genToken from "../config/genToken.js"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"

//Controller for signup user

const signupController = async (req,res)=>{
    const {username,email,password} = req.body
try {
    
    const checkByUsername = await User.findOne({username})
    if (checkByUsername){
        return res.status(400).json({message: "Username already exist"})
    }
    const checkByEmail = await User.findOne({email})
    if (checkByEmail){
        return res.status(400).json({message: "email already exist"})
    }
    if(password.length <6){
        return res.status(400).json({message: "password should be atleast 6 digits"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })

    const userData = await newUser.save()
    console.log(userData)

    const token = genToken(userData._id)

    res.cookie("token",token,{
        httpOnly :true,
        sameSite :"none",
        secure:false,
        maxAge :7*24*60*60*1000
    })
    res.status(201).json({userData})

} catch (err) {
    res.status(400).json({message : "signup fail"})
    console.log("error in signup",err)
}}

//Controller for login user

const loginController = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message : "user not exist with this email"})
        }
        const match = await bcrypt.compare(password,user.password)

        if(!match){
            return res.status(400).json({message : "wrong password"})
        }

        const token = await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge : 7*24*60*60*1000,
            secure : false,
            sameSite : "lax"
        })
        console.log(req.cookies)
        res.status(201).json(user)

    } catch (err) {
        console.log("error in login",err)
        res.status(402).json({message : "Error while login"})
    }
}


export  {
    signupController,
    loginController
}
