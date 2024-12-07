import { compare, hash } from "bcrypt";
import userDTO from "../types/userDTO";
import Todo from "../models/TodoModel";
import jwt from 'jsonwebtoken'


export const userLogin = async(user:userDTO)=>{
    try {
        const userFromDb = await Todo.findOne({username:user.username}).lean()
        if(!userFromDb) throw new Error("User not found 🧐, Please enter a valid user")
        const match = await compare(user.password, userFromDb.password)
        if(!match) throw new Error ("wrong password ❗❗")
        const token = jwt.sign({
            _id:userFromDb._id,
            username:userFromDb.username
            },process.env.JWT_SECRET!,{
                expiresIn:"1h"
            }
        ); 
        return {...userFromDb, token, password:"*****"}
    } catch (err) {
        throw new Error((err as Error).message)
        
    }
    
}
export const createNewUser = async(user:userDTO)=>{
    try {
        if(!user.username || !user.password) throw new Error("Password and name are required fields❗❗❗");
        const encpass = await hash(user.password, 10)
        user.password = encpass
        const newUser = new Todo(user)
        return await newUser.save()
    } catch (err) {
        throw new Error ((err as Error).message)
    }
}