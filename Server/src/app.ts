import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connectToMongo}from './config/db'
import userRouter from './routers/userRouter'
import buyingGroupRouterRouter from './routers/buyingGroupRouter'
import productRouter from './routers/productRouter'
import { Server } from 'socket.io'
import http from 'http'
import { handleSocketConnection } from './socket/io'
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express() 
app.use(express.json())
const httpServer:http.Server = http.createServer(app)
export const io = new Server(httpServer,{
    cors:{
        origin:'http://localhost:5173',
        methods:"*"
    }
})

io.on('connection', handleSocketConnection)

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],       
}));


connectToMongo()
app.use("/api/user",userRouter)
app.use("/api/buyin-group",buyingGroupRouterRouter)
app.use("/api/product",productRouter)

httpServer.listen(PORT, ()=>{
    console.log(`Server is runnig, visit "http://localhost:${PORT}"`);
})      