import buyingGroupModel from "../models/buyingGroupModel";
import mongoose from "mongoose";
import userModel, { IUser } from "../models/userModel";
import { newGroupDTO } from "../types/DTO/newGroupDTO";
import { leftGroupDTO } from "../types/DTO/leftGroupDTO";


export const createnewGroup = async(newGroup:newGroupDTO)=>{
    try { 
        if(!newGroup.group_name || ! newGroup.password) throw new Error("All fields are required❗❗❗");
        const user =await userModel.findOne({_id:newGroup.user_id})
        if(!user) throw new Error ("User not found 🧐")
        const groups = await buyingGroupModel.find({group_name:newGroup.group_name}).lean()
        if (groups.length > 0) {
            throw new Error("Group already exists, choose another name.");
        }
        const group = {
            group_name:newGroup.group_name,
            password:newGroup.password,
            group_members: newGroup.user_id
        }
        const newGroupToAdd = new buyingGroupModel(group)
        await newGroupToAdd.save()
        user.list_products.push(newGroupToAdd._id) 
        await user.save()
        return newGroupToAdd
    } catch (err) {
        throw new Error((err as Error).message) 
    }
}

export const addUserToGroup = async(joinToGroup:newGroupDTO)=>{
    try {
        if(!joinToGroup.user_id || ! joinToGroup.group_name || !joinToGroup.password) throw new Error("All fields are required❗❗❗");
        const group = await buyingGroupModel.findOne({group_name:joinToGroup.group_name,password:joinToGroup.password})
        if(!group) throw new Error ("The group name or password is invalid 🧐")
        const user = await userModel.findOne({_id:joinToGroup.user_id})
        if(!user) throw new Error ("User not found 🧐")
        if (group.group_members.includes(new mongoose.Types.ObjectId(joinToGroup.user_id))) {
                throw new Error("User already in the group.");
            }
        group.group_members.push(new mongoose.Types.ObjectId(joinToGroup.user_id));
        user.list_products.push(group._id)
        await group.save();
        await user.save();
        return group; 
    } catch (err) {
        throw new Error((err as Error).message) 
    }
}



export const allMyLists = async(username:string)=>{
    try {
        const lists = await userModel.findOne({username:username}).populate({
            path:"list_products"
            ,model:"Buying-group"
            ,select:"group_name"}).lean()
        if(!lists) throw new Error ("User not found 🧐")
        const namesLists = lists.list_products.map((list:any)=>list.group_name)
        return namesLists
    } catch (err) {
        console.log((err as Error).message);
    }
}


export const deleteGroup = async(user:leftGroupDTO)=>{
    try {
        const userfromdb =await userModel.findOne({_id:user.user_id}).populate({
            path:"list_products",
            model:"Buying-group",
        })
        if(!userfromdb) throw new Error ("User not found 🧐")
        const group = await buyingGroupModel.findOne({group_name:user.group_name})
        if(!group) throw new Error ("Group not found 🧐")
        const membertoremove = group.group_members.filter((id:any)=> id.toString()!== user.user_id.toString())
        group.group_members = membertoremove
        await group.save()
        
        const listToRemove = userfromdb.list_products.filter((id:any)=> !id.equals(group._id));
        userfromdb.list_products = listToRemove
        await userfromdb.save()
        return userfromdb
    } catch (err) {
        console.log((err as Error).message);   
    } 
}



// export const createProduct = async(newProduct:newProductDTO)=>{
//     try {
//         if(!newProduct.group_name || ! newProduct.name || !newProduct.amount) throw new Error("All fields are required❗❗❗");
//         const group  = await buyingGroupModel.findOne({group_name:newProduct.group_name})
//         if (!group) throw new Error ("Group not found 🧐")
//             const newProductToAdd = {
//                 name:newProduct.name,
//                 amount:newProduct.amount,
//             }
//         group.list_products.push(newProductToAdd)
//         await group.save()
//         return newProductToAdd
//     } catch (err) {
//         throw new Error((err as Error).message)   
//     }
// }

//  export const changeStatus = async(product:changeStatusDTO)=>{
//     try {
//         const user = await Product.findOne({_id:product.userId})
//         if(!user) throw new Error ("User not found 🧐")
//         const productToupdate = user.products?.find((i:any)=>i._id.toString() == product.productId)
//         if(! productToupdate) throw new Error ("product not found 🧐")
//         productToupdate.completed = !productToupdate.completed
//         await user.save()
//         return productToupdate
//     } catch (err) {
//         throw new Error((err as Error).message);
//     }
// }

// export const deleteProduct = async(todo:deleteDTO)=>{
//     try {
//         const user = await Product.findOne({_id:todo.userId})
//         if(!user) throw new Error ("User not found 🧐")
//         const todoToDelete = user.products?.find((i:any)=>i._id.toString() == todo.productId)
//         if(! todoToDelete) throw new Error ("product npt found 🧐")
//         user.products = user.products?.filter((t:any)=>t._id != todo.productId)
//         await user.save()
//         const pdatedUser = await Product.findOne({_id:todo.userId})
//         return pdatedUser
//     } catch (err) {
//         throw new Error((err as Error).message);
//     }
// }

// export const getAllProduct = async(userId:string)=>{
//     try {
//         userId = userId.trim();
//         const user = await Product.findOne({_id:userId})
//         if(!user) throw new Error  ("User not found 🧐")
//         return user.products 
//     } catch (err) {
//         throw new Error((err as Error).message);
//     }
// }

// export const getAllForGroup = async(getGroup:getAllForGroupDTO)=>{
//     try {
//         const user =await Product.findOne({_id:getGroup.userId})
//         if(!user) throw new Error ("product npt found 🧐")
//         const listGruop = user.products?.filter((t)=>t.group == getGroup.nameGroup)
//         if(listGruop?.length === 0) throw new Error  ("The name group not found 🧐")
//         return listGruop
//     } catch (err) {
//         throw new Error((err as Error).message);
//     }
// }

// export const getAllNamesGroups = async(getNamesGroups:getNamesGroupsDTO)=>{
//     try {
//         const user = await Product.findOne({_id:getNamesGroups.userId}).lean()
//         if(!user) throw new Error ("user npt found 🧐")
//         const listGroups = new Set<string>()
//         user?.products?.forEach(todo =>{
//             if(todo){ listGroups.add(todo.group)}    
//         })
//         console.log(listGroups);
//         return Array.from(listGroups) 
//     } catch (err) {
//         throw new Error((err as Error).message);
        
//     }


// }