import express from 'express'
import dbconnect from './config/db.config.js'
import dotenv from 'dotenv'
import cors from 'cors'
import route from './routes/index.route.js'
import client from './config/redis.congif.js'
dotenv.config()
const app = express()
dbconnect()
app.use(express.json())
app.use(cors())


app.use('/api',route)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port  http://localhost:${PORT}`)
})