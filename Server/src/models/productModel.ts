import mongoose, { Schema } from "mongoose"
import { productDTO } from "../types/DTO/productDTO"

export interface IProduct extends Document{
    username:string
    password:string
    products?:productDTO[]
}


const productSchema = new Schema<IProduct>({
   username:{type:String,},
   password:{type:String},
   
   products:{
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
export default mongoose.model<IProduct>("product",productSchema)