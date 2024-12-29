import { Request, Response } from "express";
import { newProductDTO } from "../types/DTO/newProductDTO";
import { changeStatus, createTodo, deleteTodo, getAllForGroup, getAllNamesGroups, getAllTodo } from "../services/productService";
import { changeStatusDTO } from "../types/DTO/changeStatusDTO";
import { deleteDTO } from "../types/DTO/DeleteDTO";
import { getAllDTO } from "../types/DTO/getAll";
import { getAllForGroupDTO } from "../types/DTO/getAllForGroupDTO";
import { getNamesGroupsDTO } from "../types/DTO/getNamesGroupsDTO";

export const addTodo = async(req:Request<any,any,newProductDTO>,res:Response)=>{
    try {
        const todo = await createTodo(req.body)
        res.status(201).json(todo)
    } catch (err) {
        res.status(400).json((err as Error).message)    
    }
}

export const  flipStatus = async(req:Request<any,any,changeStatusDTO>,res:Response)=>{
    try {
        const updateTodo = await changeStatus(req.body)
        res.status(200).json(updateTodo)
    } catch (err) {
        res.status(400).json((err as Error).message)
        
    }
}

export const removeTodo = async(req:Request<any,any,deleteDTO>,res:Response)=>{
    try {
        const updatedtodo = await deleteTodo(req.body)
        res.status(200).json(updatedtodo)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}

export const getAll = async(req:Request<any,any,getAllDTO>,res:Response)=>{
    try {
        const allTodo = await getAllTodo(req.body)
        res.status(200).json(allTodo)
    } catch (err) {
        res.status(400).json((err as Error).message)    
    }
}


export const getGroup = async(req:Request<any,any,getAllForGroupDTO>,res:Response)=>{
    try {
        const listGroup = await getAllForGroup(req.body)
        res.status(200).json(listGroup)
    } catch (err) {
        res.status(400).json((err as Error).message)    
    }
}
export const getNames = async(req:Request<any,any,getNamesGroupsDTO>,res:Response)=>{
    try {
        const listnamesGroup = await getAllNamesGroups(req.body)
        res.status(200).json(listnamesGroup)
    } catch (err) {
        res.status(400).json((err as Error).message)    
    }
}
  

