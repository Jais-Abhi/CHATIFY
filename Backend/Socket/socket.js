import http from "http"
import express from "express"
import {Server} from "socket.io"


const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors :{
        origin : "http://localhost:5173",
        Credential :true
    }
})

const userSocketMap = {}

io.on("connection",(socket)=>{
    console.log(`connected to socket ${socket.handshake.query.userId}`)

})

export {app,server}