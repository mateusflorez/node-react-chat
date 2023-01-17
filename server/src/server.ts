import express from "express"
import cors from "cors"

import { userRoutes } from "./routes/userRoutes";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", userRoutes)

app.listen(3333, () => console.log('Listening on port 3333'))
