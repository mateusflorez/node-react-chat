import { Router } from "express";
import { MessagesController } from "../controllers/messagesController";

const messageRoutes = Router()

const messagesController = new MessagesController()

messageRoutes.post("/addMessage", messagesController.addMessage)
messageRoutes.get("/getMessages", messagesController.getAllMessages)

export { messageRoutes }
