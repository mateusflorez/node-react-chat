import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['query']
})

class MessagesController {
    async addMessage(req: Request, res: Response, next: any) {
        try {
            const { from, to, message } = req.body
            const data = await prisma.message.create({
                data: {
                    senderId: from,
                    receiverId: to,
                    message: message
                }
            })
            if (data)
                return res.json({ message: "Message added successfuly" })
            return res.json({ message: "Error adding message" })
        } catch (err) {
            next(err)
        }
    }
    async getAllMessages(req: Request, res: Response, next: any) {
        try {

        } catch (err) {
            next(err)
        }
    }
}

export { MessagesController }
