import express from "express";
import dotenv from "dotenv";
import { generate } from "./toolCalling.js";
import cors from "cors"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to ToolLM!")
})

app.post('/chat', async (req, res) => {
    const { message, sessionId } = req.body

    if(!message || !sessionId) {
        res.status(400).json({ message: "All fields are required" })
        return
    }

    console.log("message: ",message)

    const response = await generate(message, sessionId)

    res.json({ message: response })
})

const port = process.env.PORT || 8001

app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`)
})