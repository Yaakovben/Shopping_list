import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connectToMongo}from './config/db'
import userRouter from './routers/userRouter'
import buyingGroupRouterRouter from './routers/buyingGroupRouter'
import productRouter from './routers/productRouter'
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
app.use("/api/buyin-group",buyingGroupRouterRouter)
app.use("/api/product",productRouter)

app.listen(PORT, ()=>{
    console.log(`Server is runnig, visit "http://localhost:${PORT}"`);
})      