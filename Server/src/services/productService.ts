import buyingGroupModel, { IProduct } from "../models/buyingGroupModel";
import { addProductDTO } from "../types/DTO/addProductDTO";
import { changeDetailsDTO } from "../types/DTO/changeDetailsDTO";
import { changeStatusDTO } from "../types/DTO/changeStatusDTO";


export const createNewproduct  = async(newProduct:addProductDTO)=>{
    try {
        const group = await buyingGroupModel.findOne({group_name:newProduct.group_name})
        if(!group) throw new Error ("Group not found 🧐")
        const newProductToAdd:IProduct = {
            name:newProduct.name,
            amount:newProduct.amount,  
            details:newProduct.details,
        }
        group.lists_products.push(newProductToAdd);
        await group.save();
        return group   
    } catch (err) {
        throw new Error ((err as Error).message)
    }
}

export const changeThestatus = async(product:changeStatusDTO)=>{
    try {
        const list = await buyingGroupModel.findOne({group_name:product.group_name})
        if(!list) throw new Error ("Group not found 🧐")
        const productToChange =  list.lists_products.find((p)=>p._id?.toString() === product.product_id)
        if(!productToChange) throw new Error("The product not found")
        productToChange.bought = ! productToChange.bought
        await list.save()
        return list
    } catch (err) {
        throw new Error ((err as Error).message)
    }   
}

export const changeTheDetailsAndAmount = async(product:changeDetailsDTO)=>{
    try {
        const list = await buyingGroupModel.findOne({group_name:product.group_name})
        if(!list) throw new Error("the list not found")
        const productToChange = list.lists_products.find((p)=>p._id?.toString() === product.product_id)
        if(!productToChange) throw new Error("The product not found")
        productToChange.amount = product.amount
        productToChange.details = product.details
        await list.save()
        return list 
    } catch (err) {
        throw new Error((err as Error).message)
    }
}


export const deleteTheProduct = async(product:changeStatusDTO) =>{
    try {
        const list  = await buyingGroupModel.findOne({group_name:product.group_name})
        if(!list) throw new Error("The list not found")
        const deleteproduct = list.lists_products.filter((p)=>p._id?.toString() !== product.product_id)
        list.lists_products = deleteproduct
        await list.save()
        return list
    } catch (err) {
        throw new Error((err as Error).message)
    }
}

export const getAllTheProduct = async(group:string)=>{
    try {
        console.log(group);
        const products =await buyingGroupModel.findOne({group_name:group})
        .lean()
        .select("lists_products")
        .select("-_id")
        if(!products) throw new Error("The list not found")
        console.log(products);
        
        return products.lists_products
    } catch (err) {
        throw new Error((err as Error).message)    
    }

}



   