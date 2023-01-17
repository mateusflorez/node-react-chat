import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient({
    log: ['query']
})

class UsersController {
    async register(req: Request, res: Response, next: any) {
        try {
            const { username, email, password } = req.body
            const usernameCheck = await prisma.user.findUnique({ where: { username } })
            if (usernameCheck)
                return res.json({ msg: "Username already used", status: false })
            const emailCheck = await prisma.user.findUnique({ where: { email: email } })
            if (emailCheck)
                return res.json({ msg: "Email already used", status: false })
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword
                }
            })
            return res.json({
                status: true,
                user: {
                    email: email,
                    username: username
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

export { UsersController }
