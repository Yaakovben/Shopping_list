import { newProductDTO } from "../types/DTO/newProductDTO";
import Product, { IProduct } from "../models/productModel";
import { changeStatusDTO } from "../types/DTO/changeStatusDTO";
import { deleteDTO } from "../types/DTO/DeleteDTO";
import { getAllDTO } from "../types/DTO/getAll";
import { getAllForGroupDTO } from "../types/DTO/getAllForGroupDTO";
import { getNamesGroupsDTO } from "../types/DTO/getNamesGroupsDTO";


export const createTodo = async(newProduct:newProductDTO)=>{
    try {
        if(!newProduct.group || ! newProduct.title || !newProduct.userid) throw new Error("All fields are required❗❗❗");
        const user  = await Product.findOne({_id:newProduct.userid})
        if (!user) throw new Error ("User not found 🧐")
        user.products?.push(newProduct)
        await user.save()
        return user
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
        return user
    } catch (err) {
        throw new Error((err as Error).message);
    }
}

export const deleteTodo = async(todo:deleteDTO)=>{
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

export const getAllTodo = async(userId:getAllDTO)=>{
    try {
        const user = await Product.findOne({_id:userId.userId})
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