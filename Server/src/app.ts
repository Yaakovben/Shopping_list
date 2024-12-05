import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connect } from 'mongoose'
import {connectToMongo}from './config/db'

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()


connectToMongo()
app.use(express.json())
app.use("/api/user",()=>{})
app.use("/api/todos",()=>{})

app.listen(PORT, ()=>{
    console.log(`Server is runnig, visit http://localhost:${PORT}`);
}) 