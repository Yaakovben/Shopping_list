import mongoose, { Schema } from "mongoose"
import { todoDTO } from "../types/DTO/todoDTO"

export interface ITodo extends Document{
    username:string
    password:string
    todos?:todoDTO[]
}


const todoSchema = new Schema<ITodo>({
   username:{type:String,},
   password:{type:String},
   
   todos:{
    type:[
    {
        title:{type:String},
        group:{type:String},
        created_at:{type: Date, default:Date.now},
        completed:{type:Boolean,default:false} 
    },
   ],
   default:[]
    }
})
export default mongoose.model<ITodo>("Todo",todoSchema)