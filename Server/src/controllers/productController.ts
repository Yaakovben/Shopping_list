import { Request, Response } from "express"
import { changeTheDetailsAndAmount, changeThestatus, createNewproduct, deleteTheProduct, getAllTheProduct } from "../services/productService"
import { addProductDTO } from "../types/DTO/addProductDTO"
import { changeStatusDTO } from "../types/DTO/changeStatusDTO"
import { changeDetailsDTO } from "../types/DTO/changeDetailsDTO"

export const addProduct = async (req:Request<any,any,addProductDTO>,res:Response)=>{
    try {
        const poduct = await createNewproduct(req.body)
        res.status(201).json(poduct).send
    } catch (err) {
       res.status(400).json((err as Error).message)
    }
}

export const changeStatus = async(req:Request<any,any,changeStatusDTO>,res:Response)=>{
    try {
        const change = await changeThestatus(req.body)
        res.status(200).json(change).send
    } catch (err) {
        res.status(400).json((err as Error).message)
    }
}

export const changeDetailsAndAmount = async(req:Request<any,any,changeDetailsDTO>,res:Response)=>{
    try {
        const change = await changeTheDetailsAndAmount(req.body)
        res.status(200).json(change).send
    } catch (err) {
        res.status(400).json((err as Error).message)
        
    }
}

export const deleteProduct = async(req:Request<any,any,changeStatusDTO>,res:Response)=>{
    try {
        const productToDelete = await deleteTheProduct(req.body)
        res.status(200).json(productToDelete).send
    } catch (err) {
        res.status(400).json((err as Error).message) 
    }
}

export const getAllProduct = async(req:Request<any,any,string>,res:Response)=>{
    try {
        const products = await getAllTheProduct(req.params.group) 
        res.status(200).json(products)
    } catch (err) {
        res.status(400).json((err as Error).message)
        
    }
}