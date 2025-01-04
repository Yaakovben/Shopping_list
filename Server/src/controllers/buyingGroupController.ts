import { Request, Response } from "express";
import { addUserToGroup, allMyLists, createnewGroup, deleteList, getAllLists} from "../services/buyingGroupService";
import { newGroupDTO } from "../types/DTO/newGroupDTO";
import { leftGroupDTO } from "../types/DTO/leftGroupDTO";


export const addGroup = async(req:Request<any,any,newGroupDTO>,res:Response)=>{
    try {
        const group = await createnewGroup(req.body)
        res.status(201).json(group)
    } catch (err) {
        res.status(400).json((err as Error).message)    
    }
}

export const joinToGroup = async(req:Request<any,any,newGroupDTO>,res:Response)=>{
    try {
        const group = await addUserToGroup(req.body)
        res.status(201).json(group)
    } catch (err) {
        res.status(400).json((err as Error).message)    
    }
}
export const getAllMyLists = async(req:Request<any,any,string>,res:Response)=>{
    try {
        const group = await allMyLists(req.params.username)
        res.status(201).json(group)
    } catch (err) {
        res.status(400).json((err as Error).message)    
    }
}
export const leftGroup = async(req:Request<any,any,leftGroupDTO>,res:Response)=>{
    try {
        const group = await deleteList(req.body)
        res.status(201).json(group)
    } catch (err) {
        res.status(400).json((err as Error).message)    
    }
}

export const allLists = async(req:Request,res:Response)=>{
    try {
        const lists = await getAllLists()
        res.status(200).json(lists)
    } catch (err) {
        res.status(400).json((err as Error).message)
        
    }
}




// export const addProduct = async(req:Request<any,any,newProductDTO>,res:Response)=>{
//     try {
//         const todo = await createProduct(req.body)
//         res.status(201).json(todo)
//     } catch (err) {
//         res.status(400).json((err as Error).message)    
//     }
// }

// export const flipStatus = async(req:Request<any,any,changeStatusDTO>,res:Response)=>{
//     try {
//         const updateTodo = await changeStatus(req.body)
//         res.status(200).json(updateTodo)
//     } catch (err) {
//         res.status(400).json((err as Error).message)
        
//     }
// }

// export const removeProduct = async(req:Request<any,any,any,deleteDTO>,res:Response)=>{
//     try {
//         const updatedtodo = await deleteProduct(req.query )
//         res.status(200).json(updatedtodo)
//     } catch (err) {
//         res.status(400).json((err as Error).message)  
//     }
// }

// export const getAll = async(req:Request<any,any,any,{userId:string}>,res:Response)=>{
//     if(!req.params.userId) throw new Error("userId is required")
//     try {
//         const allTodo = await getAllProduct(req.params.userId)
//         res.status(200).json(allTodo)
//     } catch (err) {
//         res.status(400).json((err as Error).message)    
//     }
// }


// export const getGroup = async(req:Request<any,any,getAllForGroupDTO>,res:Response)=>{
//     try {
//         const listGroup = await getAllForGroup(req.body)
//         res.status(200).json(listGroup)
//     } catch (err) {
//         res.status(400).json((err as Error).message)    
//     }
// }
// export const getNames = async(req:Request<any,any,getNamesGroupsDTO>,res:Response)=>{
//     try {
//         const listnamesGroup = await getAllNamesGroups(req.body)
//         res.status(200).json(listnamesGroup)
//     } catch (err) {
//         res.status(400).json((err as Error).message)    
//     }
// }
  

