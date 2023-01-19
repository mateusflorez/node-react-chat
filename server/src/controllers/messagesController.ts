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

            const from: any = req.query.from
            const to: any = req.query.to
            const messages = await prisma.message.findMany({
                where: {
                    OR: [
                        {
                            AND: [
                                { senderId: from },
                                { receiverId: to }
                            ]
                        },
                        {
                            AND: [
                                { senderId: to },
                                { receiverId: from }
                            ]
                        }
                    ]
                },
                orderBy: {
                    createdAt: 'asc'
                }
            })
            return res.json(messages)
        } catch (err) {
            next(err)
        }
    }
}

export { MessagesController }
