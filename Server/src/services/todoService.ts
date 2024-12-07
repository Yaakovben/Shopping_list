import { newTodoDTO } from "../types/DTO/newTodoDTO";
import Todo, { ITodo } from "../models/TodoModel";
import { changeStatusDTO } from "../types/DTO/changeStatusDTO";
import { todoDTO } from "../types/DTO/todoDTO";
import { deleteDTO } from "../types/DTO/DeleteDTO";
import { getAllDTO } from "../types/DTO/getAll";
import { getAllForGroupDTO } from "../types/DTO/getAllForGroupDTO";
import { getNamesGroupsDTO } from "../types/DTO/getNamesGroupsDTO";


export const createTodo = async(newtodo:newTodoDTO)=>{
    try {
        if(!newtodo.group || ! newtodo.title || !newtodo.userid) throw new Error("All fields are required❗❗❗");
        const user  = await Todo.findOne({_id:newtodo.userid})
        if (!user) throw new Error ("User not found 🧐")
        user.todos?.push(newtodo)
        await user.save()
        return user
    } catch (err) {
        throw new Error((err as Error).message)   
    }
}

 export const changeStatus = async(todo:changeStatusDTO)=>{
    try {
        const user = await Todo.findOne({_id:todo.userId})
        if(!user) throw new Error ("User not found 🧐")
        const todoToupdate = user.todos?.find((i:any)=>i._id.toString() == todo.todoId)
        if(! todoToupdate) throw new Error ("todo npt found 🧐")
        todoToupdate.completed = !todoToupdate.completed
        await user.save()
        return user
    } catch (err) {
        throw new Error((err as Error).message);
    }
}

export const deleteTodo = async(todo:deleteDTO)=>{
    try {
        const user = await Todo.findOne({_id:todo.userId})
        if(!user) throw new Error ("User not found 🧐")
        const todoToDelete = user.todos?.find((i:any)=>i._id.toString() == todo.todoId)
        if(! todoToDelete) throw new Error ("todo npt found 🧐")
        user.todos = user.todos?.filter((t:any)=>t._id != todo.todoId)
        await user.save()
        const pdatedUser = await Todo.findOne({_id:todo.userId})
        return pdatedUser
    } catch (err) {
        throw new Error((err as Error).message);
    }
}

export const getAllTodo = async(userId:getAllDTO)=>{
    try {
        const user = await Todo.findOne({_id:userId.userId})
        if(!user) throw new Error  ("User not found 🧐")
        return user.todos 
    } catch (err) {
        throw new Error((err as Error).message);
    }
}

export const getAllForGroup = async(getGroup:getAllForGroupDTO)=>{
    try {
        const user =await Todo.findOne({_id:getGroup.userId})
        if(!user) throw new Error ("todo npt found 🧐")
        const listGruop = user.todos?.filter((t)=>t.group == getGroup.nameGroup)
        if(listGruop?.length === 0) throw new Error  ("The name group not found 🧐")
        return listGruop
    } catch (err) {
        throw new Error((err as Error).message);
        
    }
}

export const getAllNamesGroups = async(getNamesGroups:getNamesGroupsDTO)=>{
    try {
        const user = await Todo.findOne({_id:getNamesGroups.userId}).lean()
        if(!user) throw new Error ("user npt found 🧐")
        const listGroups = new Set<string>()
        user?.todos?.forEach(todo =>{
            if(todo){ listGroups.add(todo.group)}    
        })
        console.log(listGroups);
        
        return Array.from(listGroups) 
    } catch (err) {
        throw new Error((err as Error).message);
        
    }


}