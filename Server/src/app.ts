import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connectToMongo}from './config/db'
import userRouter from './routers/userRouter'
import todosRouter from './routers/todoRouter'
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()  
app.use(express.json())

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


connectToMongo()
app.use("/api/user",userRouter)
app.use("/api/todos",todosRouter)

app.listen(PORT, ()=>{
    console.log(`Server is runnig, visit "http://localhost:${PORT}"`);
})      