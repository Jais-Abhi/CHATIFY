import http from "http"
import express from "express"
import {Server} from "socket.io"


const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors :{
        // origin : "https://chatify-5hwp.onrender.com",
        origin : "http://localhost:5173",
        Credential :true
    }
})

const userSocketMap = {}

const getSocketId = (receiver)=>{
    return userSocketMap[receiver]
}

io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId
    if(userId){
        userSocketMap[userId] = socket.id
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))

    })

})

export {app,server,io,getSocketId}
