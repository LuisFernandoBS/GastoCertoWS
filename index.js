const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.json())


const userRouter = require('./routes/user.router')

app.use("/api/v1/user", userRouter)

app.listen(process.env.POSTGRES_PORT, () => console.log("Server running on port 5000"))