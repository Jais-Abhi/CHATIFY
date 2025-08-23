import {v2 as cloudinary} from "cloudinary"
import cloudinaryStorage from "multer-storage-cloudinary"

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_KEY,
    api_secret : process.env.CLOUD_SECRET
})

const storage = cloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : "Chatify Profile Dp's",
        allowed_format : ["png","jpg","jpeg"]
    }
})

export  {
    cloudinary,
    storage
}
