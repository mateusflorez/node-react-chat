import { Request, Response } from "express";

class UsersController {
    register(req: Request, res: Response, next: any) {
        return res.status(200).json(req.body)
    }
}

export { UsersController }
