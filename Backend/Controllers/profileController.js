import User from "../models/userModel.js"


const profileController = async (req,res)=>{
    console.log(req.file.path)
    console.log(req.file.filename)
    console.log(req.body.name)
    console.log(req.userId)
    try {
        if(!req.body.name){
            return res.status(401).json({message : "name should be provided"})
        }
        const verifyById = await User.findById(req.userId)
        if(!verifyById){
            return res.status(401).json({message : "user Not find for profile updation"})
        }
        const user = await User.findByIdAndUpdate(req.userId,{
            name : req.body.name,
            profile : {
                path :req.file.path,
                filename :req.file.filename
            }
        },{new:true})
        console.log(user)
        return res.status(201).json(user)

    } catch (error) {
        return res.status(402).json({message : "something wrong while updating profile"})
    }
}
export default profileController