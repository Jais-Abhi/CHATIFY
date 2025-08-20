
import jwt from "jsonwebtoken"

const isAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.token
    if(!token){
        console.log("token not found")
        return res.status(400).json({message : "token not found"})
    }
    const {userId} = await jwt.verify(token,process.env.JWT_SECRET)
    // console.log(userId)
    req.userId = userId
    next()

    } catch (error) {
        console.log(`error while getting token userId ${error}`)
    }
}

export default isAuth