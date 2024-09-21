import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db/Conn.js'
import userRouter from './routes/user.route.js'

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 4001

connectDB();

app.use('/api/user', userRouter)

app.listen(port, ()=>{
    console.log(`Server listening at port: ${port}`);
    
})