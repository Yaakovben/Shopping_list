import mongoose, { Schema, Types } from "mongoose"

export interface IProduct{
    name:string,
    amount:number
    created_at?:Date,
    details?:string
    bought?:boolean
}

export interface IBuyingGroup extends Document{
    group_name:string
    password:string
    lists_products:IProduct[] 
    group_members: Types.ObjectId[]
}

const buyingGroupSchema = new Schema<IBuyingGroup>({
    group_name:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    lists_products:{
        type: [{
            name:{type:String},
            amount:{type:Number,default:1},
            created_at:{type: Date, default:Date.now},
            details:{type:String},
            bought:{type:Boolean,default:false} 
        }]
    },
    group_members:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]
})

export default mongoose.model<IBuyingGroup>("Buying-group",buyingGroupSchema)