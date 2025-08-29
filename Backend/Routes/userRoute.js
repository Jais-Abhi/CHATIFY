import express from "express"
import isAuth from "../Middleware/isAuth.js"
import getCurrentUser from "../Controllers/getCurrentUser.js"
import {storage}  from "../config/cloud.js"
import profileController from "../Controllers/profileController.js"

import multer from "multer"
import getOtherUsers from "../Controllers/getOtherUsers.js"
const upload = multer({storage})
const userRoute = express.Router()


userRoute.get("/current",isAuth,getCurrentUser)
userRoute.post("/profile",isAuth,upload.single("image"),profileController)
userRoute.get("/others",isAuth,getOtherUsers)
export default userRoute
