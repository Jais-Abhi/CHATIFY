import User from "../models/userModel.js";

const getOtherUsers = async(req,res)=>{
    try {
        const userId = req.userId
        if(!userId){
            return res.status(400).json({message : "error while gettinf userId in others chats"})
        }
        const users = await User.find({
            _id : { $ne : userId}
        }).select("-password")

        return res.status(200).json(users)
    } catch (error) {
        return res.status(402).json({message : "Error while getting users from database"})
    }
}

export default getOtherUsers