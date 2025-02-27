import mongoose, { Schema, Types } from "mongoose"

export interface IUser extends Document{
    username:string,
    password:string
    list_products:Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    list_products:[{type:mongoose.Schema.Types.ObjectId,ref:"BuyingGroup"}]
})

export default mongoose.model<IUser>("User",userSchema)