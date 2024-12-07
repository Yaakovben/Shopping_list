
import userDTO from "../types/DTO/userDTO";
import { createNewUser, userLogin } from "../services/userService";
import { Request, Response } from "express";

export const register = async(req:Request<any,any,userDTO>,res:Response)=>{
    try {
        
        const newUser = await createNewUser(req.body)
        res.status(200).json(newUser).send
    } catch (err) {
        res.status(400).json((err as Error).message)   
    }
}

export const login = async(req:Request<any,any,userDTO>, res:Response)=>{
    try {
        const loggedUser = await userLogin(req.body)
        res.status(200).json(loggedUser)    
    } catch (err) {
        res.status(400).json((err as Error).message)
    }
}  