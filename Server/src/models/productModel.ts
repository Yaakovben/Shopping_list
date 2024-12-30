import mongoose, { Schema, Types } from "mongoose"
import { productDTO } from "../types/DTO/productDTO"

export interface IProduct extends Document{
    name:string,
    amount:number
    created_at?:Date,
    bought?:boolean
}

export interface IBuyingGroup extends Document{
    group_name:string
    password:string
    list_products:IProduct[] | []
    group_members: Types.ObjectId[] |[]

}


const buyingGroupSchema = new Schema<IBuyingGroup>({
    group_name:{type:String,required:true},
    password:{type:String,required:true},
    list_products:
    [{
        name:{type:String,required:true},
        amount:{type:Number,default:1},
        created_at:{type: Date, default:Date.now},
        bought:{type:Boolean,default:false} 
    }],
    group_members:[{type:Types.ObjectId,ref:"User"}]

})

  
export default mongoose.model<IBuyingGroup>("BuyingGroup",buyingGroupSchema)