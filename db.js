const { Pool } = require('pg')
 
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

pool.connect((err) => {
    if (err) throw err
    console.log("Conectado ao PostgreSQL com Sucesso!")
})

module.exports = pool