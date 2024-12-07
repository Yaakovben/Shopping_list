import { Request, Response } from "express";
import { newTodoDTO } from "../types/newTodoDTO";
import { changeStatus, createTodo } from "../services/todoService";
import { changeStatusDTO } from "../types/changeStatusDTO";

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

