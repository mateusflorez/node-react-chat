import express from "express"
import cors from "cors"
import * as socketio from 'socket.io'


import { userRoutes } from "./routes/userRoutes";
import { messageRoutes } from "./routes/massageRoutes";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)

const server = app.listen(3333, () => console.log('Listening on port 3333'))

const io: socketio.Server = new socketio.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
})

io.on("connection", (socket) => {

    socket.on("add-user", (userId) => {
        io.emit(userId, socket.id)
    })

    socket.on("message", (message) => {
        io.emit("messageResponse", message)
    })
})
