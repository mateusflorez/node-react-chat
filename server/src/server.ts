import express from "express"
import cors from "cors"

import { PrismaClient } from '@prisma/client'


const app = express()
const prisma = new PrismaClient({
    log: ['query']
})

app.use(express.json())
app.use(cors())

app.listen(3333, () => console.log('Listening on port 3333'))
