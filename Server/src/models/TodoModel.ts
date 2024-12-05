import mongoose, { Schema } from "mongoose"
import { todoDTO } from "../types/todoDTO"

export interface ITodo extends Document{
    name:string
    password:string
    todos:todoDTO[]
}


const todoSchema = new Schema<ITodo>({
   name:{type:String, required:true},
   password:{type:String,required:true},
   
   todos:[
    {
        title:{type:String, requird:true},
        group:{type:String, required:true},
        creted_at:{type: Date, default:Date.now},
        completed:{type:String,default:false} 
    },
   ]
})
export default mongoose.model<ITodo>("Todo",todoSchema)