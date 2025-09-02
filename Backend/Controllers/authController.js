import genToken from "../config/genToken.js"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"

//Controller for signup user

const signupController = async (req,res)=>{
    const {username,email,password} = req.body
try {
    
    const checkByUsername = await User.findOne({username})
    if (checkByUsername){
        return res.status(400).json({message: "Username already exist \n , please try another one"})
    }
    const checkByEmail = await User.findOne({email})
    if (checkByEmail){
        return res.status(400).json({message: "email already exist  , please try another one"})
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

    const token = await genToken(userData._id)

    res.cookie("token",token,{
        httpOnly :true,
        sameSite :"none",
        secure:true,
        maxAge :7*24*60*60*1000
    })
    console.log(token)
    console.log(req.cookies.token)
    return res.status(201).json(userData)

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
            return res.status(400).json({message : "We couldn't find any user registered with this email"})
        }
        const match = await bcrypt.compare(password,user.password)

        if(!match){
            console.log("wrong password")
            return res.status(400).json({message : "Sorry, your password was incorrect.\n Please double-check your password."})
        }

        const token = await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge : 7*24*60*60*1000,
            sameSite : "none",
            secure : true,
        })
        console.log(req.cookies.token)
        console.log(user)
        return res.status(201).json(user)

    } catch (err) {
        console.log("error in login",err)
        return res.status(402).json({message : "something wrong while logging in"})
    }
}



//logoutController 

const logoutController = (req,res)=>{
    try {
    res.clearCookie("token")
    return res.status(202).json({message : "logOut succesfull"})
    } catch (err) {
        return res.status(402).json({message : "error while logout"})
    }
}

export  {
    signupController,
    loginController,
    logoutController
}
