import express from "express"
import isAuth from "../Middleware/isAuth.js"
import getCurrentUser from "../Controllers/getCurrentUser.js"
import { storage } from "../config/cloud.js"

import multer from "multer"
const upload = multer({storage})
const userRoute = express.Router()


userRoute.get("/current",isAuth,getCurrentUser)
userRoute.post("/profile",upload.single("image"),isAuth,profileController)
export default userRoute
