import express from "express"
import isAuth from "../Middleware/isAuth.js"
import getCurrentUser from "../Controllers/getCurrentUser.js"
const userRoute = express.Router()


userRoute.get("/data",isAuth,getCurrentUser)
export default userRoute
