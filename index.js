const express = require("express")
const cors = require('cors');
const app = express()

require('dotenv').config()

app.use(express.json())
app.use(cors());


const gastoRouter = require('./routes/gasto.router')

app.use("/api/v1/gasto", gastoRouter)

app.listen(process.env.POSTGRES_PORT, () => console.log("Servidor rodando na porta 5000"))