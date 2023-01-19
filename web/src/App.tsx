import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import * as socketio from 'socket.io-client'

const socket = socketio.connect("http://localhost:3333")

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Chat socket={socket} />} />
      <Route path="/setAvatar" element={<SetAvatar />} />
    </Routes>
  </BrowserRouter>)
}

export default App
