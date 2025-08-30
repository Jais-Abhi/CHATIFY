import express from "express"
import isAuth from "../Middleware/isAuth.js"
import { getMessages, sendMessage } from "../Controllers/messageController.js"
const messageRoute = express.Router()

messageRoute.post("/send/:receiver",isAuth,sendMessage)
messageRoute.get("/get/:receiver",isAuth,getMessages)

export default messageRoute