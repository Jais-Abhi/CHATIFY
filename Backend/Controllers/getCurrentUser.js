import User from "../models/userModel.js"

const getCurrentUser = async(req,res)=>{
    try {
        const userId = req.userId
        if(!userId){
            return res.status(400).json({message: "user id not found"})
        }
        const user = await User.findById(userId).select("-password")

        if(!user){
            return res.status(400).json({message: " user not found with this userId"})
        }
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json("error to getting user",error)
    }
}

export default getCurrentUser