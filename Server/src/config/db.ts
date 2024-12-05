import {connect}from 'mongoose'

export const connectToMongo = ( async()=>{
    try {
        await connect(process.env.DB_URI as string)
        console.log("Connected to mongo successfully");
    } catch (err) {
        console.log("Can't connected to mongo", err)
        throw err  
    }
})