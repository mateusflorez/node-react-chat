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
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    isAvatarImageSet: user.isAvatarImageSet,
                    avatarImage: user.avatarImage
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    isAvatarImageSet: user.isAvatarImageSet,
                    avatarImage: user.avatarImage
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async login(req: Request, res: Response, next: any) {
        try {
            const { username, password } = req.body
            const user = await prisma.user.findUnique({ where: { username } })
            if (!user)
                return res.json({ msg: "Incorrect username or password", status: false })
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid)
                return res.json({ msg: "Incorrect username or password", status: false })
            return res.json({
                status: true,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    isAvatarImageSet: user.isAvatarImageSet,
                    avatarImage: user.avatarImage
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async setAvatar(req: Request, res: Response, next: any) {
        try {
            const userId = req.params.id
            const avatarImage = req.body.image
            const user = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    isAvatarImageSet: true,
                    avatarImage
                }
            })
            return res.json({
                status: true,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    isAvatarImageSet: user.isAvatarImageSet,
                    avatarImage: user.avatarImage
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async getAllUsers(req: Request, res: Response, next: any) {
        try {
            const userId = req.params.id
            const users = await prisma.user.findMany({
                where: {
                    id: {
                        not: userId
                    }
                },
                select: {
                    email: true,
                    username: true,
                    avatarImage: true,
                    id: true
                }
            })
            return res.json(users)
        } catch (err) {
            next(err)
        }
    }
}

export { UsersController }
