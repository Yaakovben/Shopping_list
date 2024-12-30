import { newProductDTO } from "../types/DTO/newProductDTO";
import Product, { IProduct } from "../models/buyingGroupModel";
import { changeStatusDTO } from "../types/DTO/changeStatusDTO";
import { deleteDTO } from "../types/DTO/DeleteDTO";
import { getAllForGroupDTO } from "../types/DTO/getAllForGroupDTO";
import { getNamesGroupsDTO } from "../types/DTO/getNamesGroupsDTO";
import { newGroupDTO } from "../types/DTO/newGroupDTO";
import buyingGroupModel from "../models/buyingGroupModel";





export const createnewGroup = async(newGroup:newGroupDTO)=>{
    try {
        console.log(newGroup);
        if(!newGroup.group_name || ! newGroup.password) throw new Error("All fields are required❗❗❗");
        const newGroupToAdd = new buyingGroupModel(newGroup)
        return await newGroupToAdd.save()
    } catch (err) {
        throw new Error((err as Error).message) 
    }
}



export const createProduct = async(newProduct:newProductDTO)=>{
    try {
        if(!newProduct.group || ! newProduct.title || !newProduct.userId) throw new Error("All fields are required❗❗❗");
        const user  = await Product.findOne({_id:newProduct.userId})
        if (!user) throw new Error ("User not found 🧐")
            const newProductToAdd = {
                user_id :user._id,
                title:newProduct.title,
                group:newProduct.group,
                created_at:new Date(),
                completed:false
            }
        user.products?.push(newProduct)
        await user.save()
        return newProductToAdd
    } catch (err) {
        throw new Error((err as Error).message)   
    }
}

 export const changeStatus = async(product:changeStatusDTO)=>{
    try {
        const user = await Product.findOne({_id:product.userId})
        if(!user) throw new Error ("User not found 🧐")
        const productToupdate = user.products?.find((i:any)=>i._id.toString() == product.productId)
        if(! productToupdate) throw new Error ("product not found 🧐")
        productToupdate.completed = !productToupdate.completed
        await user.save()
        return productToupdate
    } catch (err) {
        throw new Error((err as Error).message);
    }
}

export const deleteProduct = async(todo:deleteDTO)=>{
    try {
        const user = await Product.findOne({_id:todo.userId})
        if(!user) throw new Error ("User not found 🧐")
        const todoToDelete = user.products?.find((i:any)=>i._id.toString() == todo.productId)
        if(! todoToDelete) throw new Error ("product npt found 🧐")
        user.products = user.products?.filter((t:any)=>t._id != todo.productId)
        await user.save()
        const pdatedUser = await Product.findOne({_id:todo.userId})
        return pdatedUser
    } catch (err) {
        throw new Error((err as Error).message);
    }
}

export const getAllProduct = async(userId:string)=>{
    try {
        userId = userId.trim();
        const user = await Product.findOne({_id:userId})
        if(!user) throw new Error  ("User not found 🧐")
        return user.products 
    } catch (err) {
        throw new Error((err as Error).message);
    }
}

export const getAllForGroup = async(getGroup:getAllForGroupDTO)=>{
    try {
        const user =await Product.findOne({_id:getGroup.userId})
        if(!user) throw new Error ("product npt found 🧐")
        const listGruop = user.products?.filter((t)=>t.group == getGroup.nameGroup)
        if(listGruop?.length === 0) throw new Error  ("The name group not found 🧐")
        return listGruop
    } catch (err) {
        throw new Error((err as Error).message);
    }
}

export const getAllNamesGroups = async(getNamesGroups:getNamesGroupsDTO)=>{
    try {
        const user = await Product.findOne({_id:getNamesGroups.userId}).lean()
        if(!user) throw new Error ("user npt found 🧐")
        const listGroups = new Set<string>()
        user?.products?.forEach(todo =>{
            if(todo){ listGroups.add(todo.group)}    
        })
        console.log(listGroups);
        return Array.from(listGroups) 
    } catch (err) {
        throw new Error((err as Error).message);
        
    }


}