# Backend Environment Configuration Guide

This README explains **exactly what to change** in the backend when switching between  
**Localhost**, **LAN (mobile testing)**, and **Production** environments.

This backend uses:
- Express.js
- Cookie-based JWT Authentication
- Socket.IO
- CORS

---

## 🟢 LOCALHOST MODE (Default Development)

Use this when running **frontend + backend on the same laptop**.

### Server
```js
app.listen(5000, () => {
  console.log("Server running on localhost")
})

Express CORS

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

Socket.IO CORS


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
})


Cookies

res.cookie("token", token, {
  httpOnly: true,
  sameSite: "none",
  secure: false,
  maxAge: 7 * 24 * 60 * 60 * 1000
})



## 🟡 LAN MODE (Laptop + Phone on Same Wi-Fi)



Server (IMPORTANT)


app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on LAN")
})

Express CORS

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://10.101.13.184:5173"
  ],
  credentials: true
}))

Socket.IO CORS

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://10.101.13.184:5173"
    ],
    credentials: true
  }
})

Cookies

res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
  maxAge: 7 * 24 * 60 * 60 * 1000
})


⚠️ Do NOT use:

sameSite: "none"
secure: true


in LAN mode (HTTP only).



## 🔴 PRODUCTION MODE (Deployed App)

Server

app.listen(5000, () => {
  console.log("Server running in production")
})

Express CORS

app.use(cors({
  origin: "https://chatify-5hwp.onrender.com",
  credentials: true
}))

Socket.IO CORS

const io = new Server(server, {
  cors: {
    origin: "https://chatify-5hwp.onrender.com",
    credentials: true
  }
})

Cookies (HTTPS REQUIRED)

res.cookie("token", token, {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000
})