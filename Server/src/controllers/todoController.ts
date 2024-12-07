import { Request, Response } from "express";
import { newTodoDTO } from "../types/newTodoDTO";
import { changeStatus, createTodo, deleteTodo, getAllTodo } from "../services/todoService";
import { changeStatusDTO } from "../types/changeStatusDTO";
import { deleteDTO } from "../types/DeleteDTO";
import { getAllDTO } from "../types/getAll";

export const addTodo = async(req:Request<any,any,newTodoDTO>,res:Response)=>{
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

