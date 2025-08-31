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


io.on("connection",(socket)=>{
    console.log(`connected to server ${socket.id}`)
})

export {app,server}